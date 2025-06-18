#!/usr/bin/env node
import { Command } from 'commander'
import { parseJsonFile } from '../src/parsers.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]',  'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parseJsonFile(filepath1);
    const data2 = parseJsonFile(filepath2);
    console.log('Parsed data from file 1:', data1);
    console.log('Parsed data from file 2:', data2);
  })
program.parse(process.argv)

