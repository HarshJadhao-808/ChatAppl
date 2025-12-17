import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from "socket.io";

const app = express()
const server = http.createServer(app) 
app.use(express.json())
app.use(cors())
const PORT = 8000

app.get("/", (req, res) => {
	res.send("Socket.IO chat server running");
});


server.listen(PORT,()=>{
    console.log(`chat server is running on http://localhost:${PORT}`)
})






