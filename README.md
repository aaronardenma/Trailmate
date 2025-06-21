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

### User Authentication & Profiles
- Implemented login/signup using Redux and MongoDB
- Profile page now supports updating user details
- “Your Past Trips” section shows previously completed or planned trips
- Users can rate their trips post-hike

### Trip Planning
- Users can plan a trip from any trail’s description page
- Planned trips are saved to the database
- Planned trips automatically show up in the “Your Past Trips” section on the user profile

### Community Features
- Users can create posts (e.g., "Looking for a hiking buddy")
- Posts can be edited, deleted, and liked
- All community posts are viewable on the Community page

### Favourite Trails
- Users can save and view their favourite trails for quick access

### Gear List
- Gear recommendations dynamically generated per trail, based on difficulty and seasonal factors
- Users can save the gear they own and modify it the user profile page to personalize the generated recommended gear list

### Trail Search & Filtering
- Search bar for trail discovery by name or keyword
- Tag-based filtering implemented
- Filter options now appear in a pop-up dialog for better user experience

### Backend Improvements
- Trail data now served from MongoDB
- Improved data flow between frontend and backend via Redux and API routes


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
