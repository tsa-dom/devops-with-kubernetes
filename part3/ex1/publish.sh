docker login

cd log-output

docker build . -t tsadom/dwkex:v2.7.log-output.$1
docker push tsadom/dwkex:v2.7.log-output.$1

cd ../pingpong

docker build . -t tsadom/dwkex:v2.7.pingpong.$1
docker push tsadom/dwkex:v2.7.pingpong.$1