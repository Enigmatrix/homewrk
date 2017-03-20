import {post} from '../util';

class AuthService {
    token = null;
    constructor(){
        this._readToken();
    }
    login(username, password, callback){
        if(this.isAuthenticated()) return;
        
        //NOTE: INSECURE! we do not have SSL cert to protect our password
        //from being network spoofed!!
        post('/api/login', {username, password})
            .then(res => {
                res.json().then(msg => {
                    if(msg.success){
                        this._storeToken(msg.token);
                    }
                    callback(msg);
                });
            });
    }
    register(username, userid, email, password, callback){
        if(this.isAuthenticated()) return;
        //TODO replace with server call
        post('/api/register', {username, userid, email, password})
            .then(res => {
                res.json().then(msg => {
                    if(msg.success){
                        this._storeToken(msg.token);
                    }
                    callback(msg);
                });
            });
    }
    logout(callback){
        if(!this.isAuthenticated()) return;
        this._removeToken();
        (callback || function(){})();
    }
    isAuthenticated(){
        return this.token !== null;
    }
    _readToken(){
        this.token = localStorage.getItem('token');
    }
    _storeToken(token){
        this.token = token;
        localStorage.setItem('token', token);
    }
    _removeToken(){
        this.token = null;
        localStorage.removeItem('token');
    }
}
export default new AuthService();