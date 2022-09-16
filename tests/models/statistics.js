const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const expect = chai.expect;
chai.use(sinonChai);

const database = require('../../database/file-database');
const statisticsModel = require('../../src/models/statistics');

describe('Statistics Controller Test Scenarios', function () {

	beforeEach(() => {
		// stub the query function to return a fake result
		sinon.stub(database, 'query');
	});

	afterEach(() => {
		// restore the query function
		database.query.restore();
	});

	it('should return staff members statistics', async () => {
		// mocking database results
		database.query.returns(Promise.resolve([
			{
				'mean_salary': 1500,
				'min_salary': 300,
				'max_salary': 5000
			}
		]));

		const staffMemberStatistics = await statisticsModel.getStaffStatistics();
		//check staff members statistics to be an array that contains an object of 3 keys
		// mean_salary, min_salary, max_salary
		expect(staffMemberStatistics).to.be.an('array');
		expect(staffMemberStatistics[0]).to.be.an('object');
		expect(Object.keys(staffMemberStatistics[0])).to.have.lengthOf(3);
		expect(staffMemberStatistics[0]).to.contain.keys('mean_salary', 'min_salary', 'max_salary');
	});

	it('should return contracted staff members statistics', async () => {
		// no big difference between this and first test case, since this is about
		// contracted staff members only
		// mocking database results
		database.query.returns(Promise.resolve([
			{
				'mean_salary': 1500,
				'min_salary': 300,
				'max_salary': 5000
			}
		]));

		const staffMemberStatistics = await statisticsModel.getStaffStatistics(true);
		//check staff members statistics to be an array that contains an object of 3 keys
		// mean_salary, min_salary, max_salary
		expect(staffMemberStatistics).to.be.an('array');
		expect(staffMemberStatistics[0]).to.be.an('object');
		expect(Object.keys(staffMemberStatistics[0])).to.have.lengthOf(3);
		expect(staffMemberStatistics[0]).to.contain.keys('mean_salary', 'min_salary', 'max_salary');
	});


	it('should return department statistics', async () => {
		// mocking database results
		database.query.returns(Promise.resolve([
			{
				'department': 'Engineering',
				'mean_salary': 1500,
				'min_salary': 300,
				'max_salary': 5000
			},
			{
				'department': 'Administration',
				'mean_salary': 1000,
				'min_salary': 300,
				'max_salary': 4000
			},
			{
				'department': 'Operation',
				'mean_salary': 1500,
				'min_salary': 400,
				'max_salary': 3000
			}
		]));

		const departmentStatistics = await statisticsModel.getDepartmentStatistics();
		//check department statistics to be an array that contains 3 departments
		//as per mock object above
		expect(departmentStatistics).to.be.an('array').that.have.lengthOf(3);
		for (let i = 0; i < departmentStatistics.length; i++) {
			//each department is an object with 4 keys
			// department, mean_salary, min_salary, max_salary
			expect(departmentStatistics[i]).to.be.an('object');
			expect(Object.keys(departmentStatistics[i])).to.have.lengthOf(4);
			expect(departmentStatistics[i]).to.contain.keys('department', 'mean_salary', 'min_salary', 'max_salary');
		}
	});

	it('should return sub-department statistics', async () => {
		// mocking database results
		database.query.returns(Promise.resolve([
			{
				'department_id': 1,
				'sub_department_id': 2,
				'department': 'Engineering',
				'sub_department': 'Development',
				'mean_salary': 1500,
				'min_salary': 300,
				'max_salary': 5000
			},
			{
				'department_id': 1,
				'sub_department_id': 3,
				'department': 'Engineering',
				'sub_department': 'Data',
				'mean_salary': 1500,
				'min_salary': 300,
				'max_salary': 5000
			},
			{
				'department_id': 3,
				'sub_department_id': 5,
				'department': 'Operation',
				'sub_department': 'Marketing',
				'mean_salary': 1500,
				'min_salary': 400,
				'max_salary': 3000
			},
			{
				'department_id': 6,
				'sub_department_id': 7,
				'department': 'Administration',
				'sub_department': 'HR',
				'mean_salary': 1500,
				'min_salary': 400,
				'max_salary': 3000
			}
		]));
		const subDepartmentStatistics = await statisticsModel.getSubDepartmentStatistics();
		//check sub-department statistics to be an array that contains of 3 main departments
		//as per mock object above (Engineering, Operation, Administration)
		expect(subDepartmentStatistics).to.be.an('array').that.have.lengthOf(3);

		for (let i = 0; i < subDepartmentStatistics.length; i++) {
			//check each department object to have 2 keys (department string and sub-departments array)
			expect(subDepartmentStatistics[i]).to.be.an('object');
			expect(Object.keys(subDepartmentStatistics[i])).to.have.lengthOf(2);
			expect(subDepartmentStatistics[i]).to.contain.keys('department', 'sub_departments');
			expect(subDepartmentStatistics[i]['department']).to.be.a('string');
			expect(subDepartmentStatistics[i]['sub_departments']).to.be.an('array');
			for (let j = 0; j < subDepartmentStatistics[i]['sub_departments'].length; j++) {
				//check each sub-department is an object that contains of 4 keys
				//name, mean_salary, min_salary, max_salary
				expect(subDepartmentStatistics[i]['sub_departments'][j]).to.be.an('object').that.contain.keys('name', 'mean_salary', 'min_salary', 'max_salary');
			}
		}
	});

});
