import express from 'express'
import cors from 'cors'
import server from 'socket.io'
import { Server as SocketIOServer } from "socket.io";

const app = express()
app.use(express.json())
const PORT = 8000


const chatserver = http.createServer(app)

const io = server(chatserver)

io.on("connections",(socket)=>{
    console.log("connection established")
})

app.use(cors())
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})