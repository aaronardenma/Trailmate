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

## Demo: 

### Add a section titled Demo and in there document the key features of your demo with screenshots (target 3-5, more if necessary; do not include trivial things like logging in or registering as a user).

## Minimal Goals
1. Display mapped trail routes with elevation, difficulty, and relevant metadata
2. Integrate Google Maps API to show a map of the local area (Vancouver)
4. Create selectable trail components with basic information highlighted: elevation, difficulty, etc
5. Trails have filterable tags and can be filtered based on tags.
6. Auto-generate gear checklist based on trail + season + weather
7. Fill up trail database and API

## Standard Goals
1. Create user accounts and profiles (Completed)
2. Save, edit, and delete favorite routes (Completed)
3. Custom gear list management (add/remove/edit) (Completed)
4. Create community aspects with forums and comments (Completed)
5. Submit hike feedback or trail conditions (Completed)

## Stretch Goals
1. Alerts if user veers off trail or remains stationary too long (Dropped)
2. Share real-time location with emergency contact (Dropped)
3. Hazard reporting with map pins and photos (Completed)


## Non-trivial Elements
Features that we have implemented to make our app non-trivial are:
- Trail Hazard reporting
- Community
- Gear checks with real-time trail recommendations based on user experience level and user gear
### M5 highlights: List any M5 highlights, i.e., what has been added, changed, or removed for this milestone; especially anything that has been dropped.
- We fixed the trips page, particularly how a trip is saved and started so it makes more logical sense for this application
- Fixed how only one trip can be in progress
- Fixed XSS susceptible user profile update fields
- Adjusted Google maps to not show directions and have better centering
- Some other minor bug fixes were made
# Trailmate
