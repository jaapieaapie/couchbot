const Discord = require("discord.js");
const fs = require("fs");
const enmap = require("enmap");
const config = require("./config");
const mysql = require("mysql");
const schedule = require("node-schedule");

schedule.scheduleJob('* * * 1 * *', function() {
    require("./handlers/raffle").hardReset();
})
const client = new Discord.Client();

//667455911652229123
//✈️
//☁️
client.on("message", (message) => {
    if(message.content.toLowerCase() === "couch") {
        if(message.author.id !== "219509899359551489") return message.channel.send("I only listen to my creator");

        message.channel.send("Yes sir?");
        const filter = m => m.author.id === "219509899359551489";
        // Errors: ['time'] treats ending because of the time limit as an error
        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            let c = collected.first();

            if(c.content.toLowerCase().startsWith("kill")) {
                let member = c.mentions.members.first();
                if(!member) return;

                message.channel.send("Killing " + member + " in 30 seconds unless someone says no").then(msg => {

                    const filter2 = m => m.content.toLowerCase() === "no" || m.content.toLowerCase() === "faster";
                    
                    message.channel.awaitMessages(filter2, { max: 1, time: 30000, errors: ['time'] })
                        .then(collected1 => {
                            let c1 = collected1.first();
                            
                            if(c1.content.toLowerCase() === "faster") {
                                return msg.edit("Killed " + member)
                            }
                            if(c1) {
                                msg.edit("Aborted")
                            }
                        }).catch( () => { msg.edit("Killed " + member)})
                })
            }
        })
        .catch(collected => {});
    }
    if(message.content.toLowerCase() === "couch nuke") {
        if(message.author.id !== "219509899359551489") return message.channel.send("Unauthorized did you really think I would let you nuke");
        let nuke = client.emojis.get("667455911652229123");

        let chn = message.channel;
        chn.send(`.✈️`).then(msg => {

            setTimeout(function() {
                msg.edit(`.  ✈️`);
                setTimeout(function() {
                    msg.edit(`.    ✈️`);
                    setTimeout(function() {
                        msg.edit(`.    ✈️\n     ${nuke}`);
                        setTimeout(function() {
                            msg.edit(`.      ✈️\n\n     ${nuke}`);
                            setTimeout(function() {
                                msg.edit(`.        ✈️\n\n\n     ${nuke}`);
                                setTimeout(function() {
                                    msg.edit(`.          \n\n\n\n     ${nuke}`);
                                    setTimeout(function() {
                                        msg.edit(`.\n\n\n\n\n     ${nuke}`);
                                            setTimeout(function() {
                                                msg.edit(`.\n\n\n\n\n     ☁️`);
                                                setTimeout(function() {
                                                    msg.edit(`.\n\n\n\n      ☁️\n   ☁️☁️☁️`);
                                                    setTimeout(function() {
                                                        msg.edit(`.
  ☁️☁️☁️☁️☁️☁️
☁️☁️☁️☁️☁️☁️☁️☁️
  ☁️☁️☁️☁️☁️☁️
        ☁️
        ☁️
    ☁️☁️☁️☁️
                                                        `);
                                                    }, 2000)
                                                }, 2000)
                                            }, 2000)
                                    }, 2000)
                                }, 2000)
                            }, 2000)
                        }, 2000)
                    }, 2000)
    
                }, 2000)
            }, 2000)
        });

        

    }
})


client.mysql = mysql.createConnection({
    host: "localhost",
    user: "jaap",
    password: "Changed this",
    database: "couch",
    supportBigNumbers: true
})
exports.client = client;

schedule.scheduleJob('0 0 0 * * 0', function() {
    require("./handlers/staff").send(client, [client.users.get("577699388458139674"), client.users.get("219509899359551489")]);
    require("./handlers/staff").reset();
})



client.commands = new enmap();
client.config = config;
client.staff = '618927074479964160';
fs.readdir("commands", function(err, files) {
    if(err) throw err;
    files.forEach(f => {
        let split = f.split(".");
        let name = split[0];
        let suffix = split[1];
        if(suffix !== "js") return;
        let props = require(`./commands/${f}`);
        props.name = name;
        client.commands.set(name, props);
    });
});


fs.readdir("events", function(err, files) {
    if(err) throw err;
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.login(config.token);
