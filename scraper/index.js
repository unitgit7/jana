const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const JAVASCRIPT = `
function main() {
  let message = "";
  try {
    const divs = document.getElementsByClassName("CollapsibleFormSection_headerTopLeft__18kl0");
    for (var i = 0; i < divs.length; i += 1) {
      const div = divs[i];
      if (div.innerHTML.startsWith("Step 5")) {
        return div.innerHTML;
      }
    }
  } catch (e) {
    message = e.toString();
  }
  return message;
}
main();
`.trim();

async function javascriptLoop(win) {
  while(true) {
    await new Promise((resolve, reject) => setTimeout(resolve, 5000));
    try {
      const response = await win.webContents.executeJavaScript(JAVASCRIPT);
      console.log(JSON.stringify(response));
    } catch(e) {
      console.log(e.toString());
    }
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
  win.loadURL('https://dashboard.unit21.com/filings/sar/1895074')
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
