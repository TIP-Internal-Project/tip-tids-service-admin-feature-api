const { getMockReq, getMockRes } = require("@jest-mock/express");
const TeamMembersController = require('../team-members');
const TeamMembersProfile = require('../../models/TeamMemberProfile')
const mockData = require('./mockData.json');

describe('team-members controllers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    getMockRes().mockClear();
  })

  it('getAllTeamMembers: should return all team members', async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    jest.spyOn(TeamMembersProfile, 'find').mockResolvedValue(mockData.teamMembersProfile);
    await TeamMembersController.getAllTeamMembers(req, res);
    expect(res.send).toHaveBeenCalledWith(mockData.teamMembersProfile);
  })

  it('getTeamMemberProfileById: should return one team member', async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    jest.spyOn(TeamMembersProfile, 'find').mockImplementation(() => { return mockData.teamMembersProfile[0] });
    await TeamMembersController.getTeamMemberProfileById(req, res);
    expect(res.send).toHaveBeenCalledWith(mockData.teamMembersProfile[0]);
  })

  it('getTeamMemberProfileById: should error if no team member found', async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    jest.spyOn(TeamMembersProfile, 'find').mockImplementation(() => { return [] });
    await TeamMembersController.getTeamMemberProfileById(req, res);
    expect(res.status(400).send).toHaveBeenCalledWith({ error: "No team member found." });
  })

  it('updateTeamMemberProfile: should update team member details', async () => {
    const req = getMockReq({ params: { employeeId: "10217900" }, body: { lastName: "Last", firstName: "First", jobProfile: "Job Profile", immediateManagerName: "Manager", immediateManagerId: "0000000000", pictureUrl: "http://picture.com", TIEmail: "ti@email.com", clientEmail: "client@email.com", functionalArea: "Area" } });
    const { res } = getMockRes();
    jest.spyOn(TeamMembersProfile, 'findOneAndUpdate').mockImplementation(() => { return mockData.teamMembersProfile[0] });
    await TeamMembersController.updateTeamMemberProfile(req, res);
    expect(res.send).toHaveBeenCalledWith(mockData.teamMembersProfile[0]);
  })

  it('updateTeamMemberProfile: should error if provided data is incomplete', async () => {
    const req = getMockReq({ params: { employeeId: 1 }, body: { firstName: "Updated" } });
    const { res } = getMockRes();
    jest.spyOn(TeamMembersProfile, 'findOneAndUpdate').mockImplementation();
    await TeamMembersController.updateTeamMemberProfile(req, res);
    expect(res.status(400).send).toHaveBeenCalledWith({ error: "Insufficient data provided." });
  })

  it('updateTeamMemberProfile: should error if no team member found', async () => {
    const req = getMockReq({ params: { employeeId: 3 }, body: { lastName: "Last", firstName: "First", jobProfile: "Job Profile", immediateManagerName: "Manager", immediateManagerId: "0000000000", pictureUrl: "http://picture.com", TIEmail: "ti@email.com", clientEmail: "client@email.com", functionalArea: "Area" } });
    const { res } = getMockRes();
    jest.spyOn(TeamMembersProfile, 'findOneAndUpdate').mockImplementation(() => { return null });
    await TeamMembersController.updateTeamMemberProfile(req, res);
    expect(res.status(400).send).toHaveBeenCalledWith({ error: "No team member found." });
  })
})
