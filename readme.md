## Docker Setup

- Install docker on your machine.
- Clone the repository
  ```
    git clone https://github.com/ANIKETRAJ28/monorepo-docker-ci_cd.git
  ```
- Create a network for the containers
  ```
    docker network create todo_monorepo-network
  ```
- Create a volume for Postgres data
  ```
    docker volume create todo_monorepo-volume
  ```
- Run Postgres container
  ```
    docker run --name todo_monorepo-db --network todo_monorepo-network -e POSTGRES_PASSWORD=postgres -v todo_monorepo-volume:/var/lib/postgresql -p 5432:5432 -d postgres
  ```
- Build and run the WebSocket
  ```
    docker build -t todo_monorepo-ws -f docker/Dockerfile.ws .
    docker run --name todo_monorepo-ws --network todo_monorepo-network -e PORT=5000 -e WSPORT=4000 -p 4000:4000 -d todo_monorepo-ws
  ```
- Build and run the Server
  ```
    docker build -t todo_monorepo-server -f docker/Dockerfile.server .
    docker run --name todo_monorepo-server --network todo_monorepo-network -e DATABASE_URL="postgresql://postgres:postgres@todo_monorepo-db:5432/postgres" -e PORT=3000 -e WS_URL="http://todo_monorepo-ws:5000/emit" -p 3000:3000 -d todo_monorepo-server
  ```
- Migrate the database
  ```
    docker exec -it todo_monorepo-server pnpm db:migrate
  ```
- Build and run the Client
  ```
    docker build -t todo_monorepo-client -f docker/Dockerfile.client .
    docker run --name todo_monorepo-client --network todo_monorepo-network -e VITE_API_URL="http://localhost:3000" -e VITE_WS_URL="ws://localhost:4000" -p 4173:4173 -d todo_monorepo-client
  ```

# Docker Compose Setup

- Install docker and docker-compose on your machine.
- Create `.env` file in the root directory and add these
  ```
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres
  POSTGRES_DB: todo_db
  ```
- Create `.env` file in the `apps/server` directory and add these
  ```
  DATABASE_URL="postgresql://postgres:postgres@todo_monorepo-db:5432/todo_db"
  PORT=3000
  WS_URL="http://todo_monorepo-ws:5000/emit"
  ```
- Create `.env` file in the `apps/ws` directory and add these
  ```
  PORT=5000
  WSPORT=4000
  ```
- Create `.env` file in the `apps/client` directory and add these
  ```
  VITE_API_URL="http://localhost:3000"
  VITE_WS_URL="ws://localhost:4000"
  ```
- Create a `.env` file in `packages/db` directory and add these
  ```
  DATABASE_URL="postgresql://postgres:postgres@todo_monorepo-db:5432/todo_db"
  ```
- Run this to start the project
  ```
    docker-compose up --build
  ```
