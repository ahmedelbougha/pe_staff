const jwt = require("jsonwebtoken");
const expect = require("chai").expect;
const sinon = require("sinon");

const authMiddleware = require("../../src/middleware/is-auth");

describe("Auth Middleware", () => {
    it("should test the middleware passing unauthorized in case of Authorization header not present", () => {
        const req = {
            get: (headerName) => {
                return null;
            },
        };

        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(
            "Not authenticated!"
        );
    });

    it("should test the middleware throws error if Authorization header is one peiece string", () => {
        const req = {
            get: (headerName) => {
                return "thisisonepiecestring";
            },
        };

        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(
            "jwt must be provided"
        );
    });

    it("should return userId in req object", () => {
        const req = {
            get: (header) => {
                return "Bearer 0000000000000000000000000000000";
            },
        };
        sinon.stub(jwt, "verify");
        jwt.verify.returns({ id: "123456789" });

        authMiddleware(req, {}, () => { });
        expect(req).to.have.property("userId");
        expect(req).to.have.property("userId", "123456789");
        expect(jwt.verify.called).to.be.true;

        jwt.verify.restore();
    });

    it("should throw an error if the token is marlformed", () => {
        const req = {
            get: (header) => {
                if (header == "Authorization") {
                    return "Bearer 0000000000000000000000000000000";
                }
            },
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(); //   "jwt malformed"
    });
});
