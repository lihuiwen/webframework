"use strict";
class UserService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`hello World【${id}】`);
            }, 1000);
        })
    }
}
export default UserService;