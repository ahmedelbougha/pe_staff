// just to get email and password from environment file
require('dotenv').config();
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
expect = chai.expect
chai.use(sinonChai);

const StaffController = require("../../src/controllers/staff");
const StaffModel = require("../../src/models/staff");



const fakeFetchedObject = [
    {
        "id": 1,
        "name": "Ahmed",
        "salary": 300,
        "currency": "USD",
        "department_name": "Engineering",
        "sub_department_name": "Platform"
    },
];
let jsonSpy,
    statusStub,
    responseStub;

describe("Staff Controller", function () {
    beforeEach(() => {
        jsonSpy = sinon.spy();
        statusStub = sinon.stub();
        responseStub = {
            json: jsonSpy,
            status: statusStub,
        };
        statusStub.returns(responseStub)
    });

    it("should return staff members", async () => {
        sinon.stub(StaffModel, 'getStaffMembers');
        StaffModel.getStaffMembers.returns(fakeFetchedObject);

        await StaffController.getStaffMembers({}, responseStub, () => { });
        expect(responseStub.status).to.be.calledWith(200);
        expect(responseStub.json).to.be.calledWith({
            message: "Staff members has been fetched successfully!", staff: fakeFetchedObject
        });

        StaffModel.getStaffMembers.restore();
    });
});
