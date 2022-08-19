import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import ITeam from '../database/interfaces/ITeam';
import Team from '../database/models/team';


chai.use(chaiHttp)

const { expect } = chai;

const teamMock: ITeam = {
    id: 1,
    teamName: 'TFC'
}

describe('/teams', () => {
    beforeEach(() => {
        sinon.stub(Team, 'findAll').resolves([teamMock as Team])
    })
    afterEach(() => {
        sinon.restore();
    })
    it('should return status 200', async () => {
        const response = await chai.request(app).get('/teams');
        expect(response.status).to.equal(200);
    })
})