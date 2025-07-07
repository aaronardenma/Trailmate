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
## 🧪 Test Suite 

This project includes a full test suite for all backend API routes using **Mocha**, **Chai**, **Chai HTTP**, and **Mochawesome** for reporting.

### Testing Overview

- All backend API endpoints have been tested.
- **Testing Framework**: Mocha
- **Assertion Library**: Chai
- **HTTP Integration Testing**: Chai HTTP
- **Test Report Generator**: Mochawesome (for HTML reports)

---

###  Project Structure for Testing

Your test files should be located in the `backend/test/` folder and include test cases for various models and routes such as `User`, `Trail`, `Trip`, `Tags`, etc.
### Running the Tests

#### Run All API Tests in Terminal

To run all backend tests via command line:

```bash
cd backend
npm test

2. Generate HTML Test Report with Mochawesome
To create a detailed visual HTML report of your tests:

bash
Copy
Edit
npm run test-html
After running the above command, it will generate an HTML file at:

bash
Copy
Edit
backend/mochawesome-report/mochawesome.html




