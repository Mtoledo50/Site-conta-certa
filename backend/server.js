import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import quotesRouter from './routes/quotes.js'
import adminRouter from './routes/admin.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/quotes', quotesRouter)
app.use('/api/admin', adminRouter)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`)
})
