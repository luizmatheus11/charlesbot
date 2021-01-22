module.exports = class Command {
    constructor(client, options = {}) {
        this.client = client;
        this.commandSettings = {
            name: options.name || null,
            aliases: options.aliases || [],
            description: options.description || "Descrição não foi provida.",
            usage: options.usage || "A forma de Usar não foi provida",
            category: options.category || "Miscellaneous",
            cooldown: options.cooldown || 3,
            devOnly: options.devOnly || false
        }
    }
}