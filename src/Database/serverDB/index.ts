import { table } from "quick.db"

class serverDB extends table {
    public database = new table('server');
}

export default serverDB;