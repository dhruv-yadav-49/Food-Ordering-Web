const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== 'node_modules') {
        walk(path.join(dir, file), fileList);
      }
    } else {
      if (file.endsWith('.js') && file !== 'server.js') {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

const srcDir = path.join(__dirname, 'src');
const allFiles = walk(srcDir);

console.log(`Found ${allFiles.length} files. Checking for syntax errors...`);

let hasError = false;

const { execSync } = require('child_process');

for (const file of allFiles) {
  try {
    // Check syntax only
    execSync(`node -c "${file}"`, { stdio: 'ignore' });
    console.log(`✅ Valid syntax: ${path.relative(__dirname, file)}`);
  } catch (error) {
    console.error(`❌ Syntax error in ${path.relative(__dirname, file)}:`);
    // Re-run to capture output
    try {
        execSync(`node -c "${file}"`);
    } catch (e) {
        console.error(e.message);
    }
    hasError = true;
  }
}

if (hasError) {
  console.log('Verification FAILED.');
  process.exit(1);
} else {
  console.log('Verification PASSED.');
  process.exit(0);
}
