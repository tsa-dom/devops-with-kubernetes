docker login

cd controller
docker build . -t tsadom/dummysite-controller-sha-$1
docker push tsadom/dummysite-controller-sha-$1

cd ../dummysite
docker build . -t tsadom/dummysite-sha-$1
docker push tsadom/dummysite-sha-$1