const Discord = require("discord.js");
exports.run = (client, message, args) => {
    client.mysql.query(`SELECT * FROM events ORDER BY wins DESC LIMIT 10`, function(err, rows) {
        if(err) throw err;
        const embed = new Discord.RichEmbed()
            .setTitle("Event leaderboard");
            console.log(rows)
        rows.forEach(r => {
            embed.addField(client.users.get(r.id).username, r.wins + " wins");
        });
        message.channel.send(embed);
    })
}

exports.desc = "The event leaderbord";