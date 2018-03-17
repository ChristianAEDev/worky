package main

import (
	"net/http"

	"github.com/ChristianAEDev/worky/server/rest"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.Info("Starting...")

	port := "9090"

	router := mux.NewRouter()

	api := router.PathPrefix("/api/v1").Subrouter()

	// Register the routes Rest API
	api.HandleFunc("/tasks", rest.GetTasks).Methods("GET")

	// Host the front end
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./build")))

	methods := []string{"GET", "POST", "PUT", "DELETE"}
	headers := []string{"Content-Type"}

	log.Infof("Started on port %v\n", port)
	// Startup the endpoint
	http.ListenAndServe(":"+port,
		handlers.CORS(handlers.AllowedMethods(methods), handlers.AllowedHeaders(headers))(router))
}
