const fs = require('fs');
const path = require('path');

// Replaces the placeholder API_KEY in config.js with the actual 
// environment variable provided during Vercel's build process.
function injectApiKey() {
    const configPath = path.join(__dirname, 'config.js');
    if (!fs.existsSync(configPath)) {
        console.error('config.js not found!');
        process.exit(1);
    }

    let content = fs.readFileSync(configPath, 'utf8');
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
        console.error('❌ Error: OPENWEATHER_API_KEY environment variable is not set in Vercel!');
        console.error('Please add it in Settings > Environment Variables.');
        process.exit(1);
    }

    // Replace the API_KEY value regardless of what's currently there
    const regex = /const API_KEY = ["'].*["'];/;
    if (!content.match(regex)) {
        console.error('❌ Error: Could not find "const API_KEY = ..." pattern in config.js');
        process.exit(1);
    }

    const updatedContent = content.replace(regex, `const API_KEY = "${apiKey}";`);
    
    fs.writeFileSync(configPath, updatedContent);
    console.log('✅ Successfully injected API_KEY into config.js.');
    console.log('Key length injected:', apiKey.length, 'characters');
}

injectApiKey();
