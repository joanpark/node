const {ipcRenderer} = require('electron')

const informationBtn = document.getElementById('information-dialog')

informationBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-information-dialog')
})

ipcRenderer.on('information-dialog-selection', (event, index) => {
  
})