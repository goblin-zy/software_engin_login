package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"unique;not null" json:"username"` //用户名，唯一且非空
	Password string `gorm:"not null" json:"-"`               //密码哈希，序列化时忽略
	Email    string `gorm:"unique" json:"email"`             //邮箱，唯一
}

var DB *gorm.DB
