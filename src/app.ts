import express, { Application, Request, Response } from 'express'
import { router } from './router/main'
import { config } from 'dotenv'
import path from 'path'


if (!module.parent) {
    const env = config()
    const port = env.parsed?.PORTHOST ?? "3000"
    const ip = env.parsed?.HOST ?? "127.0.0.1"

    console.clear()
    console.log("\x1b[32m0x47; LAB Axakova is starting.");
    console.log("|------------------------------------|");
    new router(express(), path.join(__dirname, 'components')).start_lab(ip, parseInt(port))
    console.log("|------------------------------------|");
    console.log("0x47; LAB Axakova IS REDY")

}