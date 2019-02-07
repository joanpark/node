const {ipcMain, dialog} = require('electron')

ipcMain.on('open-information-dialog', (event) => {
  const options = {
    type: 'info',
    title: "Writer's Journey",
    message: "Writer's Journey\n" + 
    "한국어판 ver1.01",
    buttons: ['OK']
  }
  dialog.showMessageBox(options, (index) => {
    event.sender.send('information-dialog-selection', index)
  })
})