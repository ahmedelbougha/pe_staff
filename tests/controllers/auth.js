// just to get email and password from environment file
require('dotenv').config();
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
expect = chai.expect
chai.use(sinonChai);


const statusJsonSpy = sinon.spy();
const res = {
    json: sinon.spy(),
    status: sinon.stub().returns({ json: statusJsonSpy }),
};

const AuthController = require("../../src/controllers/auth");

describe("Auth Controller Test Scenarios", function () {
    it("should throw an error if wrong email or password", async () => {
        const req = {
            body: {
                email: "wrong@test.com",
                password: "wrong-password",
            },
        };
        const result = await AuthController.login(req, {}, () => { });
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 401);
        expect(result).to.have.property("message", "Invalid email or password!");

    });
    it("should pass and return token if email and password are correct", async () => {
        //check if correct/user or email pass
        const req = {
            body: {
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
            },
        };
        await AuthController.login(req, res, () => { });
        expect(res.status).to.be.calledWith(200);
    });
});
