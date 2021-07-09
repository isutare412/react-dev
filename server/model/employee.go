package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Employee struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Name     string             `json:"name" bson:"name"`
	Position string             `json:"position" bson:"position"`
	Image    string             `json:"image,omitempty" bson:"image,omitempty"`
	Speaking string             `json:"speaking" bson:"speaking"`
}
