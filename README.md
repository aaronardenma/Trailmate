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

---

## Docker Setup

### Build the Docker Image
```bash
docker build -t trailmate .

docker run -d --name trailmate -p 3000:3000 trailmate

Open http://localhost:3000 to run the app.
