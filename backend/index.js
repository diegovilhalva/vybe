import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.route.js"
const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.get("/",(req,res) => {
    res.send("Servidor ok")
})

app.use("/api/auth",authRoutes)


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});



