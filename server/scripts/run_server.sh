export PORT=${PORT:-"4182"}
export MODE=${MODE:-"development"}
export MONGO_URL=${MONGO_URL:-"localhost:26521"}
export MONGO_USERNAME=${MONGO_USERNAME:-"root"}
export MONGO_PASSWORD=${MONGO_PASSWORD:-"playground"}

go run main.go
