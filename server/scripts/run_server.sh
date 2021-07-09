export PORT=${PORT:-"4191"}
export MODE=${MODE:-"development"}
export FRONT_END_DIR=${FRONT_END_DIR:-""}
export MONGO_URL=${MONGO_URL:-"localhost:26521"}
export MONGO_USERNAME=${MONGO_USERNAME:-"root"}
export MONGO_PASSWORD=${MONGO_PASSWORD:-"playground"}

go run main.go
