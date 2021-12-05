docker login

cd backend

docker build . -t tsadom/dwkex:backend.$1
docker push tsadom/dwkex:backend.$1

cd ../frontend

docker build . -t tsadom/dwkex:frontend.$1
docker push tsadom/dwkex:frontend.$1

cd ../cron

docker build . -t tsadom/dwkex:cron.$1
docker push tsadom/dwkex:cron.$1
