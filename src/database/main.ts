import mariadb, { PoolConnection } from 'mariadb'
export class database {
    private conn?: PoolConnection
    constructor(uri: string, port: number, username: string, password: string,) {
        let pool = mariadb.createPool({ host: uri, port: port, password: password, user: username, connectionLimit: 5, database: "sqli" });
        (async () => {
            try {

                this.conn = await pool.getConnection();
                const rows = await this.conn.query("SELECT 1 as val");
                const res = await this.conn.query("INSERT INTO connect value (?)", [1]);

            } finally {
                if (this.conn) {

                    console.log("DATABASE connected")

                } else {
                    console.error("fail")
                }
            }
        })()

    }
    get_db(): PoolConnection {
        if (this.conn === undefined) {
            throw new Error("conn is undefined")
        } else {
            return this.conn
        }
    }
    was_connected(): boolean {

        return this.conn !== undefined

    }
}
