import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const WS_URL = import.meta.env.VITE_WS_URL;

function App() {
  const [todos, setTodos] = useState<{ id: string; name: string }[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setTodos((prev) => [...prev, msg.todo]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const postTodo = async () => {
    await axios.post(`${API_URL}/todo`);
  };

  return (
    <div style={{ padding: 22 }}>
      <h2>Todos</h2>

      <button onClick={postTodo}>Create new todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
