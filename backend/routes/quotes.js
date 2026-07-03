import express from 'express'
import { pool } from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body

    if (!name || !phone || !service || !message) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' })
    }

    const result = await pool.query(
      `INSERT INTO quotes (name, email, phone, service, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email || null, phone, service, message]
    )

    return res.status(201).json({
      message: 'Orçamento enviado com sucesso.',
      quote: result.rows
    })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao salvar orçamento.' })
  }
})

export default router
