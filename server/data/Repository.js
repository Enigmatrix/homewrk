/**
 * Created by enigm on 3/9/2017.
 */
const config = require('../config');
const mysql = require('mysql');
const {toPromise} = require('../util');

class Repository{
    static get connection(){
        if(!Repository._connection){
            Repository._connection = mysql.createPool({
                connectionLimit : 10,
                host            : 'localhost',
                user            : 'root',
                password        : '',
                database        : 'homewrk'
            });
        }
        return Repository._connection;
    }
    query(opts){
        return toPromise(Repository.connection, Repository.connection.query, opts);
    }
}

module.exports = Repository;