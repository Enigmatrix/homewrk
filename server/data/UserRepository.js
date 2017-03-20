/**
 * Created by enigm on 3/9/2017.
 */
const Repository = require('./Repository');

class UserRepository extends Repository{
    allUsers(){
        return this.query('select * from user');
    }
    userWithId(userid){
        return this._userWithProperties([['userid', userid]]);
    }
    userWithUsername(username){
        return this._userWithProperties([['username', username]]);
    }
    authenticate(username, password){
        return this._userWithProperties([['username', username], ['password', password]]);
    }
    insert(user){
        return this.query({sql: 'insert into user set ?', values: user});
    }
    _userWithProperties(keyVals){
        let condition = keyVals[0][0] + ' = ? ' +
            (keyVals.length <= 1 ? '' :
                keyVals.slice(1).map(([key,]) => ' and ' +key + ' = ?').reduce((a, b) => a + b));

        return this.query({
            sql: 'select * from user where ' + condition,
            values: keyVals.map(([, val]) => val)})
        //get one single value instead of a list
            .then(([user,...rest]) => {
                if(rest.length !== 0) console.error("More than one result in set! ", rest);
                return user;
            });
    }
}

module.exports = UserRepository;