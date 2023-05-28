package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    http.Handle("/", http.FileServer(http.Dir("./build")))

    fmt.Println("Server started on localhost:8008")
    log.Fatal(http.ListenAndServe(":8008", nil))
}
