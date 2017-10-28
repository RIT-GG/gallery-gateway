import google from 'googleapis';
import nconf from './config';
import User from './models/user';
import { STUDENT } from './permissionLevels'

const OAuth2 = google.auth.OAuth2;

export default class GoogleProvider {

  constructor(token, dce) {
    this.dce = dce;
    this.token = token;
    this.client = new OAuth2(nconf.get('auth:google:id'), nconf.get('auth:google:secret'));
  }

  verify() {
    return new Promise((resolve, reject) => {
      this.client.verifyIdToken(this.token, this.client.clientId, (err, ticket) => {
        if (err) {
          return reject(err);
        }
        this.payload = ticket.getPayload();
        if (this.payload.hd === 'g.rit.edu') {
          return resolve();
        }
        return reject({ message: 'Must login with a g.rit.edu account' });
      });
    });
  }

  findOrCreateUser() {
    return User
      .findOrCreate({ where: { username: this.dce } })
      .spread((user, created) => {
        user.firstName = this.payload.given_name;
        user.lastName = this.payload.family_name;
        user.type = STUDENT;
        return Promise.all([user.save(), created]);
      });
  }
}