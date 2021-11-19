docker login

cd backend

docker build . -t tsadom/dwkex:14.b$1
docker push tsadom/dwkex:14.b$1

cd ../frontend

docker build . -t tsadom/dwkex:14.f$1
docker push tsadom/dwkex:14.f$1