package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", GetDummy)
	http.ListenAndServe(":8080", nil)
}

func GetDummy(w http.ResponseWriter, r *http.Request) {
	websiteUrl := os.Getenv("WEBSITE_URL")
	response, err := http.Get(websiteUrl)
	if err != nil {
		log.Panic(err)
	}

	html, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Panic(err)
	}

	fmt.Fprint(w, fmt.Sprintf("%s\n", html))
}
