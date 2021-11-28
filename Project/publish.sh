docker login

cd backend

docker build . -t tsadom/dwkex:v3.3.backend.$1
docker push tsadom/dwkex:v3.3.backend.$1

cd ../frontend

docker build . -t tsadom/dwkex:v3.3.frontend.$1
docker push tsadom/dwkex:v3.3.frontend.$1

cd ../cron

docker build . -t tsadom/dwkex:v3.3.cron.$1
docker push tsadom/dwkex:v3.3.cron.$1