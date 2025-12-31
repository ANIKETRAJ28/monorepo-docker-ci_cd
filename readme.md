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
