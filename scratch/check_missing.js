const fs = require('fs');
const content = fs.readFileSync('src/services/api.ts', 'utf8');
const missing = [
  '7d8bfda4102e389d2d64048dafd62208',
  '9022808ff110e30b7652b09e31a3f76c',
  '63d7b4e5d1f514a4f378c485efcc9381',
  '3cda1265765585b9597913b723bfa897',
  'fefa557fe22bab5a1e1742227485e7b6',
  '4250a5c5d28585cbaad4b5fa8a7cc108',
  'a8449c8577fa8afbc9efbf6149ce31a5',
  'ae2858f85758f2135e68f62230b19f2a',
  '1a57889280c41b4864ad1f1a666dc082',
  '0d43bd266956242e69f029f6f4f8fdcc',
  '41e345edd9702f555fb57e933b4ad987'
];
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const m of missing) {
    if (line.includes(m)) {
      console.log(`=== MATCH ${m} at line ${i+1} ===`);
      console.log(lines.slice(Math.max(0, i - 8), i + 1).join('\n'));
    }
  }
}
