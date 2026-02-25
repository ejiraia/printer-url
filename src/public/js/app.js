
const app = {
    baseUrl: 'http://localhost:3030/',
    printers: [{Name:'carregando...'}],
    printerName: 'MP-4200 TH',
    orientation: 0,
    loadingPrinters: false,
    init(){
        
        this.loadConfig()

    },
    saveConfig(){
        
        const data = {
            printer_name: this.printerName,
            orientation: this.orientation,
        };
        const config = {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(data) // Convert data to JSON string
        }

        fetch(this.baseUrl+'config-printer', config)
        .then(response => response.json())
        .then(result => {
                console.log('Success:', result); // Handle the response data
            alert('Dados Salvos!');
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
    },
    loadConfig(){
        /** Lista as impressoras: */
        //this.listPrintersWindows();

        /**verifica a impessora definida: */
        fetch(this.baseUrl+'config-printer').then(res=>res.json())
        .then(data => {
            this.printerName = data.printer_name;
            this.orientation = data.orientation;
        });
    },
    listPrintersWindows(){
        /**Obs: a listagem de impressoras não funciona em todos os PCs então optei por utilizar
         * um "imput text" para definir o valor, antes utilizava um "select".
         */
        fetch(this.baseUrl+'list-printers').then(res=>res.json())
        .then(data => {
            this.printers = data;
            this.loadingPrinters = false;
        });
    }

}