package db

import (
	"database/sql"

	"github.com/ChristianAEDev/worky/server/data"
	_ "github.com/go-sql-driver/mysql"
	log "github.com/sirupsen/logrus"
)

func open() *sql.DB {
	db, err := sql.Open("mysql", "root:my-secret-pw@/worky")
	if err != nil {
		log.Error("Error connecting to database", err)
	}
	db.Ping()
	return db
}

func LoadTasks() (tasks []data.Task) {
	db := open()
	defer db.Close()

	rows, err := db.Query("Select ID, Title, Description From task")
	if err != nil {
		log.Error("Error loading tasks from database", err)
		return tasks
	}
	defer rows.Close()

	for rows.Next() {
		var task data.Task
		err := rows.Scan(&task.ID, &task.Title, &task.Description)
		if err != nil {
			log.Error("Error reading task from database", err)
		}
		tasks = append(tasks, task)
	}

	return tasks
}
