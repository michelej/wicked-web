import axios from 'axios'
import auth from './auth'

export class BackedService {

    async saveMoney(doc){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/money', doc,auth.getAuthToken())        
    }

    async getMoney(id){
        return await axios.get( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/get/'+id,auth.getAuthToken())        
    }

    async deleteMoney(id){
        return await axios.delete( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/'+id, auth.getAuthToken())        
    }

    async searchMoneyRecords(params){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/list', params ,auth.getAuthToken())        
    }

    async getMoneyCategories(){
        return await axios.get( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/categories', auth.getAuthToken())        
    }

    async getAllUsers(){
        return await axios.get( process.env.VUE_APP_API_URL+'/wicked/api/v1/users', auth.getAuthToken())        
    }

   

}

export default new BackedService();