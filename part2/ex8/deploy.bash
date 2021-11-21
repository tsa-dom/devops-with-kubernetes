if [[ $1 != "-d" ]]; then
  kubectl apply -f manifests/secret.yaml \
                -f manifests/configmap.yaml \
                -f manifests/frontend \
                -f manifests/backend \
                -f manifests/ingress.yaml \
                -f manifests/db
fi

if [[ $1 = "-d" ]]; then
  kubectl delete -f manifests/secret.yaml \
                 -f manifests/configmap.yaml \
                 -f manifests/frontend \
                 -f manifests/backend \
                 -f manifests/ingress.yaml \
                 -f manifests/db
fi