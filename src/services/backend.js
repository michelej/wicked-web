import axios from 'axios'

export class BackedService {

    async saveNewAmountMoney(doc){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/save', doc)        
    }

    async searchMoneyRecords(params){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/list', params)        
    }

    async login(user,pass){
        return await axios.get( process.env.VUE_APP_API_URL+'/wicked/api/v1/auth',{auth: {
            username: user,
            password: pass
        }})        
    }

}

export default new BackedService();