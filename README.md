# DevOps With Kubernetes

This is course work for University of Helsinki [DevOps With Kubernetes](https://devopswithkubernetes.com/) course.

[GitOps repository](https://github.com/tsa-dom/kube-cluster-dwk)

You need to specify following commands to use GitOps
* k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
* docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
* export GITHUB_TOKEN=\<my-github-token\>
* flux bootstrap github --owner=tsa-dom --repository=kube-cluster-dwk --personal --private=false
* cat age.agekey | kubectl -n flux-system create secret generic sops-age --from-file=age.agekey=/dev/stdin (in the directory where age.agekey is located)
  
Now everything should work and the app should be running on port 8081 :)

# Pros and cons comparison for DBaaS and DIY

## DBaaS

### Pros
* Small amount of technical knowledge needed to setup because the service provider is doing it for you.
* The service provider is responsible to that your database is properly backed up.
* "Pay as you go" billing model. Usually small price for small and middle size organizations.
* Easy to maintain, you don't actually need to do much.

### Cons
* In the case of failure you don't have physical access to a database.

## DIY

### Pros
* You have full control of your database including physical access to it.

### Cons
* Backup is your responsibility. In the case of failure if you haven't created backups from your database, then there is not much you can do. You need to create your own backup automation.
* May need a lot of staff to maintain the database.
* Additional costs of hardwares.
* Initializing a database may be fustrating.

# My database decision 

I wanted to implement Google Cloud SQL because I did earlier an implement for PersistentVolumeClaims and wanted some extra challenge.
