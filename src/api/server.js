import express from 'express';
import cors from 'cors';
import { firstConfig, listPrinters, print, toJson } from '../helpers.js';
import db from '../database/conexao.js';
import SelleniumController from '../SelleniumController.js';

const app = express();
app.use(express.json());
app.use(cors());

const port = 3030;
const chrome = SelleniumController;

const apiServer = function(){
/**lista as impressoras: */
app.get('/list-printers',async (req,res)=>{
    
    let printers = await listPrinters();
    res.send(printers);
})

/**obtem as configurações: */
app.get('/config-printer',async (req,res)=>{
    
    let query = "select * from config where id = 1";
    db.get(query,function(error,data){
        if(error){
            print(error);
            return res.send({"status":0})

        }
        return res.send(toJson(data))
    });
})

/**atualiza as configurações: */
app.post('/config-printer',(req,res)=>{

    let query = "UPDATE config SET printer_name = ?, orientation = ?  WHERE id = 1";
    let params = [req.body.printer_name,req.body.orientation];
    db.get(query,params,function(error,data){
        if(error){
            print(error);
            return res.send({"status":0});
        }
        return res.send({status: 1});
    });
});

/**envia url para impressão */
app.post('/print-url', (req,res)=>{
    let url = req.body.url
    if(url){
        let query = "select * from config where id = 1";
        db.get(query,function(err,data){
            if(err){
                return res.send('falha ao obter o nome da impressora');
            }
            let config = toJson(data);
            
            chrome.printUrl(url,config.printer_name,config.orientation == '1' ? true : false);
            res.send({status: "success!"});
        });
        
    }else{
        res.send({status: "error url data not found."});
    }
    
});

app.listen(port,()=>{
    console.log(`servidor rodando na porta http://localhost:${port}`);
});

}

export default apiServer;