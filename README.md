# TrailMate — Hikers and Compilers

## Team Members
- Aaron Ma  
- Laura Qiu  
- Pranjali Das  
- Charvi Gulati  

---

## Description
**TrailMate** is a web app designed to support both novice hikers and experienced backpackers in planning safe, well-prepared outdoor adventures, particularly on trails in regions such as British Columbia.

The app emphasizes safety and preparation by helping users:
- Discover trails  
- Assess difficulty and current trail conditions  
- Receive personalized gear recommendations based on trail, season, and weather  

---

## Milestone 3 — Progress Summary
- Implemented user management system with JWTs, cookies, Redux, and MongoDB
- Integrated backend APIs routing for Trips, Posts, Comments, Tags with frontend pages for Past Trips, Community, and Search Filters
- Updated Trail page UI to toggled dialogs with planning features and results
- Integrated user-specific gear recommendations and weather API for trail plan results

## Test Suite

This project includes a comprehensive test suite for all backend routes, utilizing **Mocha**, **Chai**, **Chai HTTP**, and **Mochawesome** for reporting.

### Testing Overview

- **All backend API endpoints are covered.**
- **Testing Framework**: [Mocha](https://mochajs.org/)
- **Assertion Library**: [Chai](https://www.chaijs.com/)
- **HTTP Integration Testing**: [Chai HTTP](https://www.chaijs.com/plugins/chai-http/)
- **HTML Report Generator**: [Mochawesome](https://github.com/adamgruber/mochawesome)
---

### Running the Tests
All the tests are in the test folder in the backend folder

#### Run All Tests via Terminal

To execute all backend tests:

```bash
cd backend
npm test
```

#### To create a detailed visual HTML report of your tests, run the following command:

```bash
npm run test-html
```

#### After running the above command, the report will be generated at:
```bash
backend/mochawesome-report/mochawesome.html
```
