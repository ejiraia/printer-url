
import db from "./conexao.js";
/** Migrations: */
    
    const migrates = async function(){
        db.run("CREATE TABLE IF NOT EXISTS config (id INTEGER PRIMARY KEY, printer_name TEXT, orientation TEXT)");

        console.log('migrate success!');
    }

export default migrates;
 