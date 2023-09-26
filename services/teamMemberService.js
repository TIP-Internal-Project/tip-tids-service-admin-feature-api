const TeamMember = require('../models/TeamMember')

class TeamMemberService {

    async getTeamMemberInfoByName(employeeName) {
        const regexPattern = new RegExp(`^${employeeName}`, 'i');
        const teamMember = await TeamMember.find({ employeeName: regexPattern });
        return teamMember;
    }
}

module.exports = new TeamMemberService();
