const axios = require('axios');
const excelFile = require('./excel/excel');
const urlAPI = "https://api.chat-api.com/instance242649/message?token=ouh18swq4zlro1y1"
async function send(){
    let loop = 2;
    for(let data of await excelFile.read()){
        let body = {
            phone: data.number, // Receivers phone
            body: data.message, // Сообщение
        };
        let sendMessage = await axios.post(urlAPI, body)
        if(sendMessage.data.sent){
            const date = new Date().toISOString()
            excelFile.write(date, 3, loop);
        }
        loop++
    }
}
send()