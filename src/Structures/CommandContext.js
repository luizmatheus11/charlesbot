module.exports = class CommandContext {
    constructor(message, args, client) {
        this.channel = message.channel;
        this.guild = message.guild;
        this.member = message.member;
        this.author = message.author;
        this.mentions = message.mentions;
        this.args = args;

        this.client = client;
    }
}