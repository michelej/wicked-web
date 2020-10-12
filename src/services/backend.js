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

    async getMoneySources(){
        return await axios.get( process.env.VUE_APP_API_URL+'/wicked/api/v1/money/sources', auth.getAuthToken())        
    }

    async getAllUsers(){
        return await axios.get( process.env.VUE_APP_API_URL+'/wicked/api/v1/users', auth.getAuthToken())        
    }

    getCalendarMonths(){
        return [
            {name:"Enero",value:0},
            {name:"Febrero",value:1},
            {name:"Marzo",value:2},
            {name:"Abril",value:3},
            {name:"Mayo",value:4},
            {name:"Junio",value:5},
            {name:"Julio",value:6},
            {name:"Agosto",value:7},
            {name:"Septiembre",value:8},
            {name:"Octubre",value:9},
            {name:"Noviembre",value:10},
            {name:"Diciembre",value:11}
        ]
    }

    async saveBudget(doc){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/budget', doc,auth.getAuthToken())        
    }

    async getBudget(id){
        return await axios.get( process.env.VUE_APP_API_URL+'/wicked/api/v1/budget/get/'+id,auth.getAuthToken())        
    }

    async deleteBudget(id){
        return await axios.delete( process.env.VUE_APP_API_URL+'/wicked/api/v1/budget/'+id, auth.getAuthToken())        
    }

    async searchBudgets(params){
        return await axios.post( process.env.VUE_APP_API_URL+'/wicked/api/v1/budget/list', params ,auth.getAuthToken())        
    }
   

}

export default new BackedService();