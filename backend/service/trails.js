const Trail = require('../../api/model/Trails.js');
export async function getAllTrails() {
    try {
        const trails = await Trail.find();
        return trails;
    } catch (err) {
        throw new Error('Failed to fetch trails: ' + err.message);
    }
}

