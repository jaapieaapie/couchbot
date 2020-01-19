exports.run = (client, message, args) => {

    let member = message.member;
    let mention = message.mentions.members.first();
    if(mention) member = mention;
    let xp = require("../handlers/xp").get(member.id).then(xp => {
        message.channel.send(`${member} has ${xp | 0} XP`)
    }).catch(err => {
        message.channel.send("Database error accured")
    });
    
}

exports.desc = "See the amount of XP a user has";