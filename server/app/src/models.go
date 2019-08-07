package main

// Response is the remote websocket response struc (wikimon.hatnote.com)
type Response struct {
	Action string `json:"action"`
	Size   int    `json:"change_size"`
}

// Edits is the local websocket response struct
type Edits struct {
	English []int
	German  []int
	Max     int
}
