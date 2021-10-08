#!/usr/bin/env node
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-v, --version', 'output the version number 1')
  .helpOption('-h, --help', 'output usage information');

program.parse();
console.log('Привет')
