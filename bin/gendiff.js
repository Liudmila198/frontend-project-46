#!/usr/bin/env node
import { Command } from 'commander'
import  parseFile  from '../src/index.js'
import genDiff from '../src/sortkeys.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]',  'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((data1, data2) => {
    //const data1 = parseFile(filepath1)
    //const data2 = parseFile(filepath2)
    const diff = genDiff(data1, data2)
    console.log(diff)
  })
program.parse(process.argv)

