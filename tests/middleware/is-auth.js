const expect = require('chai').expect;

const authMiddleware = require('../../src/middleware/is-auth');

describe('Auth Middleware Test Scenarios', () => {
	it('should test the middleware passing unauthorized in case of Authorization header not present', () => {
		//mock a request object
		const req = {
			get: () => {
				return null;
			},
		};
		//check the case if JWT is not present (empty)
		expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(
			'Not authenticated!'
		);
	});

	it('should test the middleware throws error if Authorization header is one piece string', () => {
		const req = {
			get: () => {
				return 'thisisonepiecestring';
			},
		};
		//check the case if JWT is not valid
		expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(
			'jwt must be provided'
		);
	});


	it('should throw an error if the token is malformed', () => {
		const req = {
			get: (header) => {
				if (header == 'Authorization') {
					return 'Bearer 0000000000000000000000000000000';
				}
			},
		};
		//check the case if JWT is malformed
		expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
	});
});
