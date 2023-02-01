import express, { Application, Request, Response } from 'express'
import { database } from "./../database/main";
let db = new database("127.0.0.1", 3366, "root", "qwerty")

export class router {
    private app: Application
    private path: string
    constructor(app: Application, path: string) {
        this.app = app
        this.path = path

        this.start_router()


    }
    start_lab(port: number) {
        this.app.listen(port)
        console.log(`http:\\\\localhost:${port}`)
    }

    start_router() {
        console.log(`started the router`)
        const options = {
            dotfiles: 'ignore',
            extensions: ['htm', 'html'],
            index: "index.html"

        }
        this.app.use(express.static(this.path, options))
        this.app.use(express.urlencoded({ extended: true }));
        this.app.get("/product", this.get_product)
        this.app.get("/all_products", this.get_all_product)
        this.app.post("/login", this.login)

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
            res.send(await item)
        }
        catch {
            res.send("error")
        }
    }
}   