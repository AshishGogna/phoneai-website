const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateFavicons() {
  try {
    // Create favicon directory if it doesn't exist
    await fs.mkdir('favicon', { recursive: true });
    
    // Read the source logo
    const source = 'logo.png';
    
    // Generate favicon.ico (32x32)
    await sharp(source)
      .resize(32, 32)
      .toFile('favicon/favicon.ico');
    
    // Generate favicon-32x32.png
    await sharp(source)
      .resize(32, 32)
      .toFile('favicon/favicon-32x32.png');
    
    // Generate favicon-16x16.png
    await sharp(source)
      .resize(16, 16)
      .toFile('favicon/favicon-16x16.png');
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(source)
      .resize(180, 180)
      .toFile('favicon/apple-touch-icon.png');
    
    // Create site.webmanifest
    const manifest = {
      name: 'Phone AI',
      short_name: 'Phone AI',
      icons: [
        {
          src: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          src: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
      theme_color: '#10b981',
      background_color: '#10b981',
      display: 'standalone'
    };
    
    await fs.writeFile('favicon/site.webmanifest', JSON.stringify(manifest, null, 2));
    
    console.log('Favicons generated successfully in the favicon/ directory!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
