import express, { Application, Request, Response } from 'express'
import { router } from './router/main'
import path from 'path'


if (!module.parent) {
    new router(express(), path.join(__dirname, 'components')).start_lab(3000)
    console.log("LAB IS REDY")
}