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

## Milestone 2 — Progress Summary
- Created a proper landing page and user authentication routes with preliminary user management system with Redux
  - Created preliminary methods with MongoDB user schemas for updated user management system
- Created Navigation bar conditionality based on Redux login states
- Created a community page where you can make a post looking for hiking buddies
  - You can view all the posts made by other community members as well as yourself
- Created a "Favourites" page where users can have easy access to their favourite trails
- User page
  - Now you can update and modify user details
  - A new feature is the "Your Past Trips" section where users can rate their trips
  - Can add new users
- Created a feature called "Gear list" linked to each trail
- Added tag filtering for search
- Reconfigured trail data fetching to be from MongoDB
- Adjusted filter page to be a pop-up dialog
- Added trip planning features on trail description pages that are sent to MongoDB

-
---

## Milestone 1 — Progress Summary
- **Frontend Pages**:
  - **Home Page**: Displays an introduction to the app and featured trails.
  - **Trail Cards**: Showcases individual trail previews with essential details such as difficulty, distance, and rating.
  - **Nav Bar**: A responsive navigation bar for easy access to various parts of the app.
  - **Route Maps**: A placeholder page for visualizing trail routes (non-functional for now).
  - **Trail Description**: Each trail has a detailed description page, including trail features, tips, and an interactive map (still in progress).
  - **Search Bar**: Allows users to search for trails based on criteria like name, location, or difficulty.
  - **Filters**: Implemented filters for narrowing down trail search results based on specific parameters.
  - **User Profile**: Non-functional profile page where users can view their saved trails and activity.
- **Page Routing**:  
  Set up routing throughout the app using React Router, enabling smooth navigation between pages.

- **Reusable Web Components**:  
  Developed reusable components such as buttons, input fields, and card layouts for easy reuse across different pages.

- **Redux for State Management**:  
  Integrated Redux to manage the state of the app, specifically for managing filters and search parameters.

- **Responsive Styling**:  
  Applied consistent and responsive design across all components using CSS and Flexbox to ensure compatibility with mobile and desktop devices.
---

## Docker Setup

### Build the Docker Image
```bash
docker compose up -d
