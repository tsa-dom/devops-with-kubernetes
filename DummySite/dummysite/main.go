package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", GetDummy)
	http.ListenAndServe(":8080", nil)
}

func GetDummy(w http.ResponseWriter, r *http.Request) {
	response, err := http.Get("http://example.com")
	if err != nil {
		log.Panic(err)
	}

	html, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Panic(err)
	}

	fmt.Fprint(w, fmt.Sprintf("%s\n", html))
}
