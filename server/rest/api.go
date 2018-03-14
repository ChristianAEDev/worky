package rest

import (
	"net/http"

	"github.com/ChristianAEDev/worky/server/data"
	"github.com/ChristianAEDev/worky/server/db"
	log "github.com/sirupsen/logrus"
)

// GetTasks loads all tasks from the database and sends them as a JSON to the caller.
func GetTasks(w http.ResponseWriter, r *http.Request) {
	tasks := db.LoadTasks()

	tasksJSON, err := data.ToJSON(tasks)
	if err != nil {
		log.Warningf("Error creating JSON from task array", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	log.Infof("Returning %v tasks", len(tasks))
	w.Write(tasksJSON)
}
