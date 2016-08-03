# Addon Review Helper
## Download
Download from [AMO :: Add-on Review Helper](https://addons.mozilla.org/en-US/firefox/addon/add-on-review-helper/)

## Features
This add-on adds an overview grid to the Add-on review page on addons.mozilla.org (AMO).
It provides the following features:

* Download source and add-on files with a single click.
* Download multiple files at once
* Compare arbitraty source files or add-on versions using a local diff tool of your choice
* Quick links to version validation, source and diff viewer  

## Configuration

The add-on can be configured using the standard preferences system in Firefox. You can configure:
* the download directory,
* the path to the local diff tool,
* arguments to pass to the diff tool.

## Caveats

* Files are downloaded silently.
* A downloaded source file will always have the extension "zip".

Neither of those are easy to fix due to the page structure, the add-on capabilities and underlying Firefox code.
If you know how to solve them, pleas reach out.
