let con = require("./xp").con;
const plotly = require("plotly")('jaapie_aapie','d2d6LVoS7jzzXRSw7L0S');
const fs = require("fs");
const Discord = require("discord.js");
var cooldown = {};

exports.add = (message) => {
    if(message.content.startsWith("$")) return;
    if(message.content.startsWith("-")) return;
    if(message.content.startsWith("?")) return;
    if(message.content.startsWith("!")) return;
    if(message.content.startsWith(",")) return;
       con.query(`SELECT * FROM staff WHERE id=${message.author.id}`, function(err, rows) {
        if(err) throw err;
        if(!rows[0]) {
            let d = new Date();
            var json = [{
                time: d.getDay(),
                content: message.content.replace(/\'/gi, "").replace(/\"/gi, "")
            }]
            con.query(`INSERT INTO staff (id, msgs) VALUES (${message.author.id}, '${JSON.stringify(json)}')`);
        } else {
            let json = JSON.parse(rows[0].msgs);
            let d = new Date();
            json.push({
                time: d.getDay(),
                content: message.content.replace(/\'/gi, "").replace(/\"/gi, "")
            });
            let client = require("../index").client;
            if(json[json.length - 1].content.length <= 3 && json[json.length - 2].content.length <= 3 && json[json.length - 3].content.length <= 3) {
                var users = ["577699388458139674", "219509899359551489"]
                users.forEach(u => {
                    client.users.get(u).send(`${message.author.username} might be spamming because they send 3 very short messages in a row`);
                });
            };

            if(cooldown[message.author.id]) {
                var users = ["577699388458139674", "219509899359551489"]
                users.forEach(u => {
                    client.users.get(u).send(`${message.author.username} might be spamming because they send 2 messages in the same second`);
                });

            } else {
                cooldown[message.author.id] = 'ok';

                setTimeout(function() {
                    delete cooldown[message.author.id];
                }, 1000)
            }


            
            con.query(`UPDATE staff SET msgs='${JSON.stringify(json)}' WHERE id=${message.author.id}`);
        }
    })
}

exports.reset = () => {
    con.query(`DELETE FROM staff`)
}

exports.send = (client, users) => {
    con.query(`SELECT * FROM staff`, function(err, rows) {
        if(err) throw err;

        const embed = new Discord.RichEmbed()
            .setTitle("Staff activity");
        
        rows.forEach((r, i) => {
            rows[i].msgs = JSON.parse(r.msgs);
        })

        rows = rows.sort((a, b) => a.msgs.length > b.msgs.length);

        rows.forEach((r, i) => {
            embed.addField(client.users.get(r.id).username, `${r.msgs.length} messages this week`);
        })

        users.forEach(u => {
            u.send(embed);
        })
        /*
        if(err) throw err;
        var data = [];
        rows.forEach((r, i) => {
            var json = JSON.parse(r.msgs);
            rows[i].msgs = json;
            r.msgs = json;

            r.sunday = json.filter(m => m.time === 0);
            r.monday = json.filter(m => m.time === 1);
            r.tuesday = json.filter(m => m.time === 2);
            r.wednessday = json.filter(m => m.time === 3);
            r.thursday = json.filter(m => m.time === 4);
            r.friday = json.filter(m => m.time === 5);
            r.saturday = json.filter(m => m.time === 6);

            r.name = client.users.get(r.id).username;
            
            var trace = {
                x: [0, 1, 2, 3, 4, 5, 6],
                y: [r.sunday.length, r.monday.length, r.tuesday.length, r.wednessday.length, r.thursday.length, r.friday.length, r.saturday.length],
                mode: "lines",
                name: r.name
            }
            data.push(trace);
        });

        var imgOpts = {
            format: 'png',
            width: 1000,
            height: 500,
            layout: {
                title: "Staff activity"
            },
            word_readable: true
        };
        var figure = {data: data};
        plotly.getImage(figure, imgOpts, function (error, imageStream) {
            if (error) return console.log (error);
        
            var fileStream = fs.createWriteStream('1.png');
            imageStream.pipe(fileStream);

            fileStream.on("close", () => {
                users.forEach((u) => {
                    u.send("This is a test graph", {files: ["1.png"]})
                })
            })
        });
            
        */
    })
}