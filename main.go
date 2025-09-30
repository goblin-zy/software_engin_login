package main

import (
	"database/sql"
	"log"
	"login111/controllers"
	_ "login111/models"
	_ "net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// 使用 database/sql 连接 MySQL
	dsn := "root:jrr582200@tcp(127.0.0.1:3306)/login?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := sql.Open("mysql", dsn)
	controllers.DB = db
	if err != nil {
		log.Fatal("无法打开数据库连接: ", err)
	}
	// 检查连接是否可用
	if err := db.Ping(); err != nil {
		log.Fatal("数据库连接不可用: ", err)
	}

	// 设置Gin路由
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	router.Use(cors.Default())
	router.POST("/api/register", controllers.Register)
	router.POST("/api/login", controllers.Login)
	router.POST("/api/change-password", controllers.ChangePassword)

	// 启动服务器
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("服务器启动在端口 %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("服务器启动失败: ", err)
	}
}
