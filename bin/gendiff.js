#!/usr/bin/env node
import { Command } from 'commander'
import  parseJsonFile  from '../src/index.js'
import genDiff from '../src/sortkeys.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]',  'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = parseJsonFile(filepath1)
    const data2 = parseJsonFile(filepath2)
    const diff = genDiff(data1, data2)
    console.log(diff)
  })
program.parse(process.argv)

