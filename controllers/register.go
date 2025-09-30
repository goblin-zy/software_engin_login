package controllers

import (
	"login111/models"
	"login111/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "gorm.io/gorm"
)

// RegisterResponse 定义注册响应结构体
type RegisterResponse struct {
	Message string       `json:"message"`
	User    *models.User `json:"user"`
}

func Register(c *gin.Context) {
	var user struct { // 使用一个结构体来绑定请求数据
		Username        string `json:"username" binding:"required"`
		Password        string `json:"password" binding:"required"`
		Email           string `json:"email" binding:"required,email"` // 使用 Gin 的内置 email 验证标签
		ConfirmPassword string `json:"confirm_password" binding:"required,eqfield=Password"`
	}

	// 绑定JSON数据
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据"})
		return
	}

	// 二次密码确认
	if user.Password != user.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "两次密码要相同"})
		return
	}

	// 检查用户名是否已存在
	var count int
	err := DB.QueryRow("SELECT COUNT(*) FROM users WHERE username = ?", user.Username).Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "数据库查询失败"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "用户名已存在"})
		return
	}

	// 检查邮箱是否已存在
	err = DB.QueryRow("SELECT COUNT(*) FROM users WHERE email = ?", user.Email).Scan(&count)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "数据库查询失败"})
		return
	}
	if count > 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "邮箱已被注册"})
		return
	}

	// 加密密码
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "密码加密失败"})
		return
	}
	user.Password = hashedPassword

	// 保存用户到数据库
	result, err := DB.Exec("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", user.Username, hashedPassword, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "用户创建失败"})
		return
	}

	// 获取新用户ID
	newID, _ := result.LastInsertId()

	c.JSON(http.StatusCreated, gin.H{
		"message": "用户注册成功",
		"user": gin.H{
			"id":       newID,
			"username": user.Username,
			"email":    user.Email,
		},
	})
}
