FROM golang:1.17.5-alpine as build

WORKDIR /workspace

COPY . .

RUN go mod download

FROM alpine

WORKDIR /go/bin

COPY --from=build /workspace /go/bin/server

EXPOSE 8080

CMD ["./server"]