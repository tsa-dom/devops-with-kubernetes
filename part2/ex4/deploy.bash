if [[ $1 != "-d" ]]; then
  kubectl apply -f frontend/manifests
  kubectl apply -f backend/manifests
  kubectl apply -f manifests
fi

if [[ $1 = "-d" ]]; then
  kubectl delete -f frontend/manifests
  kubectl delete -f backend/manifests
  kubectl delete -f manifests
fi