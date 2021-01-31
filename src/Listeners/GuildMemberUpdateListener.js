const Event = require('../Structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberUpdate'
        })
    }

    async run(oldMember, newMember) {
        const auditlog = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_ROLE_UPDATE',
        });
        const roleupdate = auditlog.entries.first()
        const role1 = newMember.guild.roles.cache.find(r => r.name === 'Advertencia 1')
        const role2 = newMember.guild.roles.cache.find(r => r.name === 'Advertencia 2')
        const {executor, target} = roleupdate;
        if(executor.bot === false){
        if(oldMember.roles.cache.has(role1.id) && !newMember.roles.cache.has(role1.id)) newMember.roles.add(role1)
        if(oldMember.roles.cache.has(role2.id) && !newMember.roles.cache.has(role2.id)) newMember.roles.add(role2)
        }
        
    }
}