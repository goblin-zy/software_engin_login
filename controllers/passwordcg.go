package controllers

import (
	_ "database/sql"
	"login111/models"
	"login111/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ChangePassword(c *gin.Context) {
	var input struct {
		Username        string `json:"username"`
		CurrentPassword string `json:"currentPassword"`
		NewPassword     string `json:"newPassword"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据"})
		return
	}

	// 查找用户
	var user models.User
	err := DB.QueryRow("SELECT id, username, password, email FROM users WHERE username = ?", input.Username).
		Scan(&user.Username, &user.Password, &user.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "用户不存在"})
		return
	}

	// 验证当前密码
	if !utils.CheckPasswordHash(input.CurrentPassword, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "当前密码错误"})
		return
	}

	// 加密新密码
	newHashedPassword, err := utils.HashPassword(input.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "密码加密失败"})
		return
	}

	// 更新密码
	_, err = DB.Exec("UPDATE users SET password = ? WHERE username = ?", newHashedPassword, input.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "密码更新失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "密码修改成功"})
}
