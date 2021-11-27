if [[ $1 != "-d" ]]; then
  kubectl apply -f manifests/secret.yaml \
    -f manifests/configmap.yaml \
    -f manifests/db \
    -f manifests/pingpong
fi

if [[ $1 = "-d" ]]; then
  kubectl delete -f manifests/pingpong \
    -f manifests/configmap.yaml \
    -f manifests/db \
    -f manifests/secret.yaml
fi