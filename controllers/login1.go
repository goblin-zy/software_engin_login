package controllers

import (
	"database/sql"
	"login111/models"
	"login111/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

// 定义一个密钥，实际应用中应从环境变量读取
var jwtKey = []byte("your_secret_key")
var DB *sql.DB

func Login(c *gin.Context) {
	var input struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据"})
		return
	}

	// 用 database/sql 查询用户
	var user models.User
	err := DB.QueryRow("SELECT username, password, email FROM users WHERE username = ?", input.Username).
		Scan(&user.Username, &user.Password, &user.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "用户名或密码错误"})
		return
	}

	// 验证密码
	if !utils.CheckPasswordHash(input.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "用户名或密码错误"})
		return
	}

	// 生成JWT令牌
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &jwt.StandardClaims{
		Subject:   user.Username,
		ExpiresAt: expirationTime.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "生成令牌失败"})
		return
	}

	// 返回令牌给客户端
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "登录成功",
		"data": gin.H{
			"token": tokenString,
			"user": gin.H{ // 添加用户信息
				"username": user.Username,
				"email":    user.Email,
			},
		},
	})
}
