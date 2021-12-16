const k8s = require('@kubernetes/client-node')
const mustache = require('mustache')
const request = require('request')
const JSONStream = require('json-stream')
const fs = require('fs').promises

const kc = new k8s.KubeConfig()

process.env.NODE_ENV === 'development' ? kc.loadFromDefault() : kc.loadFromCluster()

const opts = {}
kc.applyToRequest(opts)

const k8Api = kc.makeApiClient(k8s.CoreV1Api)

const sendRequestToApi = async (api, method = 'get', options = {}) => new Promise((resolve, reject) => request[method](`${kc.getCurrentCluster().server}${api}`, { ...opts, ...options, headers: { ...options.headers, ...opts.headers } }, (err, res) => err ? reject(err) : resolve(JSON.parse(res.body))))

const fieldsFromDummySite = (object) => ({
  image: object.spec.image,
  website_url: object.spec.website_url,
  namespace: object.metadata.namespace,
  container_name: object.metadata.name,
  dummysite_name: object.metadata.name,
  deployment_name: `${object.metadata.name}-dep`,
  service_name: `${object.metadata.name}-svc`
})

const getYaml = async (fields, file) => {
  const template = await fs.readFile(file, 'utf8')
  return mustache.render(template, fields).replaceAll('&#x2F;', '/')
}

const createIngress = async (fields) => {
  const yaml = await getYaml(fields, 'ingress.mustache')

  return sendRequestToApi(`/apis/networking.k8s.io/v1/namespaces/${fields.namespace}/ingresses`, 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  })
}

const deleteIngress = async (fields) => {
  sendRequestToApi(`/apis/networking.k8s.io/v1/namespaces/${fields.namespace}/ingresses/dwk-ingress`, 'delete')
}

const createService = async (fields) => {
  const yaml = await getYaml(fields, 'service.mustache')

  return sendRequestToApi(`/api/v1/namespaces/${fields.namespace}/services`, 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  })
}

const deleteService = async (fields) => {
  sendRequestToApi(`/api/v1/namespaces/${fields.namespace}/services/${fields.service_name}`, 'delete')
}

const createDeployment = async (fields) => {
  const yaml = await getYaml(fields, 'deployment.mustache')

  return sendRequestToApi(`/apis/apps/v1/namespaces/${fields.namespace}/deployments`, 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  })
}

const deleteDeployment = async (fields) => {
  sendRequestToApi(`/apis/apps/v1/namespaces/${fields.namespace}/deployments/${fields.deployment_name}`, 'delete')
}

const maintainStatus = async () => {
  (await k8Api.listPodForAllNamespaces()).body

  const dummysite_stream = new JSONStream()

  dummysite_stream.on('data', async ({ type, object }) => {
    const fields = fieldsFromDummySite(object)

    if (type === 'ADDED') {
      createIngress(fields)
      createService(fields)
      await createDeployment(fields)
      console.log('Dummysite Added')
    }
    if (type === 'DELETED') {
      deleteIngress(fields)
      deleteService(fields)
      deleteDeployment(fields)
      console.log('Dummysite Deleted')
    }
  })

  request.get(`${kc.getCurrentCluster().server}/apis/stable.dwk/v1/dummysites?watch=true`, opts).pipe(dummysite_stream)

}

maintainStatus()