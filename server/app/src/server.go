package main

import (
	"encoding/json"
	"log"
	"net/url"
	"time"

	"github.com/gorilla/websocket"
)

// Handles the connection with wikimon.hatnote.com and sums the edited bytes
func connect(url url.URL, language string) {
	u := url
	log.Printf("Connecting to %s", u.String())

	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer c.Close()

	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			return
		}
		var response Response
		json.Unmarshal(message, &response)
		if response.Action == "edit" {
			if language == "en" {
				totalEnglish += getAbsoluteValue(response.Size)
			}
			if language == "de" {
				totalGerman += getAbsoluteValue(response.Size)
			}
		}
	}
}

// send_data is a method that handles message from the app client and send data periodically.
func sendData(c *Client, data interface{}) {
	log.Printf("Client connected")

	for t := time.Tick(10 * time.Second); ; <-t {
		message := Edits{sendEnglish, sendGerman, maxValue}
		// response message
		c.send = Message{Name: "connected", Data: message}
		c.Write()
	}
}
