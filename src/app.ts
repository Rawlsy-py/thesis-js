import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import unknownEndpoint from './middlewares/unknownEndpoint'
import { PrismaClient } from '@prisma/client'
import logger from './common/logger'
import json from './common/json'

// to use env variables
import './common/env'

const app: Application = express()
const prisma: PrismaClient = new PrismaClient()

// middleware
app.disable('x-powered-by')
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  }),
)
app.use(express.json())

// url: /
// response: {"data": [{"id": 1, "name": "John Doe", "balances": [{"id": 1, "amount": 100.0}]}]}
app.get('/', async (req: Request, res: Response) => {
  try {
    // get first 10 users with their balances
    const data = await prisma.users.findMany({
      include: {
        balances: true,
      },
      take: 10,
      skip: 0,
    })

    // return response
    return res.send(
      json({
        data: data,
      }),
    )
  } catch (error) {
    logger.error(error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
})

// url: /update-balance
// request body: {"id": 1, "balance": 100.0}
// response: {"message": "Balance updated successfully", "data": {"id": 1, "amount": 100.0}}
app.post('/update-balance', async (req: Request, res: Response) => {
  const { id, balance } = req.body

  if (!id || !balance) {
    return res.status(400).json({
      message: 'id and balance are required',
    })
  }

  try {
    const newBalance = await prisma.balances.update({
      where: {
        id: Number(id),
      },
      data: {
        amount: Number(balance),
      },
    })

    return res.send(
      json({
        message: 'Balance updated successfully',
        data: newBalance,
      }),
    )
  } catch (error) {
    return res.status(404).json({
      message: 'route not found',
    })
  }
})

// url: /health-check
// response: {"health-check": "OK: top level api working"}
app.get('/health-check', async (req: Request, res: Response) => {
  return res.json({
    'health-check': 'OK: top level api working',
  })
})

// Handle unknown endpoints
app.use('*', unknownEndpoint)

export default app
