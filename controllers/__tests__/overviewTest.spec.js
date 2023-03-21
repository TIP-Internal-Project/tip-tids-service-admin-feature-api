const EventModel = require('../../models/Event');
const OverviewService = require('../../services/overviewService');

describe('When data is valid', () => {
  beforeAll(() => {
      EventModel.find = jest.fn().mockResolvedValue([{
            _id: '641171318cfa973bb8de43bd',
            title: 'sample event title',
            detail: 'sample event detail',
            venue: 'sample event venue',
            venueDetails: 'sample event venue details',
            starsNum: 3,
            pictureUrl: 'sample event pic url',
            startDate: '2023-04-20T04:00:00Z',
            endDate: '2023-04-20T04:00:00Z',
            startTime: '2023-04-20T05:00:00Z',
            endTime: '2023-04-21T03:00:00Z',
            code: '420',
            createdBy: 'sample',
            updatedAt:null,
            updatedBy:null,
            category: 'sample event category',
            postEventSurveyURL: 'sample post event survey url',
            __v:0
        },
        {
            _id:'641174488cfa973bb8de43c0',
            title:'sample event title #2',
            detail:'sample event detail #2',
            venue:'sample event venue #2',
            venueDetails:'sample event venue details #2',
            starsNum:3,
            pictureUrl:'sample event pic url #2',
            startDate:'2023-05-20T04:00:00Z',
            endDate:'2023-05-20T04:00:00Z',
            startTime:'2023-05-20T05:00:00Z',
            endTime:'2023-05-21T03:00:00Z',
            code:'520',
            createdBy:'sample #2',
            updatedAt:null,
            updatedBy:null,
            category:'sample event category #2',
            postEventSurveyURL:'sample post event survey url #2',
            __v:0
        }
      ])
  });

  it('Should return entries', async () => {
      const overviewService = OverviewService;

      const expected = [{
            _id: '641171318cfa973bb8de43bd',
            title: 'sample event title',
            detail: 'sample event detail',
            venue: 'sample event venue',
            venueDetails: 'sample event venue details',
            starsNum: 3,
            pictureUrl: 'sample event pic url',
            startDate: '2023-04-20T04:00:00Z',
            endDate: '2023-04-20T04:00:00Z',
            startTime: '2023-04-20T05:00:00Z',
            endTime: '2023-04-21T03:00:00Z',
            code: '420',
            createdBy: 'sample',
            updatedAt:null,
            updatedBy:null,
            category: 'sample event category',
            postEventSurveyURL: 'sample post event survey url',
            __v:0
        },
        {
            _id:'641174488cfa973bb8de43c0',
            title:'sample event title #2',
            detail:'sample event detail #2',
            venue:'sample event venue #2',
            venueDetails:'sample event venue details #2',
            starsNum:3,
            pictureUrl:'sample event pic url #2',
            startDate:'2023-05-20T04:00:00Z',
            endDate:'2023-05-20T04:00:00Z',
            startTime:'2023-05-20T05:00:00Z',
            endTime:'2023-05-21T03:00:00Z',
            code:'520',
            createdBy:'sample #2',
            updatedAt:null,
            updatedBy:null,
            category:'sample event category #2',
            postEventSurveyURL:'sample post event survey url #2',
            __v:0
        }
      ];
      await expect(overviewService.getEvents()).resolves.toEqual(expected);
  });
});