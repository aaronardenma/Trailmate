require('dotenv').config();
const mongoose = require('mongoose');
const Tag = require('../models/tags');
const Trail = require('../models/trails');
const rawTagData = require("./tags.json");
const rawTrails = require('./data.json');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Promise.all([
      Tag.deleteMany({}),
      Trail.deleteMany({})
    ]);

    const insertedTags = await Tag.insertMany(rawTagData.map(name => ({ name })));
    console.log('Tags seeded');

    const tagMap = {};
    insertedTags.forEach(tag => {
      tagMap[tag.name] = tag._id;
    });

    const trailsToInsert = rawTrails.map(trail => ({
      name: trail.name,
      latitude: trail.latitude,
      longitude: trail.longitude,
      photoUrl: trail.photoUrl,
      location: trail.location,
      description: trail.description,
      avgElevationM: trail.avgElevationM,
      distanceKm: trail.distanceKm,
      difficulty: trail.difficulty,
      tags: trail.tags
        .map(tagName => tagMap[tagName])
        .filter(Boolean)
    }));

    await Trail.insertMany(trailsToInsert);

    await mongoose.connection.close();

  } catch (err) {
    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();