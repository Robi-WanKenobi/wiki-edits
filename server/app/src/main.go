package main

import (
	"flag"
	"log"
	"net/http"
	"net/url"
	"time"
)

var totalEnglish = 0
var totalGerman = 0
var sendEnglish []int
var sendGerman []int
var maxValue = 0

func main() {
	flag.Parse()
	log.SetFlags(0)

	english := make([]int, 6)
	german := make([]int, 6)

	// english websocket endpoint
	var addrEnglish = flag.String("addr_en", "wikimon.hatnote.com:9000", "http service address")
	// german websocket endpoint
	var addrGerman = flag.String("addr_de", "wikimon.hatnote.com:9010", "http service address")

	go connect(url.URL{Scheme: "ws", Host: *addrEnglish}, "en")
	go connect(url.URL{Scheme: "ws", Host: *addrGerman}, "de")

	go func() {
		// create router instance
		router := NewRouter()

		// handle events with messages named `connection` with handler
		// sendData (from above).
		router.Handle("connection", sendData)

		// handle all requests to /, upgrade to WebSocket via our router handler.
		http.Handle("/", router)

		// start server.
		http.ListenAndServe(":4000", nil)
	}()

	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()
	for range ticker.C {

		// handle edits values vector
		english = english[1:]
		english = append(english, totalEnglish)
		german = german[1:]
		german = append(german, totalGerman)

		// send response and reset edit values
		sendEnglish = english
		sendGerman = german
		maxValue = roundNumber(getMaxValue(sendEnglish, sendGerman))
		totalEnglish = 0
		totalGerman = 0
	}
}
