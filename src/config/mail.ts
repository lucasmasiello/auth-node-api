import { Options } from 'nodemailer/lib/smtp-connection'
import { IN_PROD } from './app'

const {
  SMTP_HOST = 'in-v3.mailjet.com',
  SMTP_PORT = 25,
  SMTP_USERNAME = '48c7a8d00504040985c96afea86f2a9c',
  SMTP_PASSWORD = '84d90a2d8c233b8cdcffa9d5aea7235b'
} = process.env

export const SMTP_OPTIONS: Options = {
  host: SMTP_HOST,
  port: +SMTP_PORT,
  secure: IN_PROD,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD
  }
}

export const MAIL_FROM = 'lucasgr90@gmail.com' // `noreply@${APP_HOSTNAME}`
