export function recommendGear(conditions) {
    const recommendations = new Set();
  
    // always recommend
    const basics = [
      'Water bottles or hydration reservoir',
      'First aid kit',
      'Map (paper or offline app)',
      'Headlamp or flashlight',
      'Food/snacks',
    ];
    basics.forEach(item => recommendations.add(item));
  
    if (conditions.temperatureC > 20) {
      recommendations.add('Moisture-wicking T-shirts (short sleeve)');
      recommendations.add('Hiking shorts');
    } else if (conditions.temperatureC > 10) {
      recommendations.add('Moisture-wicking T-shirts (long sleeve)');
      recommendations.add('Lightweight hiking pants');
    } else if (conditions.temperatureC > 0) {
      recommendations.add('Fleece jacket or pullover');
      recommendations.add('Gloves (light)');
    } else {
      recommendations.add('Down or synthetic insulated jacket');
      recommendations.add('Gloves (insulated)');
      recommendations.add('Warm hat (wool or fleece)');
    }
  
    if (conditions.raining) {
      recommendations.add('Waterproof breathable rain jacket');
      recommendations.add('Waterproof rain pants');
    }
  
    if (conditions.tripLengthDays > 1) {
      recommendations.add('Tent or shelter');
      recommendations.add('Sleeping bag');
      recommendations.add('Sleeping pad');
      recommendations.add('Multi-day backpack (40L+)');
      recommendations.add('Cookware (pot, utensils)');
      recommendations.add('Lightweight stove or burner');
    } else {
      recommendations.add('Daypack (15-30L)');
    }
  
    if (conditions.difficulty === 'hard') {
      recommendations.add('Trekking poles');
    }
  
    return Array.from(recommendations);
  }
  