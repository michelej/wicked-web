import axios from 'axios'

export class AuthService {

    async login(user, pass) {
        return new Promise((resolve, reject) => {
            axios.get(process.env.VUE_APP_API_URL + '/wicked/api/v1/auth', {
                auth: {
                    username: user,
                    password: pass
                }
            }).then(() => {
                localStorage.setItem('wickedUSR',btoa(JSON.stringify({ user: user, pass: pass })))                
                resolve()
            }).catch(err => {
                console.error(err)
                reject()
            })
        })
    }

    logout() {
        localStorage.removeItem('wickedUSR')
    }

    isAuthenticated(){
        let user = localStorage.getItem('wickedUSR')
        return user ? true : false
    }

    getUserName(){
        let token = this.getAuthToken()        
        return token.auth.username
    }

    getAuthToken() {
        let user = localStorage.getItem('wickedUSR')
        user = JSON.parse(atob(user))        
        return {
            auth: {
                username: user.user,
                password: user.pass
            }
        }
    }



}

export default new AuthService();