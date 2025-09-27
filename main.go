package main

import (
	"Login/controllers"
	"Login/models"
	"log"
	_ "net/http"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

func main() {
	// 初始化数据库连接（使用GORM）
	dsn := "root:password@tcp(127.0.0.1:3306)/datebase_name?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("无法打开数据库连接: ", err)
	}
	models.DB = db
	// 自动迁移
	models.DB.AutoMigrate(&models.User{})

	// 设置Gin路由
	router := gin.Default()
	router.POST("/register", controllers.Register)
	router.POST("/login", controllers.Login)
	router.POST("/change-password", controllers.ChangePassword)

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
