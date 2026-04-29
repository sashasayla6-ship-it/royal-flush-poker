const fs = require('fs');
let html = fs.readFileSync('index.html','utf8');

// Royal Flush Poker нэр солих
html = html.replace(/MongoPoker/g, 'Royal Flush Poker');
html = html.replace(/Mongo<span>Poker<\/span>/g, 'Royal Flush <span>Poker</span>');

// Chips 10000 болгох
html = html.replace(/chips:5000/g, 'chips:10000');

fs.writeFileSync('index.html', html);
console.log('Done!');
