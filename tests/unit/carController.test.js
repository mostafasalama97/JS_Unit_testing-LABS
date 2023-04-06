// const logger = require('../../src/helpers/logger');
// const Car = require('../../src/models/Car'); //import
// const utils = require('../../src/helpers/utils');  //import
// const { addCar } = require('../../src/controllers/carController'); //import function
// const startDB = require('../../src/helpers/startDB'); //import function to start connection with mongo database
// const sinon = require('sinon');  //framework for fake function "provides standalone test spies, stubs, and mocks."
// /*
// Sure! Sinon is a JavaScript testing library that helps you write tests for your code.
// It provides tools for creating "spies" that track function calls, 
// "stubs" that replace functions during tests, 
// and "mocks" that replace objects during tests. 
// Sinon also provides features for controlling time and faking network requests. 
// Overall, Sinon makes it easier to write high-quality, 
// reliable tests for your JavaScript code.
// */
// const { MongoMemoryServer } = require('mongodb-memory-server');  //to run mongo from memory to make it more fast for retrive and insert data
// const { expect } = require('chai'); //assertion function
// const crypto = require('crypto'); //to generate random uuid

// const it = require('ava').default; //test runner function


// /* 
// now i want to make connection with mongpDB before start testing and 
// i used mongo-in-memory framework to make connection more faster
// */
// it.before(async (t) => {
//     t.context.mongod = await MongoMemoryServer.create();
//     process.env.MONGO_URI = t.context.mongod.getUri("iti43-test"); //This allows the application code to connect to the in-memory database for testing.
//     await startDB(); //await startDB();: This line calls a function startDB() that starts the MongoDB connection. This ensures that the database connection is ready before any tests start executing.
// });


// // when i finsh testing i want to close connection with MongoDBnpm 
// /*
// In software testing, "teardown" refers to the process of cleaning up 
// after a test has finished executing. 
// The goal of teardown is to ensure that each test is run in a clean environment, 
// and is not affected by any state left over from previous tests. 
// This helps to ensure that the test results are reliable and repeatable, 
// and makes it easier to diagnose and fix issues that arise during testing.
// */
// test.after(async (t) => {
//     await t.context.mongod.stop({ doCleanup: true }); //close connection with database
//     // doCleanup option is set to true, which ensures that the data in the database is deleted after the database is stopped. 
// })


// // now i want start tests function
// // first i will check the main function "addCar"

// it('should add new car and only one car', async (t) => {
//     // it('should add new car and only one car', async (t) => { ... }): This is the actual test case, which is defined using the AVA it() function. The test case is asynchronous and takes a t parameter, which provides access to various test-related functions and helpers.
//     const transformedTags = "1500cc,high line,new";  
//     // const transformedTags = "1500cc,high line,new";: This line defines a string variable that represents the expected result of the transformArryToString() function.
//     const request = { // actual value
//         body: {
//             title: `BMW-${crypto.randomUUID()}`,
//             tags: ["1500cc", "high line", "new"],
//             price: 2500000,
//         }
//     }
//     const expectedResult = {
//         title: request.body.title,
//         tags: transformedTags,
//         price: String(request.body.price),
//     };
//     const stub = sinon.stub(utils, 'transformArryToString').callsFake((delimiter, array) => {
//         // const stub = sinon.stub(utils, 'transformArryToString').callsFake((delimiter, array) => { ... });: This line creates a stub of the transformArryToString() function from the utils module using the Sinon library. The callsFake() method is used to replace the original function with a fake function that allows the expected input and output to be tested.
//         expect(delimiter).to.be.equal(',');
//         // expect(delimiter).to.be.equal(',');: This line uses the Chai library to define an assertion that checks that the first parameter passed to the fake function is equal to the expected delimiter.
//         expect(array).to.be.equal(request.body.tags);
//         // expect(array).to.be.equal(request.body.tags);: This line uses the Chai library to define an assertion that checks that the second parameter passed to the fake function is equal to the expected array.
//         return transformedTags;
//     });


//     const stubbedLogger = sinon.stub(logger, "info").callsFake(() => { });
//     /*
    
//     The purpose of the teardown function is to clean up any resources that were created during the test, 
//     such as database records or temporary files. 
//     In this case, the teardown function deletes any documents created during the test and restores the original logger method to its original state.

//     */
//     t.teardown(async (t) => {
//         await Car.deleteMany({
//             title: request.body.title,
//         })
//         stub.restore(); //This line restores the original info method of the logger module. This is done to ensure that subsequent tests are not affected by the stubbed logger used in this test.
//     });

//     const actualResult = await addCar(request);

//     const expectedValue = {
//         _id: actualResult._id,
//         __v: actualResult.__v,
//         ...expectedResult,
//     }

//     t.assert(stubbedLogger.calledWithExactly({
//         operation: "addNewCar",
//         message: `added new car addedCar.title`,
//     }), "Logger is not called with expected parameters");

//     expect(actualResult._doc).to.deep.equal(expectedValue);

//     // assert that document exists in database
//     const carDocuments = await Car.find({
//         title: request.body.title
//     }).lean()

//     expect(carDocuments).to.have.length(1);
//     expect(carDocuments[0]).to.deep.equal(expectedValue);

//     t.pass();

// });

// const { updateCar } = require('../../src/controllers/carController');

// const it = require('ava').default;

// it('should update an added car', (t) => {
//     // car request body should look like
//     // {
//     //     title: String
//     //     tags: String
//     //     price: Number
//     //     age: Number

//     // }
//     // implement your test in order to pass
//     updateCar({}); // test this controller
// });

//=========================================================================
const logger = require('../../src/helpers/logger');
const Car = require('../../src/models/Car');
const utils = require('../../src/helpers/utils');
const { updateCar } = require('../../src/controllers/carController');
const startDB = require('../../src/helpers/startDB');
const sinon = require('sinon');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require('chai');
const crypto = require('crypto');
const it = require('ava');
const sinonit = require('sinon-it')(sinon);

it.before(async (t) => {
  t.context.mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = t.context.mongod.getUri("iti43-it");
  await startDB();
});



it.after.always(async (t) => {
  await t.context.mongod.stop({ doCleanup: true });
});

const itTitle = 'should update existing car and return updated data';
const wrappedit = sinonit(async (t) => {
  const request = {
    params: {
      id: crypto.randomUUID()
    },
    body: {
      title: 'BMW',
      tags: ['new', '1500cc', 'high line'],
      price: 2500000,
    },
  };
  const stub = sinon.stub(Car, 'findByIdAndUpdate').resolves(request.body);
  const actualResult = await updateCar(request);
  const expectedId = request.params.id;
  const expectedUpdateData = { ...request.body };
  const expectedOptions = { new: true };
  t.assert(stub.calledOnceWithExactly(expectedId, expectedUpdateData, expectedOptions), 'Car.findByIdAndUpdate() was not called with the expected arguments');
  expect(actualResult).to.deep.equal(request.body);
});