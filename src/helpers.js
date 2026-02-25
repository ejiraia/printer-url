import {exec} from 'child_process';
import fs from 'fs';
import migrates from './database/migrations.js';
import seeders from './database/seeders.js';

// helpers
/**@print forma reduzida do console.log( ) */
export const print = (...args)=>{
    console.log(args);
}

/**@toJson converte retorno do DB em json */
export const toJson = (data)=>{
    return JSON.parse(JSON.stringify(data));
}

/**@accessToken token de acesso */
export const accessToken = "kjiasdhkjsxhdkja.jkhkjashajs.ljhjklhj";

/**@parsePrinterOutput converte lista de impressoras em json */
function parsePrinterOutput(output) {
  const lines = output.trim().split('\n');

  // Extrai os cabeçalhos com base em espaçamento fixo
  const headers = lines.shift().match(/.{1,40}/g).map(h => h.trim());

  // Mapeia cada linha para um objeto
  return lines.map(line => {
    const values = line.match(/.{1,40}/g).map(v => v.trim());
    const printer = {};
    headers.forEach((header, index) => {
      printer[header.replaceAll(' ','')] = values[index] || '';
    });
    return printer;
  });
}

/**@listPrinters lista as impressoras do windows */
export const listPrinters = () => {
    return new Promise((success,reject)=>{
        exec('wmic printer list brief', (err, stdout, stderr) => {
            if (err) return console.error(err);

            let json = parsePrinterOutput(stdout);

            return success(json);
        });
    })
}

export const firstConfig = async () => {

    return new Promise(async (resolve,reject) =>{
      try{
        await migrates();
        await seeders();
        return resolve({"status":1});

      }catch(e){
        
        reject(print('firstConfig erro: ' +e));
      }
    })
}