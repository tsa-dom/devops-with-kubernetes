docker login

cd backend

docker build . -t tsadom/dwkex:v2.2.backend.$1
docker push tsadom/dwkex:v2.2.backend.$1

cd ../frontend

docker build . -t tsadom/dwkex:v2.2.frontend.$1
docker push tsadom/dwkex:v2.2.frontend.$1