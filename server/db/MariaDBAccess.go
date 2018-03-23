package db

import (
	"database/sql"
	"strings"

	"github.com/spf13/viper"

	"github.com/ChristianAEDev/worky/server/data"
	// Blank import since the mysql driver is compatible to the standard sql implementation
	_ "github.com/go-sql-driver/mysql"
	log "github.com/sirupsen/logrus"
)

func open() *sql.DB {
	sb := strings.Builder{}

	sb.WriteString(viper.GetString("database.user"))
	sb.WriteString(":")
	sb.WriteString(viper.GetString("database.password"))
	sb.WriteString("@")
	//sb.WriteString(viper.GetString("database.host"))
	sb.WriteString("/")
	sb.WriteString(viper.GetString("database.name"))

	log.Info(sb.String())

	db, err := sql.Open("mysql", sb.String())
	if err != nil {
		log.Error("Error connecting to database", err)
	}
	db.Ping()
	return db
}

// LoadTasks loads all tasks stored in the database
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

func DeleteTask(taskID int) (err error) {
	db := open()
	defer db.Close()

	prepStat, err := db.Prepare("DELETE FROM task WHERE id = ?")
	if err != nil {
		return err
	}
	defer prepStat.Close()

	result, err := prepStat.Exec(taskID)

	log.Info(result)

	return nil
}
