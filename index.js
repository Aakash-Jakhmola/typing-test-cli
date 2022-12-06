#! /usr/bin/env node
const { program } = require('commander');
const { performance } = require('perf_hooks');
const chalk = require('chalk');

const str = 'Some random string to type';

program
  .command('start')
  .description('Generates a random string')
  .action(() => {
    console.log(chalk.green(`\n${str}\n`));

    const start = performance.now();
    let index = 0;
    let correct = 0;

    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (key) {
      if (key === '\u0003' || key == '\u000d') {
        const stop = performance.now();
        const inSeconds = (stop - start) / 1000;
        const rounded = Number(inSeconds).toFixed(3);
        const wpm = Number((correct / (5 * rounded)) * 60).toFixed(2);

        process.stdout.write(
          chalk.blue(
            `\n-------------------------------------------------------------------------------\n
              Time : ${rounded}s  |  Speed : ${wpm} wpm  |  Correct : ${correct}
              \n------------------------------------------------------------------------------\n`,
          ),
        );
        process.exit();
      }

      if (str[index] == key) {
        correct++;
        process.stdout.write(chalk.white(key));
      } else {
        process.stdout.write(chalk.red(key));
      }
      if (key == '\u0008') index--;
      else index++;
    });
  });

program.parse();
