exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("HEY, You are not allowed to do this");

    let member = message.mentions.members.first();
    if(!member) return message.channel.send("You need to mention someone after the command for this to work");

    require('../handlers/xp').reset(member.id);
    message.channel.send("Reset " + member.user.username);
}