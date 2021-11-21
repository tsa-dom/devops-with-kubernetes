docker login

cd backend

docker build . -t tsadom/dwkex:v2.9.backend.$1
docker push tsadom/dwkex:v2.9.backend.$1

cd ../frontend

docker build . -t tsadom/dwkex:v2.9.frontend.$1
docker push tsadom/dwkex:v2.9.frontend.$1

cd ../cron

docker build . -t tsadom/dwkex:v2.9.cron.$1
docker push tsadom/dwkex:v2.9.cron.$1