// const self = require('sdk/self');
// const pageMod = require("sdk/page-mod");
// const tabs = require("sdk/tabs");
// const child_process = require("sdk/system/child_process");
// const prefs = require("sdk/simple-prefs");
// const notifications = require("sdk/notifications");

// const {Cu} = require("chrome");
// const {Downloads} = Cu.import("resource://gre/modules/Downloads.jsm");
// const {Task} = Cu.import("resource://gre/modules/Task.jsm");
// const {OS} = Cu.import("resource://gre/modules/osfile.jsm")

// function* getValidFilename(folder, filename) {
//     let increment = 0;
//     // Filter platform invalid filename characters
//     filename = filename.replace(/[*:?<>|/"\\]/g, '-');
//     let fullPath = OS.Path.join(`${folder}`, `${filename}`);
//     while (yield OS.File.exists(fullPath)) {
//         let filenameArray = filename.split(".");
//         filenameArray[filenameArray.length - 2] = `${filenameArray[filenameArray.length - 2]}_${++increment}`;
//         fullPath = OS.Path.join(`${folder}`, `${filenameArray.join(".")}`);
//     }
//     return fullPath;
// }

// function download(downloadsArray, callback) {
//     let downloadFolder = prefs.prefs.download_folder;
//     if (!downloadFolder) {
//         notifications.notify({
//             title: "Add-on Review Helper",
//             text: "Please set a download directory in the preferences.",
//         });
//         return;
//     }
//     let files = [];
//     Promise.all(downloadsArray.map(Task.async(function*(value, index, array) {
//         let finalDest = yield getValidFilename(downloadFolder, value.filename);
//         console.log(`Downloading ${value.downloadPath} to ${finalDest}.`);
//         var list = yield Downloads.getList(Downloads.ALL);
//         var download = yield Downloads.createDownload({
//             source: value.downloadPath,
//             target: finalDest
//         });
//         list.add(download);
//         try {
//             yield download.start();
//         } finally {
//             yield download.finalize(true);
//         }
//         console.log(`${finalDest} has been downloaded`);
//         return finalDest;
//     }))).then(function(files) {
//         if (callback) callback(files);
//     }, Cu.reportError);
// }

// pageMod.PageMod({
//     include: /^https?:\/\/addons(?:(?:-dev)|(?:-internal))?\.(?:(?:(?:mozilla|allizom)\.org)|(?:prod\.mozaws\.net))\/(?:[a-z]{2}(?:\-[a-z]{2})?\/)?editors\/review(?:-(?:un)?listed)?\/(?:[^\/]+)(?:\/)?/i,
//     attachTo: ["existing", "top"],
//     contentScriptFile: ["./jquery.min.js", "./content.js"],
//     contentStyleFile: "./style.css",
//     onAttach: function(worker) {
//         worker.port.on("download", function(downloadsArray) {
//             download(downloadsArray, null)
//         });
//         worker.port.on("openTab", function(url) {
//             tabs.open(url);
//         });
//         worker.port.on("offline-compare", function(downloadsArray) {
//             download(downloadsArray, function(files) {
//                 console.log(`Comparing ${files.join(", ")}`);
//                 let compareCommand = prefs.prefs.compare_command;
//                 let compareCommandArgs = prefs.prefs.compare_command_args;
//                 if ((compareCommand) && (compareCommand != "") && (compareCommandArgs.indexOf("$1") > -1) && (compareCommandArgs.indexOf("$2") > -1)) {
//                     let args = compareCommandArgs.match(/(?:[^\s"']+|["']{1}[^'"]*["']{1})+/g);
//                     args[args.indexOf("$1")] = files[0];
//                     args[args.indexOf("$2")] = files[1];
//                     child_process.spawn(compareCommand, args);
//                 } else {
//                     notifications.notify({
//                         title: "Add-on Review Helper",
//                         text: "Please set a client compare tool and arguments in the preferences.",
//                     });
//                 }
//             });
//         });
//     }
// });
