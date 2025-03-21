import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router as formRoutes } from './routes/forms'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// 路由
app.use('/api/forms', formRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})