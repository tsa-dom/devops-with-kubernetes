if [[ $1 != "-d" ]]; then
  kubectl apply -f manifests/configmap.yaml \
                -f manifests/log-output \
                -f manifests/pingpong \
                -f manifests/ingress.yaml
fi

if [[ $1 = "-d" ]]; then
  kubectl delete -f manifests/log-output \
                 -f manifests/pingpong \
                 -f manifests/ingress.yaml \
                 -f manifests/configmap.yaml
fi