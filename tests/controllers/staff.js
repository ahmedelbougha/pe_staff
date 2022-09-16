const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const expect = chai.expect;
chai.use(sinonChai);

const StaffController = require('../../src/controllers/staff');
const StaffModel = require('../../src/models/staff');



const fakeFetchedObject = [
	{
		'id': 1,
		'name': 'Ahmed',
		'salary': 300,
		'currency': 'USD',
		'department_name': 'Engineering',
		'sub_department_name': 'Platform'
	},
];
let jsonSpy,
	statusStub,
	responseStub;

describe('Staff Controller Test Scenarios', function () {
	beforeEach(() => {
		jsonSpy = sinon.spy();
		statusStub = sinon.stub();
		responseStub = {
			json: jsonSpy,
			status: statusStub,
		};
		statusStub.returns(responseStub);
	});

	it('should return staff members', async () => {
		//stub the getStaffMembers function to return a fake result
		sinon.stub(StaffModel, 'getStaffMembers');
		StaffModel.getStaffMembers.returns(fakeFetchedObject);
		//call the getStaffMembers function
		await StaffController.getStaffMembers({ params: {} }, responseStub, () => { });
		//check the response object status and json
		expect(responseStub.status).to.be.calledWith(200);
		expect(responseStub.json).to.be.calledWith({
			message: 'Staff members has been fetched successfully!', staff: fakeFetchedObject
		});

		StaffModel.getStaffMembers.restore();
	});
});
