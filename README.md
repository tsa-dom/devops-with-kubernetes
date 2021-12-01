# DevOps With Kubernetes

This is course work for University of Helsinki [DevOps With Kubernetes](https://devopswithkubernetes.com/) course.

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
