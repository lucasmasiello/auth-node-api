import mongoose, { mongo } from 'mongoose'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import { REDIS_OPTIONS, MONGO_URI, MONGO_OPTIONS, APP_PORT } from './config'
import { createApp } from './app'

  ; (async () => {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)
    const RedisStore = connectRedis(session)

    const client = new Redis(REDIS_OPTIONS)
    const store = new RedisStore({ client })

    const app = createApp(store)

    app.get('/', (req, res) => res.json({ message: 'HI!' }))
    app.listen(APP_PORT, () => console.log(`http://localhost${APP_PORT}`))
  })();

