const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:\\Users\\Karan Singh\\.gemini\\antigravity-ide\\brain\\5a7bf579-a11f-4c36-9bb5-aa5fcb011732';
const PUBLIC_DIR = path.join(__dirname, '../public/images');

const MAPPING = {
  cauliflower: ['7d8bfda4102e389d2d64048dafd62208.jpg'],
  okra: ['9022808ff110e30b7652b09e31a3f76c.jpg'],
  dragon_fruit: ['63d7b4e5d1f514a4f378c485efcc9381.jpg', '92fdbc3a67ce03fa8bbfee6bed34946d.jpg'],
  lettuce: ['3cda1265765585b9597913b723bfa897.jpg'],
  cabbage: ['fefa557fe22bab5a1e1742227485e7b6.jpg'],
  beetroot: ['4250a5c5d28585cbaad4b5fa8a7cc108.jpg'],
  turnip: ['a8449c8577fa8afbc9efbf6149ce31a5.jpg'],
  kale: ['ae2858f85758f2135e68f62230b19f2a.jpg'],
  ghee: ['1a57889280c41b4864ad1f1a666dc082.jpg'],
  brussels_sprouts: ['0d43bd266956242e69f029f6f4f8fdcc.jpg'],
  cape_gooseberry: ['41e345edd9702f555fb57e933b4ad987.jpg']
};

const filesInArtifacts = fs.readdirSync(ARTIFACTS_DIR);

for (const [prefix, targetFiles] of Object.entries(MAPPING)) {
  const matchingFile = filesInArtifacts.find(f => f.startsWith(prefix) && f.endsWith('.png'));
  if (matchingFile) {
    const sourcePath = path.join(ARTIFACTS_DIR, matchingFile);
    for (const targetFile of targetFiles) {
      const destPath = path.join(PUBLIC_DIR, targetFile);
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied ${matchingFile} -> ${targetFile}`);
    }
  } else {
    console.error(`Could not find generated image for prefix: ${prefix}`);
  }
}
console.log("Image mapping copy completed successfully!");
