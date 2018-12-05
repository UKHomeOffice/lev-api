#!/usr/bin/env node

'use strict';

const fs = require('fs');
const drone = '.drone.yml';
const config = fs.readFileSync(drone, { encoding: 'utf8' });
const [major, minor, patch] = require('./package.json').version.split('.');

fs.writeFileSync(drone, config.replace(
  /^(.*MAJOR:\s*- )\d+(\s*MINOR:\s*- )\d+(\s*PATCH:\s*- )\d+(.*)$/m, `$1${major}$2${minor}$3${patch}$4`));
