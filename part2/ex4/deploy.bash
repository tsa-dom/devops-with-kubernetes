if [[ $1 != "-d" ]]; then
  kubectl apply -f frontend/manifests \
                -f backend/manifests \
                -f manifests
fi

if [[ $1 = "-d" ]]; then
  kubectl delete -f frontend/manifests \
                 -f backend/manifests \
                 -f manifests
fi