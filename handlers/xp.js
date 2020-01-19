const mysql = require("mysql");

let con = mysql.createConnection({
    host: "localhost",
    user: "jaap",
    password: "Changed this lol",
    database: "couch",
    supportBigNumbers: true
})

exports.con = con;
exports.get = (id) => {
    var promise = new Promise(

        function(resolve, reject) {
            con.query(`SELECT * FROM user WHERE id=${id}`, function(err, rows) {
                if(err) return reject(err);
                if(!rows[0]) return resolve(0);
                resolve(rows[0].xp);
            })
        }
    );

    return promise;

}

exports.gain = (id, gain) => {
    con.query(`SELECT * FROM user WHERE id=${id}`, function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            con.query(`UPDATE user SET xp=${rows[0].xp + gain} WHERE id=${id}`)
        } else {
            con.query(`INSERT INTO user (id, xp) VALUES (${id}, ${gain})`)
        }
    })
}

exports.remove = (id, xp) => {
    con.query(`SELECT * FROM user WHERE id=${id}`, function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            let exit = rows[0].xp - xp;
            if(exit < 0) exit = 0;
            con.query(`UPDATE user SET xp=${exit} WHERE id=${id}`)
        } else {
            con.query(`INSERT INTO user (id, xp) VALUES (${id}, 0)`)
        }
    })
}

exports.reset = (id) => {
    con.query(`DELETE FROM user WHERE id=${id}`);
}

exports.top = (amount) => {
    var promise = new Promise(
        function(resolve, reject) {
            con.query(`SELECT * FROM user ORDER BY xp DESC LIMIT ${amount}`, function(err, rows) {
                if(err) throw reject(err);
                resolve(rows);
            })
        }
    )

    return promise;
    
}
