const TeamMember = require('../models/TeamMember')

class TeamMemberService {

    async getTeamMemberInfoByName(employeeName) {
        const [firstName, lastName] = employeeName.split(' ');

        // Escape any special characters in the first name and last name
        const escapedFirstName = firstName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const escapedLastName = lastName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        // Construct the regular expression pattern
        const regexPattern = new RegExp(`^${escapedFirstName}.*${escapedLastName}$`, 'i');

        const teamMember = await TeamMember.find({ employeeName: regexPattern });
        return teamMember;
    }
}

module.exports = new TeamMemberService();
