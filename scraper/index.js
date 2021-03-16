const { app, BrowserWindow } = require('electron')
const fs = require('fs')

const JAVASCRIPT = `
function main() {
  alert("Hello Bill");
  try {
    return document.getElementsByClassName("SarWorkspace_narrativeTextArea__N6mua")[0].value;
  } catch (e) {
    return "title is undefined";
  }
}
main();
`.trim();


async function javascriptLoop(win) {
  while(true) {
    await new Promise((resolve, reject) => setTimeout(resolve, 5000));
    const response = await win.webContents.executeJavaScript(JAVASCRIPT);
    // fs.writeFile('/Users/wdestein/tmp/jana', response);
    fs.writeFileSync('', `response: ${response}`);
  }
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
  })

  win.webContents.openDevTools({mode: 'detach'});

  // Load the website
  win.loadURL('URL')

  // Run the javascript loop
  javascriptLoop(win);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// The below part returned some document names successfully:

// const JAVASCRIPT = `
// function main() {
//   alert("Hello Bill");
//   try {
//     var elems = document.getElementsByClassName("AttachmentItem_attachmentName__3BpVZ");
//     var result = [];
//     for(var i=0; i<elems.length; i++) {
//       result.push(elems[i].innerHTML)
//     }
//     return result;
//
//
//   } catch (e) {
//     return "title is undefined";
//   }
// }
// main();
// `.trim();
