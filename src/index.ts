import mongoose from 'mongoose'
import { MONGO_URI, MONGO_OPTIONS, APP_PORT } from './config'
import { createApp } from './app'
;(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

  const app = createApp()

  app.listen(APP_PORT, () => console.log(`http://localhost${APP_PORT}`))
})()
