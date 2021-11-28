docker login

cd log-output

docker build . -t tsadom/dwkex:v3.2.log-output.$1
docker push tsadom/dwkex:v3.2.log-output.$1

cd ../pingpong

docker build . -t tsadom/dwkex:v3.2.pingpong.$1
docker push tsadom/dwkex:v3.2.pingpong.$1