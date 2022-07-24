# PE Staff
Micro-service for simplified staff summary statistics

Prerequisites
===
- Before you can start please follow the instructions [here](https://docs.docker.com/compose/install/) in order to install docker-compose

How to use
===
- To run the application please run `docker-compose up`
- To stop the application please click `Ctrl+C`
- You can access the service endpoints via http://localhost:3000
- Use .env.example to create .env file and set the values there to your needs
- An auto-created SQLite database should be created automatically in the `./.db/database.db`
- The database contains empty table of staff members
- The database contains ready table of departments and sub-departments:

|id|name|parent_id|
| ------------- |:-------------:| -----:|
|1|Engineering|0|
|2|Platform|1|
|3|Banking|0|
|4|Loan|3|
|5|Operations|0|
|6|CustomerOnboarding|5|
|7|Administration|0|
|8|Agriculture|7|
|9|Data|1|
|10|Development|1|
|11|Marketing|5|
|12|HR|7|



NPM Commands
===
- To run unit tests please run `npm test`
- To run eslint please run `npm run lint`
- To run eslint please run `npm run lint-fix`

API Endpoints
===

- Authentication
    - [POST /auth/login](#post-authlogin)
- Staff
    - [GET /staff](#get-staff)
    - [GET /staff/:id](#get-staffid)
    - [POST /staff](#post-staff)
    - [DELETE /staff/:id](#delete-staffid)
- Summary Statistics
    - [GET /statistics/staff](#get-statisticsstaff)
    - [GET /statistics/staff?contract=1](#get-statisticsstaffcontract1)
    - [GET /statistics/departments](#get-statisticsdepartments)
    - [GET /statistics/sub-departments](#get-statisticssub-departments)

# API Endpoints Description
## Authentication
### POST /auth/login
User login, please send the following data (as per the values of (EMAIL and PASSWORD) you set in the .env file):
```
{
    "email": ""
    "password": ""
}
```
Returns a message, JWT token and name of the user as per (User) value set in .env file.
```
{
    "message": "Login Successfully",
    "name": "...",
    "token": "...",
}
```
## Staff
### GET /staff
Returns a list of all staff members in the database
```
{
    "message": "Staff members has been fetched successfully!",
    "staff": [
        {
            "id": 1,
            "name": "Anupam",
            "salary": 200000000,
            "currency": "INR",
            "on_contract": "false",
            "department_name": "Engineering",
            "sub_department_name": "Platform"
        },
        {
            "id": 2,
            "name": "Himanshu",
            "salary": 70000,
            "currency": "EUR",
            "on_contract": "false",
            "department_name": "Operations",
            "sub_department_name": "CustomerOnboarding"
        }
    ]
}
```
### GET /staff/:id
Returns a specific staff member by id
```
{
    "message": "Staff members has been fetched successfully!",
    "staff": [
        {
            "id": 1,
            "name": "Anupam",
            "salary": 200000000,
            "currency": "INR",
            "on_contract": "false",
            "department_name": "Engineering",
            "sub_department_name": "Platform"
        },
        {
            "id": 2,
            "name": "Himanshu",
            "salary": 70000,
            "currency": "EUR",
            "on_contract": "false",
            "department_name": "Operations",
            "sub_department_name": "CustomerOnboarding"
        }
    ]
}
```
### POST /staff
Creates a new staff member, please send the data as following example:
```
{
"name": "Ahmed Test",
"salary": 100111.555,
"currency": "USD",
"on_contract": 1, // optional, default is 0
"department_id": 1,
"sub_department_id": 2
}
```
Returns a the created user data if valid and error message if not.
Successful creation:
```
{
    "message": "Staff member has been created successfully!",
    "staff": [
        {
            "id": 29,
            "name": "Ahmed Test",
            "salary": 100111.555,
            "currency": "USD",
            "on_contract": "true",
            "department_name": "Engineering",
            "sub_department_name": "Platform"
        }
    ]
}
```
Example errors:
```
{
    "message": "Validation Failed, entered data is incorrect!",
    "data": [
        {
            "value": "",
            "msg": "invalid name parameter",
            "param": "name",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Invalid value",
            "param": "salary",
            "location": "body"
        },
        {
            "value": "",
            "msg": "invalid salary parameter",
            "param": "salary",
            "location": "body"
        }
    ]
}
```
### DELETE /staff/:id
Deletes a staff member by id:
Returns success message if successful and error message if not.
Successful deletion:
```
{
    "message": "Staff member has been deleted successfully!"
}
```
Note: This endpoint is not validating if the member exists or not.

Example errors:
```
{
    "message": "Invalid staff member id"
}
```
##  Summary Statistics
### GET /statistics/staff
Returns statistics for salary over entire dataset:
```
{
    "message": "Staff members statistics has been fetched successfully!",
    "staff": [
        {
            "mean_salary": 1000,
            "min_salary": 300,
            "max_salary": 1100
        }
    ]
}
```
### GET /statistics/staff?contract=1
Returns statistics for salary over entire dataset for staff with contract=1:
```
{
    "message": "Staff members statistics has been fetched successfully!",
    "staff": [
        {
            "mean_salary": 1000,
            "min_salary": 300,
            "max_salary": 1100
        }
    ]
}
```
### GET /statistics/departments
Returns statistics for salary over entire dataset aggregated by department:
```
{
    "message": "Departments statistics has been fetched successfully!",
    "departments": [
        {
            "department": "Engineering",
            "mean_salary": 16737446.8,
            "min_salary": 30,
            "max_salary": 200000000
        },
        {
            "department": "Banking",
            "mean_salary": 90000,
            "min_salary": 90000,
            "max_salary": 90000
        },
        {
            "department": "Operations",
            "mean_salary": 19507.5,
            "min_salary": 30,
            "max_salary": 70000
        },
        {
            "department": "Administration",
            "mean_salary": 166851868537040220,
            "min_salary": 1000,
            "max_salary": 1001111111111111200
        }
    ]
}
```
### GET /statistics/sub-departments
Returns statistics for salary over entire dataset aggregated by sub-department nested inside departments:

```
{
    "message": "Sub-departments statistics has been fetched successfully!",
    "departments": [
        {
            "department": "Engineering",
            "sub_departments": [
                {
                    "name": "Development",
                    "mean_salary": 125000,
                    "min_salary": 100000,
                    "max_salary": 150000
                },
                {
                    "name": "Platform",
                    "mean_salary": 20059936.16,
                    "min_salary": 30,
                    "max_salary": 200000000
                }
            ]
        },
        {
            "department": "Administration",
            "sub_departments": [
                {
                    "name": "HR",
                    "mean_salary": 166851868537040220,
                    "min_salary": 1000,
                    "max_salary": 1001111111111111200
                }
            ]
        }
    ]
}
```