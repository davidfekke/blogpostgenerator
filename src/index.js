const {Command, flags} = require('@oclif/command');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

class BlogpostgeneratorCommand extends Command {
  async run() {
    const date = moment().format('YYYY-MM-DD');
    const {flags} = this.parse(BlogpostgeneratorCommand)
    const title = flags.title || 'Your Title Here'
    fs.mkdirSync(path.join(process.cwd(), date));
    const frontmatter = `---
layout: post
title: "${title}"
description: ""
category: 
date: ${date}
cover_image: "./unnamed.jpg"
---
`;
    fs.writeFileSync(path.join(process.cwd(), date, 'index.md'), frontmatter);
    this.log(`${title} on ${date}`);
  }
}

BlogpostgeneratorCommand.description = `Use this to generate a folder with markdown and frontmatter
...
Extra documentation goes here
`

BlogpostgeneratorCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  title: flags.string({char: 't', description: 'Title of the post'}),
}

module.exports = BlogpostgeneratorCommand
