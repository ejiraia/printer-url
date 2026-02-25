import { Builder } from "selenium-webdriver"
import chrome from 'selenium-webdriver/chrome.js';

class SeleniumController{

    /**@param options : chrome.Options() */
    configInvisible(options){
        options.addArguments('--headless');           // Executa sem interface
        options.addArguments('--disable-gpu');        // Evita problemas gráficos
    }

    /**@param options : chrome.Options() */
    configSetPosition(options,x = '3000',y = '0'){

        // Define tamanho da janela
        options.addArguments(`--window-size=800,600`);
        // Define posição da janela (fora da tela, por exemplo à direita)
        options.addArguments(`--window-position=${x},${y}`); // X=3000, Y=0
    }

    configBrowser(printer = '',isLandscapeEnabled = false){

        const options = new chrome.Options();
        /** Ativa impressão automática sem diálogo  */ 

        // this.configInvisible(options)
        this.configSetPosition(options)

        options.addArguments('--kiosk-printing');     // Imprime sem diálogo
        options.setUserPreferences({
            'printing.print_preview_sticky_settings.appState': JSON.stringify({
                recentDestinations: [{
                    id: printer,
                    origin: 'local',
                    account: ''
                }],
                selectedDestinationId: printer,
                marginsType: 1, // 0 = padrão, 1 = sem margens
                customMargins: {},
                headersAndFooters: false,
                isLandscapeEnabled: isLandscapeEnabled,  // Ativa orientação paisagem
                version: 2,
                
            })
        });

        return options
    }

    async printUrl(url = '' , printer = '', isLandscapeEnabled = false){
        
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(this.configBrowser(printer,isLandscapeEnabled))
            .build();

        await driver.get(url);
        
        await driver.executeScript('window.print();');

        setTimeout(()=>{
            driver.quit();
        },4000)
        
    }
    
}

export default new SeleniumController