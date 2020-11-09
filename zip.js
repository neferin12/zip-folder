#!/usr/bin/env node

let i = 2;
const args = process.argv;
let configs = {
    output: "dist.zip",
    dir: null
}

function printUsage() {
    console.log("Usage: zip-folder <sourceFolder> [--output <outputDir>]")
}

while (i < args.length) {
    if (args[i] === "-o" || args[i] === "--output") {
        configs.output = args[i + 1];
        i += 2;
    }else if (args[i] === "-s" || args[i] === "--source") {
        configs.dir = args[i + 1];
        i += 2;
    } else if (args[i] === "-h" || args[i] === "--help") {
        printUsage();
        return 0;
    } else if (!(args[i].startsWith("-"))) {
        configs.dir = args[i];
        i++;
    }
}
if (!configs.dir) {
    printUsage();
    return 0;
}

console.log("Archiving "+configs.dir+" to "+configs.output)

const fs = require('fs');
const archiver = require('archiver');

let output = fs.createWriteStream(__dirname + '/' + configs.output);

let archiv = archiver('zip', {
    zlib: {level: 9}
});

archiv.pipe(output);
archiv.directory(configs.dir, ".");
archiv.finalize();