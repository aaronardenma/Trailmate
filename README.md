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
- Created a detailed wireframe in Figma covering most app screens  
- Built non-functional frontend for multiple pages: Home, Trail Cards, Nav Bar, RouteMaps, Trail Description, Search bar, Filters, and User Profile  
- Set up page routing throughout the app  
- Developed several reusable web components 
- Utilized Redux to manage app states for filters
- Implemented consistent and responsive styling to all components
---

## Docker Setup

### Build the Docker Image
```bash
docker build -t trailmate .

docker run -d --name trailmate -p 3000:3000 trailmate

Open http://localhost:3000 to run the app.
