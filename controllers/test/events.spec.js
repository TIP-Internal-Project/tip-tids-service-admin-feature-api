jest.mock('../../models/event', () => ({
    findAll: jest.fn(),
  }));
  
  const { getMockReq, getMockRes } = require("@jest-mock/express");
  const Event = require("../../models/event").default;
  const eventController = require("../eventController");
  const mockData = require("./mockData.json");
  
  describe("events controllers", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      getMockRes().mockClear();
    });
  
    it("getAllEvents: should return all events", async () => {
      const req = getMockReq();
      const { res } = getMockRes();
  
      jest.spyOn(Event, 'findAll').mockResolvedValue(mockData.events);
  
      await eventController.getEvents(req, res);
  
      //assert
      expect(res.send).toHaveBeenCalledWith({ events: mockData.events });
    });
  });
  