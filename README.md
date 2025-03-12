# JEST tutorial for test-driven development
Learn how to write unit tests and other kinds of tests

# Setup

Install dependencies

`$ npm install`

Run tests

`$ NODE_ENV=test npx jest /path/to/test/file`

Run coverage

`$ NODE_ENV=test npx jest --coverage /path/to/test/file`

View coverage report in `coverage/lcov-report/index.html`

The followung database scripts are not necessary. If you still need
them for manual testing here they are:

`$ npx ts-node insert_sample_data.ts "mongodb://127.0.0.1:27017/my_library_db"`

Clean the database

`npx ts-node remove_db.ts "mongodb://127.0.0.1:27017/my_library_db"`

# Description

This repository illustrates how to use jest to write unit tests 
for a server in typescript. The examples are as follows:

- `tests/authorSchema.test.ts`: Unit tests to verify the schema of the authors colletion. 
- `tests/bookDetailsService.test.ts`: Unit tests to verify the behavior of the service that is used to retrieve the details of a particular book.
- `tests/createBookService.test.ts`: Unit tests to verify if a book is created successfully.

# For you to do

## Part 1

Write a unit test for the GET /authors service. 
The service should respond with a list of author names and lifetimes sorted by family name of the authors. It should respond
with a "No authors found" message when there are no authors in the database. If an error occurs when retrieving the authors then the
service responds with an error code of 500. The unit test
should be placed in `tests/authorService.test.ts`.

## Part 2

Briefly explain a limitation of the tests in `tests/authorSchema.test.ts` in the space below.

One limitation of the tests in `tests/authorSchema.test.ts` is that they rely on mocking Mongoose methods (countDocuments, findOne, find) rather than interacting with a real database. While this makes the tests faster and isolated, it does not verify how the schema behaves in an actual MongoDB environment, potentially missing issues related to database constraints, indexing, or real-world data inconsistencies.

## Part 3

Generate the coverage report for the tests you wrote. How can you improve
your tests using the coverage report? Briefly explain your 
process in the space below.

Based on the coverage report, I can see key information about my code coverage. There are several files with low coverage that could be improved:

1. The server.ts file has 67.85% coverage with lines 25-37 uncovered, which are related to MongoDB connection in non-test environments.

2. Several model files have low coverage:
   - book.ts (40%)
   - bookinstance.ts (46.66%)
   - genre.ts (54.54%)

3. Some route handlers also need better coverage:
   - books.ts (41.17%)
   - books_status.ts (55.55%)
   - home.ts (42.1%)

To improve coverage, I would:
1. Write additional tests for the uncovered routes and models
2. Add tests for error handling scenarios
3. Test edge cases like empty databases or malformed requests
4. Create integration tests that verify the interaction between components

The coverage report helps me identify specific lines that aren't being tested, allowing me to target those areas with new test cases.
