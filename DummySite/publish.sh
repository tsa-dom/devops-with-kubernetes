docker login

cd controller
docker build . -t tsadom/controller:v1.0.$1
docker push tsadom/controller:v1.0.$1

cd ../dummysite
docker build . -t tsadom/dummysite:v1.0.$1
docker push tsadom/dummysite:v1.0.$1