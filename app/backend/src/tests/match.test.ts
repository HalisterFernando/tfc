import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import IMatch from '../database/interfaces/IMatch';
import Match from '../database/models/match';
import { request } from 'http';


chai.use(chaiHttp)

const { expect } = chai;

const matchMock = {
    
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": Boolean(0),
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      
}

// const matchMockInProgress = {
    
//   "id": 1,
//   "homeTeam": 16,
//   "homeTeamGoals": 1,
//   "awayTeam": 8,
//   "awayTeamGoals": 1,
//   "inProgress": Boolean(1),
//   "teamHome": {
//     "teamName": "São Paulo"
//   },
//   "teamAway": {
//     "teamName": "Grêmio"
//   }

// }

describe('/matches', () => {
    beforeEach(() => {
        sinon.stub(Match, 'findAll').resolves([matchMock as unknown as Match])
    })
    afterEach(() => {
        sinon.restore();
    })
    it('should return status 200', async () => {
        const response = await chai.request(app).get('/matches');
        expect(response.status).to.equal(200)
    })
    // describe('/matches?inProgress', () => {
    //   beforeEach(() => {
    //     sinon.stub(Match, 'findAll').resolves([matchMockInProgress as unknown as Match])
    //   })
    //   afterEach(() => {
    //     sinon.restore()
    //   })

    // })

})