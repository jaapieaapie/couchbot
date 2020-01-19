exports.run = (client, message, args) => {
    require("../handlers/staff").send(client, [client.users.get(message.author.id)]);
    message.delete();
}