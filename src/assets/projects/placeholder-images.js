/**
 * Placeholder Image Generator for Project Images
 * 
 * This script can be used to generate placeholder images for your projects
 * with custom colors and text labels.
 * 
 * To use:
 * 1. Open browser console
 * 2. Copy and paste this entire script
 * 3. Call generatePlaceholderImage() with your parameters
 * 4. Right-click on the image and save it
 */

/**
 * Generates a placeholder image with gradient background and text
 * @param {string} text - Text to display on the image
 * @param {string} color1 - First gradient color
 * @param {string} color2 - Second gradient color 
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} - Data URL of the generated image
 */
function generatePlaceholderImage(text = 'Project Image', color1 = '#9d4edd', color2 = '#ff9900', width = 800, height = 400) {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add a pattern overlay for texture
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  for (let x = 0; x < width; x += 20) {
    for (let y = 0; y < height; y += 20) {
      if ((x + y) % 40 === 0) {
        ctx.fillRect(x, y, 10, 10);
      }
    }
  }
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width/2, height/2);
  
  // Add instructions
  ctx.font = '16px Arial';
  ctx.fillText('Right-click to save this image', width/2, height/2 + 50);
  
  // Convert to data URL
  return canvas.toDataURL('image/jpeg', 0.9);
}

/**
 * Creates an image element with the generated placeholder
 * @param {Object} options - Generation options
 * @returns {HTMLImageElement} - The image element
 */
function createPlaceholderImageElement(options = {}) {
  const img = document.createElement('img');
  img.src = generatePlaceholderImage(
    options.text, 
    options.color1, 
    options.color2, 
    options.width, 
    options.height
  );
  img.style.display = 'block';
  img.style.maxWidth = '100%';
  img.style.margin = '20px auto';
  img.style.border = '1px solid #ccc';
  return img;
}

/**
 * Example usage:
 * 
 * // Portfolio image (purple/orange)
 * document.body.appendChild(createPlaceholderImageElement({
 *   text: 'Portfolio Website',
 *   color1: '#9d4edd',
 *   color2: '#ff9900',
 *   width: 800,
 *   height: 400
 * }));
 * 
 * // Task Manager image (blue/teal)
 * document.body.appendChild(createPlaceholderImageElement({
 *   text: 'Task Manager App',
 *   color1: '#3a86ff',
 *   color2: '#00b4d8',
 *   width: 800,
 *   height: 400
 * }));
 * 
 * // Weather App image (orange/yellow)
 * document.body.appendChild(createPlaceholderImageElement({
 *   text: 'Weather Dashboard',
 *   color1: '#fb5607',
 *   color2: '#ffbe0b',
 *   width: 800,
 *   height: 400
 * }));
 * 
 * // Academic Project 1 (purple/pink)
 * document.body.appendChild(createPlaceholderImageElement({
 *   text: 'University Enrollment System',
 *   color1: '#8338ec',
 *   color2: '#ff006e',
 *   width: 800,
 *   height: 400
 * }));
 * 
 * // Academic Project 2 (green/teal)
 * document.body.appendChild(createPlaceholderImageElement({
 *   text: 'E-Learning Platform',
 *   color1: '#06d6a0',
 *   color2: '#118ab2',
 *   width: 800,
 *   height: 400
 * }));
 * 
 * // Academic Project 3 (red/purple)
 * document.body.appendChild(createPlaceholderImageElement({
 *   text: 'Healthcare Management System',
 *   color1: '#ef476f',
 *   color2: '#9d4edd',
 *   width: 800,
 *   height: 400
 * }));
 */ 