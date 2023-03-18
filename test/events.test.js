const { expect } = require('chai');
const sinon = require('sinon');
const EventService = require('../services/eventService');
const eventController = require('../controllers/eventController');

describe('Event controller', () => {
  describe('createEvent', () => {
    it('should create a new event', async () => {
      const req = {
        body: {
          title: 'Test Event',
          detail: 'This is a test event',
          venue: 'Test Venue',
          startDate: '2022-01-01',
          endDate: '2022-01-01',
          startTime: '12:00',
          endTime: '13:00',
          code: 'ABC123',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const expectedEvent = {
        eventId: 1,
        title: 'Test Event',
        detail: 'This is a test event',
        venue: 'Test Venue',
        startDate: '2022-01-01T00:00:00.000Z',
        endDate: '2022-01-01T00:00:00.000Z',
        startTime: '12:00:00',
        endTime: '13:00:00',
        code: 'ABC123',
        createdDate: '2022-03-14T00:00:00.000Z',
        createdBy: 'User 1',
        updatedDate: '2022-03-14T00:00:00.000Z',
        updatedBy: 'User 1',
      };
      sinon.stub(EventService, 'createEvent').resolves(expectedEvent);

      await eventController.createEvent(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(expectedEvent)).to.be.true;
    });
  });
});


describe('Event controller', () => {
  describe('getEvents', () => {
    it('should return a list of events', async () => {
      const req = {
        query: {
          limit: 10,
          offset: 0,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const expectedEvents = [
        {
          eventId: 1,
          title: 'Event 1',
          detail: 'This is event 1',
          venue: 'Venue 1',
          startDate: '2022-01-01T00:00:00.000Z',
          endDate: '2022-01-01T00:00:00.000Z',
          startTime: '12:00:00',
          endTime: '13:00:00',
          code: 'ABC123',
          createdDate: '2022-03-14T00:00:00.000Z',
          createdBy: 'User 1',
          updatedDate: '2022-03-14T00:00:00.000Z',
          updatedBy: 'User 1',
        },
        {
          eventId: 2,
          title: 'Event 2',
          detail: 'This is event 2',
          venue: 'Venue 2',
          startDate: '2022-01-02T00:00:00.000Z',
          endDate: '2022-01-02T00:00:00.000Z',
          startTime: '14:00:00',
          endTime: '15:00:00',
          code: 'DEF456',
          createdDate: '2022-03-15T00:00:00.000Z',
          createdBy: 'User 2',
          updatedDate: '2022-03-15T00:00:00.000Z',
          updatedBy: 'User 2',
        },
      ];
      sinon.stub(EventService, 'getEvents').resolves(expectedEvents);

      await eventController.getEvents(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(expectedEvents)).to.be.true;
    });
  });
});


describe('Event controller', () =>{
  describe('getEventById' , () => {
    it('should return an event by id', async() => {
      const req = {
        

      }
    })

  })
} )