import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// The checked-in static portal is mounted independently of the main site's
// routes. Run this after the main Vite build; it does not touch public/ or ru/.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'partner-portal');
const build = path.join(root, 'dist');
const destination = path.join(build, 'partners');

if (!fs.existsSync(path.join(source, 'index.html'))) {
  throw new Error('The partner-portal static source is missing its index.html.');
}
if (!fs.existsSync(path.join(build, 'index.html'))) {
  throw new Error('Run the main site build before copying the partner portal.');
}
for (const directory of [source, build, destination]) {
  if (fs.existsSync(directory) && fs.lstatSync(directory).isSymbolicLink()) {
    throw new Error('Partner portal build directories must not be symbolic links.');
  }
}
fs.mkdirSync(destination, {recursive:true});
fs.cpSync(source, destination, {recursive:true, force:true});
console.log('Copied partner portal to dist/partners.');
