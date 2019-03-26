const {Command, flags} = require('@oclif/command');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

class BlogpostgeneratorCommand extends Command {
  createMarkdownFile(mdp, frontmatter) {
    if (!fs.existsSync(mdp)) {
      fs.writeFileSync(mdp, frontmatter);
    } else {
      this.log(`This file ${mdp} already exists. Change your title using the -t argument to create a unique post.`);
    }
  }
  
  async run() {
    const date = moment().format('YYYY-MM-DD');
    const {flags} = this.parse(BlogpostgeneratorCommand)
    const title = flags.title || 'Your Title Here';
    const folderPath = path.join(process.cwd(), date);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    let markdownFilename = 'index.md';
    if (title !== 'Your Title Here') {
      markdownFilename = _.kebabCase(title) + '.md';
    }

    const frontmatter = `---
layout: post
title: "${title}"
description: ""
category: 
date: ${date}
cover_image: "./unnamed.jpg"
---
`;

    const markdownPath = path.join(process.cwd(), date, markdownFilename);
    this.createMarkdownFile(markdownPath, frontmatter);
    this.log(`${markdownFilename} in folder ${date}`);
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
