import "dotenv/config";
import express from "express";
import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT) || 5000;
const WSPORT = Number(process.env.WSPORT) || 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const wss = new WebSocketServer({ port: WSPORT });

app.post("/emit", (req, res) => {
  const event = req.body;
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(event));
  });
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`WS listning on ${PORT}`);
});
