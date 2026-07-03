import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../db.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email])
    const admin = result.rows[0]

    if (!admin) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const valid = await bcrypt.compare(password, admin.password_hash)

    if (!valid) {
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    return res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } })
  } catch (err) {
    console.error('Erro no login:', err)
    return res.status(500).json({ error: 'Erro no login' })
  }
})

export default router
