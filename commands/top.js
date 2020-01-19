const Discord = require("discord.js");

exports.run = (client, message, args) => {

    let amount = args[0];
    if(!args[0]) amount = 10;

    const embed = new Discord.RichEmbed()
        .setTitle(`Top ${amount}`);
    
    require("../handlers/xp").top(amount).then((arr) => {
        arr.forEach((a, i) => {
            let user = client.users.get(a.id);
            var username;
            if(!user) {
                username = "Person left removing them from the leaderboard";

                require("../handlers/xp").reset(a.id);
            }
            if(!username) username = user.username;
            embed.addField(`[${i + 1}] ` + username, a.xp + " XP");
        });
        message.channel.send(embed);
    })
}

exports.desc = "The XP leaderbord";