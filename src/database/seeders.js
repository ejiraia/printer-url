
import db from "./conexao.js";

/** Seeders: */
    
    const seeders = async function(){
        db.all("SELECT * FROM config WHERE id = 1",function(error,data){

            try{
                //if(error)console.log(error);
                if(data.length)return;
            }catch(e){

            }

            db.run("INSERT OR IGNORE INTO config (printer_name,orientation) VALUES (?,?)", 
            ["MP-4200 TH","0"]);

            console.log('seeder success!');
        });
    }

    
export default seeders;
    