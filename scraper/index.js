

const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const JAVASCRIPT = `
function main() {
  let message = "";
  try {
    const divs = document.getElementsByClassName("CollapsibleFormSection_headerTopLeft__2OtaC");
    let res = [];
    for (var i = 0; i < divs.length; i += 1) {
      const div = divs[i];
      if (div.innerHTML.startsWith("Home")) {
        div.click();
        res.push(document.getElementsByName("filingName")[0].value);
      }
      if (div.innerHTML.startsWith("Step 5")) {
        div.click();
        res.push(document.getElementsByClassName("SarWorkspace_narrativeTextArea__2-k62")[0].value);

      }

    }
    return res;
  } catch (e) {
    message = e.toString();
  }
  return message;
}
main();
`.trim();

async function javascriptLoop(win) {

    await new Promise((resolve, reject) => setTimeout(resolve, 15000));
    try {
      const response = await win.webContents.executeJavaScript(JAVASCRIPT);
      console.log(JSON.stringify(response[0]));
      // console.log(typeof response);
      const rescase = response[0].replace(/\\n/g, '');
      console.log(rescase);
      console.log(response[1].replace(/\\n/g, ''));

    } catch(e) {
      console.log(e.toString());
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
  win.loadURL('https://dashboard.unit21.com/filings/sar/1918705')
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
