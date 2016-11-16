export function execAsPromise(fn) {
    return new Promise((resolve, reject) => {
        fn((err, res) => {
            if (err) {
                reject(err);
            }

            else {
                resolve(res);
            }
        });
    });

}
