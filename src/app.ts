import express, { Application, Request, Response } from 'express'
import { router } from './router/main'
import { config } from 'dotenv'
import path from 'path'


if (!module.parent) {
    const env = config()
    const port = env.parsed?.PORTHOST ?? "3000"
    const ip = env.parsed?.HOST ?? "127.0.0.1"
    console.log("LAB Axakova is starting.");
    new router(express(), path.join(__dirname, 'components')).start_lab(ip, parseInt(port))
    console.log("LAB Axakova IS REDY")
}