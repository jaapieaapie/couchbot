let con = require("./xp").con;
exports.add = (id) => {

    con.query(`SELECT * FROM user WHERE id=${id}`, function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            con.query(`UPDATE user SET rTickets=${rows[0].rTickets + 1} WHERE id=${id}`)
        } else {
            con.query(`INSERT INTO user (id, rTickets) VALUES (${id}, 1)`)
        }
    })
}

exports.remove = (id) => {
    con.query(`SELECT * FROM user WHERE id=${id}`, function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            con.query(`UPDATE user SET rTickets=${rows[0].rTickets - 1} WHERE id=${id}`)
        } else {
           return;
        }
    })
}

exports.get = (id) => {
    var promise = new Promise(function(resolve, reject) {
        con.query(`SELECT * FROM user WHERE id=${id}`, function(err, rows) {
            if(err) return reject(err);
            return resolve(rows[0].rTickets);
        })
    })
    return promise;
}

exports.hardReset = () => {
    con.query(`UPDATE user SET rTickets=0`);
}