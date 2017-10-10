

const path				= require('path'),
	server 				= require(path.resolve('./server')),
	UserProfileModel    = require(path.resolve('./modules/user_profile/models/user.profile.model')),
	chai 				= require('chai'),
	chaiHttp 			= require('chai-http'),
	helperLib   		= require(path.resolve('./config/lib/helper_lib')),
	expect 				= chai.expect,
	should 				= chai.should();

chai.use(chaiHttp);

let user = {first_name: 'jimmy', last_name: 'rajput', gender: 'male', email: 'jimmy@gmail.com', password: 'JiMmy!1#'},
	baseUrl = '/api/user-profile';

describe('POST /register', () => {

	let url = `${baseUrl}/register`;

	before(function(){			
		UserProfileModel.find({email: user.email}).remove((err, removed) => {});
	});

	it('it should register successfully', (done) => {

		chai.request(server)
			.post(url)
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').equal(helperLib.messages.accoundCreated);
				res.body.should.have.property('status').equal('success');
				done();
			});
	});

	it('it should not register with already used email', (done) => {

		chai.request(server)
			.post(url)
			.send(user)
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.be.a('object');
				res.body.should.have.property('message').to.match(new RegExp(helperLib.messages.alreadyTaken));
				res.body.should.have.property('status').equal('failed');
				done();
			});		
	});


});

describe('POST /login', () => {

	let url =  `${baseUrl}/login`;
	it('it should loggedin successfully', (done) => {

		chai.request(server)
			.post(url)
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').equal(helperLib.messages.loggedInSuccess);
				res.body.should.have.property('status').equal('success');
				done();
			});
			
	});

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

