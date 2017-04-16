/**
 * Created by enigm on 3/11/2017.
 */

const Repository = require('./Repository');

class HomeworkRepository extends Repository{
    homeworkSummary(uid, nameQuery, startDate, endDate){
        nameQuery = nameQuery || '';
        startDate = startDate || '0000-00-00';
        endDate = endDate || '9999-00-00';

        return this.query({sql:
            "select " +
            "   sum(CASE WHEN w.status = 'unstarted' THEN 1 ELSE 0 END) unstarted, " +
            "   sum(CASE WHEN w.status = 'in-progress' THEN 1 ELSE 0 END) inProgress, " +
            "   sum(CASE WHEN w.status = 'done' THEN 1 ELSE 0 END) done, " +
            "   count(w.id) total, h.*, a.score userScore, min(ifnull(d.datetime, d.start_time)) earliestDeadline " +
            "from homework h, work w, deadline d, associated_homework a " +
            "where a.uid = ? and a.hid = h.id and w.hid = h.id and d.id = w.did " +
            "group by h.id " +
            "having lower(h.name) like ? and " +
            "   min(ifnull(d.datetime, d.start_time)) >= ? and " +
            "   max(ifnull(d.datetime, d.start_time)) <= ? ", values: [uid, '%'+nameQuery.toLowerCase()+'%', startDate, endDate]});
        /*
        * select
            sum(CASE WHEN w.status = 'unstarted' THEN 1 ELSE 0 END) unstarted,
            sum(CASE WHEN w.status = 'in-progress' THEN 1 ELSE 0 END) inProgress,
           sum(CASE WHEN w.status = 'done' THEN 1 ELSE 0 END) done,
            count(w.id) total, h.*, a.score userScore, min(ifnull(d.datetime, d.start_time)) earliestDeadline
         from homework h, work w, deadline d, associated_homework a
         where a.uid = 'h1310018' and a.hid = h.id and w.hid = h.id and d.id = w.did
         group by h.id
         having lower(h.name) like '%%' and min(ifnull(d.datetime, d.start_time)) >= '0000-00-00' and max(ifnull(d.datetime, d.start_time)) <= '9999-00-00'
        * */
    }
}

module.exports = HomeworkRepository;