import axios from 'axios'
import auth from './auth'

export class BackedService {

    async saveNewAmountMoney(doc){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/save', doc,auth.getAuthToken())        
    }

    async searchMoneyRecords(params){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/list', params ,auth.getAuthToken())        
    }

   

}

export default new BackedService();