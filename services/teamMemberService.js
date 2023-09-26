const TeamMember = require('../models/TeamMember')

class TeamMemberService {

    async getTeamMemberInfoByName(employeeName) {
        const teamMember = await TeamMember.find({ employeeName });
        console.log('Team Member:', teamMember);
        return teamMember;
    }
}

module.exports = new TeamMemberService();
