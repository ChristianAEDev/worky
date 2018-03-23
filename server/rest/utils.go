package rest

import (
	"fmt"
	"net/http"
	"path"
	"strconv"

	log "github.com/sirupsen/logrus"
)

func extractIDFromURL(r *http.Request) (taskID int, err error) {
	return strconv.Atoi(path.Base(r.URL.Path))
}

func respondWithError(w http.ResponseWriter, err error) {
	message := fmt.Sprintf("Error deleting task. Error: %v", err)
	log.Error(err)
	http.Error(w, message, http.StatusBadRequest)
}
