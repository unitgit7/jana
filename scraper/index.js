const { app, BrowserWindow } = require('electron')
const fs = require('fs')

const JAVASCRIPT = `
function main() {
  alert("Hello Bill");
  try {
    return document.title;
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
    fs.writeFileSync('/Users/wdestein/tmp/jana', `response: ${response}`);
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
  win.loadURL('http://wade-road-east.com')

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
