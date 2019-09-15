import axios from 'axios'

export class BackedService {

    async saveNewAmountMoney(doc){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/save', doc)        
    }

    async searchMoneyRecords(params){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/list', params)        
    }

}

export default new BackedService();