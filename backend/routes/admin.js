import express from 'express'
import jwt from 'jsonwebtoken'
import { pool } from '../db.js'

const router = express.Router()

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: 'Sem token' })

  const token = header.split(' ')[1]

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}

router.get('/quotes', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC')
    res.json(result.rows)
  } catch {
    res.status(500).json({ error: 'Erro ao listar orçamentos' })
  }
})

router.patch('/quotes/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const result = await pool.query(
      'UPDATE quotes SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    )

    res.json(result.rows)
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar status' })
  }
})

export default router
