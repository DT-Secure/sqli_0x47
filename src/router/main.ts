import express, { Application, Request, Response } from 'express'
import { database } from "./../database/main";
import { config } from 'dotenv'

const env = config()
const ipdb = env.parsed?.DATABASEHOST ?? "127.0.0.1"
const portdb = env.parsed?.DATABASEPORTHOST ?? "3306"
const user = env.parsed?.DATABASEUSER ?? "root"
const password = env.parsed?.DATABASEPASSWORD ?? "qwerty"
const db = new database(ipdb, parseInt(portdb), user, password)
const port = env.parsed?.PORTHOST ?? "3000"
const ip = env.parsed?.HOST ?? "127.0.0.1"
export class router {
    private app: Application
    private path: string
    constructor(app: Application, _path: string) {
        this.app = app
        this.path = _path
        this.start_router()
        this.start_lab(ip, parseInt(port))
    }

    start_lab(ip: string, port: number) {
        this.app.listen(port, ip)
        console.log(`http:\\\\${ip}:${port}`)
    }

    start_router() {
        const options = {
            dotfiles: 'ignore',
            extensions: ['htm', 'html'],
            index: "index.html"

        }

        this.app.use(express.static(this.path, options))
        this.app.get("/product", this.get_product)
        this.app.get("/all_products", this.get_all_product)
        this.app.post("/login", express.urlencoded({ extended: true }), this.login)
        console.log(`started the router`)
    }
    async get_all_product(req: Request, res: Response) {
        try {
            let item = db.get_db().query(`SELECT * FROM sqli.products`)
            res.send(await item)
        }
        catch {
            res.send("error")
        }
    }
    async get_product(req: Request, res: Response) {
        try {
            let item = db.get_db().query(`SELECT * FROM sqli.products WHERE id = ${req.query['id']}`)
            res.send(await item)
        }
        catch {
            res.send("error")
        }

    }
    async login(req: Request, res: Response) {
        let { name, password } = req.body;
        try {
            let item = db.get_db().query(`SELECT * FROM sqli.admin WHERE name = "${name}" and password="${password}"`)
            if ((await item)[0] === undefined) {
                return res.send("what is wrong ?")
            }
            let flag = "AX47(0d6dd6d1a01050a758fdcefd372eb9b0604debff3418d41821397f9bb0945bcf98bfdceb2f6191f7e06e2d4212a0b85ee1d03cfccaccb4a7f8ad299a08d0e785)"
            return res.redirect(`/logined?this_is_fucking_flag=${flag}`)
        }
        catch {
            res.send("error")
        }
    }
}   