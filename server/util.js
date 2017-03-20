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

module.exports = {
    toPromise
};