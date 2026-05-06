const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../assets/icon.svg');
const distDir = path.join(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('dist/ folder not found. Run expo export first.');
  process.exit(1);
}

const svg = fs.readFileSync(svgPath);

const sizes = [
  { name: 'icon-192.png',        size: 192 },
  { name: 'icon-512.png',        size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

for (const { name, size } of sizes) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } });
  const png = resvg.render().asPng();
  fs.writeFileSync(path.join(distDir, name), png);
  console.log(`Generated ${name} (${size}x${size})`);
}
