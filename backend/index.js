import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import loopRoutes from "./routes/loop.route.js"
import storyRoutes from "./routes/story.route.js"
import messageRoutes from "./routes/message.route.js"
import { app, server } from "./socket.js"

const PORT = process.env.PORT || 4000



app.use(cors({ origin: process.env.CLIENT_ENDPOINT, credentials: true }))
app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send("Servidor ok")
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/loop", loopRoutes)
app.use("/api/story",storyRoutes)
app.use("/api/message",messageRoutes)
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});



