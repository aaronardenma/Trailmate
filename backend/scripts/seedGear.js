require('dotenv').config();
const mongoose = require('mongoose');
const Gear = require('../models/gear'); 

const gearCategories = {
  Clothing: [
    'Moisture-wicking T-shirts (short sleeve)',
    'Moisture-wicking T-shirts (long sleeve)',
    'Thermal underwear (top)',
    'Thermal underwear (bottom)',
    'Fleece jacket or pullover',
    'Down or synthetic insulated jacket',
    'Waterproof breathable rain jacket',
    'Waterproof rain pants',
    'Windbreaker',
    'Lightweight hiking pants',
    'Convertible pants',
    'Hiking shorts',
    'Wool or synthetic hiking socks',
    'Gloves (light)',
    'Gloves (insulated)',
    'Warm hat (wool or fleece)',
    'Sun hat or cap',
    'Buff or neck gaiter',
  ],
  Footwear: [
    'Hiking boots (waterproof)',
    'Trail runners',
    'Camp shoes / sandals',
  ],
  Backpack_Storage: [
    'Daypack (15-30L)',
    'Multi-day backpack (40L+)',
    'Rain cover for backpack',
    'Dry bags or stuff sacks',
  ],
  Navigation_Safety: [
    'Map (paper or offline app)',
    'Compass or GPS device',
    'Headlamp or flashlight',
    'Whistle',
    'First aid kit',
    'Multi-tool or knife',
    'Emergency bivy or space blanket',
    'Sunscreen and lip balm',
    'Insect repellent',
  ],
  Hydration_Nutrition: [
    'Water bottles or hydration reservoir',
    'Water filter or purification tablets',
    'Lightweight stove or burner',
    'Cookware (pot, utensils)',
    'Food/snacks',
  ],
  Sleeping_Gear: [
    'Tent or shelter',
    'Sleeping bag',
    'Sleeping pad',
    'Pillow (optional)',
  ],
  Miscellaneous: [
    'Trekking poles',
    'Sunglasses',
    'Camera or smartphone',
    'Notebook and pen',
    'Trash bag',
  ],
};

async function seedGear() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Gear.deleteMany({});

    const gearDocs = Object.entries(gearCategories).map(([category, items]) => ({
      category,
      items,
    }));

    await Gear.insertMany(gearDocs);

    console.log('Gear categories seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding gear data:', error);
    mongoose.connection.close();
  }
}

seedGear();