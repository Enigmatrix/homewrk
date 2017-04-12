/**
 * Created by enigm on 3/9/2017.
 */
let toPromise = (ctx, func, ...args) => {
    return new Promise((res, rej) => {
        func.bind(ctx)(...args, (err, ...callbackArgs) => {
            if(err) {
                rej(err);
            }
            else{
                res(...callbackArgs);
            }
        })
    })
};

    function toYMD() {
        var year, month, day;
        year = String(this.getFullYear());
        month = String(this.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(this.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    };

module.exports = {
    toPromise,
    toYMD
};