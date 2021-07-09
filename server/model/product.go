package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Name     string             `json:"name" bson:"name"`
	Likes    int64              `json:"likes" bson:"likes"`
	Dislikes int64              `json:"dislikes" bson:"dislikes"`
	Image    string             `json:"image,omitempty" bson:"image,omitempty"`
}
