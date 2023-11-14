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

    async addStarPoints(employeeName, points) {
        try {
            const [firstName, lastName] = employeeName.split(' ');

            // Escape any special characters in the first name and last name
            const escapedFirstName = firstName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const escapedLastName = lastName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

            // Construct the regular expression pattern
            const regexPattern = new RegExp(`^${escapedFirstName}.*${escapedLastName}$`, 'i');
            // Search for the document based on the employeeName
            const teamMembers = await TeamMember.find({ employeeName: regexPattern });

            if (teamMembers.length === 0) {
                throw new Error('Team member not found');
            }

            // Iterate over the found team members and update their starPoints fields
            for (const teamMember of teamMembers) {
                // Update the starPoints field by adding points
                teamMember.starPoints = (teamMember.starPoints || 0) + points;

                // Save the updated document back to the database
                await teamMember.save();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

module.exports = new TeamMemberService();
