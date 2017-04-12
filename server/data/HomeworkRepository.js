/**
 * Created by enigm on 3/11/2017.
 */

const Repository = require('./Repository');

class HomeworkRepository extends Repository{
    homeworkSummary(uid){
        return this.query({sql:
            "select " +
            "   sum(CASE WHEN w.status = 'in-progress' THEN 1 ELSE 0 END) inProgress, " +
            "   sum(CASE WHEN w.status = 'done' THEN 1 ELSE 0 END) done, " +
            "   count(w.id) total, h.*, min(ifnull(d.datetime, d.start_time)) earliestDeadline " +
            "from homework h, work w, deadline d, associated_homework a " +
            "where a.uid = ? and a.hid = h.id and w.hid = h.id and d.id = w.did " +
            "group by h.id", values: [uid]});

        /*
         select
            sum(CASE WHEN w.status = 'in-progress' THEN 1 ELSE 0 END) inProgress,
            sum(CASE WHEN w.status = 'done' THEN 1 ELSE 0 END) done,
            count(w.id) total, h.*, min(ifnull(d.datetime, d.start_time)) earliestDeadline
         from homework h, work w, deadline d, associated_homework a
         where a.uid = 'h1310018' and a.hid = h.id and w.hid = h.id and d.id = w.did
         group by h.id
        * */
    }
}

module.exports = HomeworkRepository;