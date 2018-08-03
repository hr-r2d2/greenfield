let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/controllers/index.js').app;
let should = chai.should();

chai.use(chaiHttp);

describe('/GET reviewsByParenId', () => {

  it('should get the 10 most recent reviews (where parent Id is 0', () => {
    chai.request(server)
      .get('/reviewsByParentId')
      .query({parentId: 0})
      .end((err, res) => {
        err.should.be.null;
        res.should.have.status(200);
        res.body.shoud.be.a('array');
        res.body.length.should.be.eql(10);
        done();
      })
  })

  it('should get users comments on a review', () => {
    chai.request(server)
      .get('/reviewsByParentId')
      .query({parentId: 8})
      .end((err, res) => {
        err.should.be.null;
        res.should.have.status(200);
        res.body.should.be.a('array');
      })
  })

})