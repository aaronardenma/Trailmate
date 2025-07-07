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
## Test Suite

This project includes a comprehensive test suite for all backend API routes, utilizing **Mocha**, **Chai**, **Chai HTTP**, and **Mochawesome** for reporting.

### Testing Overview

- **All backend API endpoints are covered.**
- **Testing Framework**: [Mocha](https://mochajs.org/)
- **Assertion Library**: [Chai](https://www.chaijs.com/)
- **HTTP Integration Testing**: [Chai HTTP](https://www.chaijs.com/plugins/chai-http/)
- **HTML Report Generator**: [Mochawesome](https://github.com/adamgruber/mochawesome)
---

### Running the Tests

#### Run All API Tests via Terminal

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







