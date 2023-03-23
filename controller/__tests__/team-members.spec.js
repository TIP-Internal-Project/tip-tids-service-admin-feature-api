const { getMockReq, getMockRes } = require("@jest-mock/express");
const TeamMembersController = require('../team-members');
const TeamMembers = require('../../models/TeamMember')
const mockData = require('./mockData.json');

describe('team-members controllers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    getMockRes().mockClear();
  })

  it('getAllTeamMembers: should return all team members', async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    jest.spyOn(TeamMembers, 'find').mockResolvedValue(mockData.teamMembers);
    await TeamMembersController.getAllTeamMembers(req, res);
    expect(res.send).toHaveBeenCalledWith(mockData.teamMembers);
  })

  it('getTeamMemberById: should return one team member', async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    jest.spyOn(TeamMembers, 'find').mockImplementation(() => { return mockData.teamMembers[0] });
    await TeamMembersController.getTeamMemberById(req, res);
    expect(res.send).toHaveBeenCalledWith(mockData.teamMembers[0]);
  })

  it('getTeamMemberById: should error if no team member found', async () => {
    const req = getMockReq();
    const { res } = getMockRes();
    jest.spyOn(TeamMembers, 'find').mockImplementation(() => { return [] });
    await TeamMembersController.getTeamMemberById(req, res);
    expect(res.status(400).send).toHaveBeenCalledWith({ error: "No team member found." });
  })

  it('updateTeamMember: should update team member details', async () => {
    const req = getMockReq({ params: { employeeId: "10217900" }, body: { lastName: "Last", firstName: "First", jobProfile: "Job Profile", immediateManagerName: "Manager", immediateManagerId: "0000000000", pictureUrl: "http://picture.com", TIEmail: "ti@email.com", clientEmail: "client@email.com", functionalArea: "Area" } });
    const { res } = getMockRes();
    jest.spyOn(TeamMembers, 'findOneAndUpdate').mockImplementation(() => { return mockData.teamMembers[0] });
    await TeamMembersController.updateTeamMember(req, res);
    expect(res.send).toHaveBeenCalledWith(mockData.teamMembers[0]);
  })

  it('updateTeamMember: should error if provided data is incomplete', async () => {
    const req = getMockReq({ params: { employeeId: 1 }, body: { firstName: "Updated" } });
    const { res } = getMockRes();
    jest.spyOn(TeamMembers, 'findOneAndUpdate').mockImplementation();
    await TeamMembersController.updateTeamMember(req, res);
    expect(res.status(400).send).toHaveBeenCalledWith({ error: "Insufficient data provided." });
  })

  it('updateTeamMember: should error if no team member found', async () => {
    const req = getMockReq({ params: { employeeId: 3 }, body: { lastName: "Last", firstName: "First", jobProfile: "Job Profile", immediateManagerName: "Manager", immediateManagerId: "0000000000", pictureUrl: "http://picture.com", TIEmail: "ti@email.com", clientEmail: "client@email.com", functionalArea: "Area" } });
    const { res } = getMockRes();
    jest.spyOn(TeamMembers, 'findOneAndUpdate').mockImplementation(() => { return null });
    await TeamMembersController.updateTeamMember(req, res);
    expect(res.status(400).send).toHaveBeenCalledWith({ error: "No team member found." });
  })
})
