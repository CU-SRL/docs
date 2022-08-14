# Welcome to the CU Sounding Rocket Lab's Documentation

This is the landing page for most of our documentation.

If you are not yet a member of the CU SRL, please visit our site, at [https://soundingrocketlab.com/](https://soundingrocketlab.com/), for more information on getting involved. 

## Editing the docs

Click on the little Github icon on the top right of this page, or go to the repo at [https://github.com/CU-SRL/docs](https://github.com/CU-SRL/docs). 

If you're interested in doing heavy editing, we recommend you install `git` and work on the pages using a Markdown editor such as [Obsidian](https://obsidian.md/). 

### Windows

We recommend you use [Github Desktop](https://desktop.github.com/), as it is an easy-to-install and easy-to-use git manager and editor. It will also install Git Bash, where you can use more complex git commands such as shown below.

### Mac & Linux

1. Clone the repository using `git clone git@github.com:CU-SRL/docs.git`.
2. Open the `src/` folder in an editor of your choice.
3. To create a new document, create a new file ending in `.md`, and enter its path into [SUMMARY.md](SUMMARY.md). To create a section header or subheader, use the Markdown header syntax (`#` for primary, `##` for secondary).
4. To finalize your changes, run the following commands:

```bash
git add .
git commit -m "<change description>"
git push origin main
```