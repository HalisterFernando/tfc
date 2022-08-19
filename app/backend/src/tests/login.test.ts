import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import LoginService from '../database/services/LoginService';
import LoginController from '../database/controllers/LoginController';
import IUser from '../database/interfaces/IUser';
import User from '../database/models/user';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  username: 'Claudio',
  role: 'any-role',
  email: 'mail@mail.com',
  password: 'any-password',

}

const loginBodyMock = {
  email: 'mail@mail.com',
  password: 'any-password'
}

describe('login', () => {
  beforeEach(() => {
    sinon.stub(User, 'findOne').resolves(userMock as User)    
  });
  afterEach(() => {
    sinon.restore()
  });

  it('should return status 200', async () => {
    const response = await chai.request(app).post('/login').send(loginBodyMock);    
    expect(response.status).to.equal(200);
  }) 
});
