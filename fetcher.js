const args = process.argv.slice(2, 4);
const request = require('request');
const fs = require('fs');
const readline = require('readline');

let content;

request(args[0], (error, response, body) => {
  if (error !== null) {
    if (error.code === "ENOTFOUND") {
    console.log(`${args[0]} could not be found.`);
      return
    }
  }
  if (!fs.existsSync(args[1])) {
    console.log(`directory ${args[1]} does not exist.`);
    return
  }
  // console.log(error.code);
  console.log('Status code:', response && response.statusCode);
  content = body;
  if (fs.existsSync(args[1])) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('This file already exists! type "Y" if you would like to rewrite it.', input => {
      if (input !== 'Y') {
        console.log('File was not overwritten')
        rl.close();
        return
      }
      fs.writeFile(args[1], content, err => {
        if (err) {
          console.error(err)
          return;
        }
      console.log(`Download and saved ${content.length} bytes to ${args[1]}`);
    })
    rl.close();
  });
}
});