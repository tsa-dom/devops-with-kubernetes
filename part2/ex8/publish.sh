docker login

cd backend

docker build . -t tsadom/dwkex:v2.8.backend.$1
docker push tsadom/dwkex:v2.8.backend.$1

cd ../frontend

docker build . -t tsadom/dwkex:v2.8.frontend.$1
docker push tsadom/dwkex:v2.8.frontend.$1