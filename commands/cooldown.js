const fs = require("fs");
exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You are not allowed to use this command");

    let cooldown = client.config.cooldown;
    if(cooldown) {
        client.config.cooldown = false;
        fs.writeFileSync('config.json', JSON.stringify(client.config, null, 2));
        message.channel.send("Toggled xp cooldown off");
    } else {
        client.config.cooldown = true;
        fs.writeFileSync('config.json', JSON.stringify(client.config, null, 2));
        message.channel.send("Toggled xp cooldown on");
    }
}