/**
 * Created by enigm on 3/11/2017.
 */

const Repository = require('./Repository');

class ModuleRepository extends Repository{
    allModules(uid){
        return this.query({sql: "select m.* from module m, has_module hm where hm.uid=? and hm.mCode=m.moduleCode", values: [uid]})
    }
}

module.exports = ModuleRepository;