docker login

cd log-output

docker build . -t tsadom/dwkex:log-output.$1
docker push tsadom/dwkex:log-output.$1

cd ../pingpong

docker build . -t tsadom/dwkex:pingpong.$1
docker push tsadom/dwkex:pingpong.$1