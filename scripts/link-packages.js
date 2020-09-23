const fs = require('fs');
const { resolve } = require('path');
const { exec } = require("child_process");
const deps = require('../deps.json');
const currentDir = process.cwd();

const targetPath = resolve(currentDir, deps.target);

for (const path of deps.paths) {
  let dirsPath;
  if (path.endsWith('*')) {
    dirsPath = resolve(currentDir, path.substring(0, path.length - 1));  
    const nestedPaths = fs.readdirSync(dirsPath);
    for (const nested of nestedPaths) {
      const resultedPath = resolve(dirsPath, nested);
      exec(`ln -s ${targetPath} ${resultedPath}`, (_, stdout, stderr) => {
        console.log(stdout, stderr);
      });
    }
  } else {
    dirsPath = resolve(currentDir, path);
    exec(`ln -s ${targetPath} ${dirsPath}`, (_, stdout, stderr) => {
      console.log(stdout, stderr);
    });
  }
}