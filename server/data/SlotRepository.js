/**
 * Created by enigm on 3/9/2017.
 */
const Repository = require('./Repository');

class SlotRepository extends Repository{
    slotsInRange(start, end, userid){
        return this.query({sql:'select * from slot ' +
        '                           where uid = ? and date >= ? and date <= ? and repeatMode="once"' +
        '                       union' +
            //a bit of a error here, since all weekly events will be loaded
        '                       select * from slot' +
        '                           where uid = ? and repeatMode="weekly" and not id=any' +
        '                               (select master from slot where uid=? and ' +
        '                                   not isnull(master) and repeatMode="weekly" and date>=? and date<=?)' +
        '                       union' +
        '                       select * from slot where uid=? and ' +
        '                                   not isnull(master) and repeatMode="weekly" and date>=? and date<=?',
            values:[userid, start, end, userid, userid, start, end, userid, start, end]})
    };
}

module.exports = SlotRepository;