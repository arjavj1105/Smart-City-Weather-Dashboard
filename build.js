const fs = require('fs');
const path = require('path');

// Completely overwrites config.js with the API_KEY from environment variables.
// This is more reliable than replacing text.
function generateConfig() {
    const configPath = path.join(__dirname, 'config.js');
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        console.error('❌ Error: OPENWEATHER_API_KEY environment variable is not set in Vercel!');
        console.error('Please add it in Settings > Environment Variables.');
        process.exit(1);
    }

    const content = `// Smart City Weather Dashboard - Auto-generated Config
const API_KEY = "${apiKey}";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
`;

    fs.writeFileSync(configPath, content);
    console.log('✅ Successfully generated config.js with the provided API_KEY.');
    console.log('Key length:', apiKey.length, 'characters');
}

generateConfig();
