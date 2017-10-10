

const path		= require('path'),
	server 		= require(path.resolve('./server')),
	chai 		= require('chai'),
	chaiHttp 	= require('chai-http'),
	helperLib   = require(path.resolve('./config/lib/helper_lib')),
	expect 		= chai.expect,
	should 		= chai.should();

chai.use(chaiHttp);

describe('POST /login', function(){

	it('it should failed without email or password', function(done){

		chai.request(server)
			.post('/api/user-profile/login')
			.send({})
			.end(function(err, res){
				res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').to.match(new RegExp(helperLib.messages.absent));
                res.body.should.have.property('status').equal('failed');
				done();
			});
			
	});

});