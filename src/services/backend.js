import axios from 'axios'

export class BackedService {

    async getWebConfig(){
        console.log(process.env);
        return await axios
            .get(process.env.VUE_APP_BACK_URL, {
                headers: {
                    "X-Parse-Application-Id": process.env.VUE_APP_APP_ID,
                    "X-Parse-REST-API-Key": process.env.VUE_APP_REST_API_KEY
                }
            })        
    }

}

export default new BackedService();