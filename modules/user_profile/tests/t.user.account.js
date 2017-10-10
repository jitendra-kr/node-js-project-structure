

const path		= require('path'),
	server 		= require(path.resolve('./server')),
	chai 		= require('chai'),
	chaiHttp 	= require('chai-http'),
	helperLib   = require(path.resolve('./config/lib/helper_lib')),
	expect 		= chai.expect,
	should 		= chai.should();

chai.use(chaiHttp);

describe('POST /login', () => {

	let url = '/api/user-profile/login';

	it('it should failed without email or password', (done) => {

		chai.request(server)
			.post(url)
			.send({})
			.end((err, res) => {
				res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').to.match(new RegExp(helperLib.messages.absent));
                res.body.should.have.property('status').equal('failed');
				done();
			});

	});


	it('it should not loggedin with incorrect login credentials', (done) => {

		let incorrectLogin = {
			email: 'incorrectemail@incorrect.com',
			password: '<iNcOrReCt!PaSsWoRd>'
		}
		chai.request(server)
			.post(url)
			.send(incorrectLogin)
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.be.a('object');
				res.body.should.have.property('message').equal(helperLib.messages.incorrectLoginDetail);
				res.body.should.have.property('status').equal('failed');
				done()
			});
	});

});