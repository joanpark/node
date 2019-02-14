const { quill } = require('./quill');
const store = require('./store');

const footer = document.querySelector('footer');
const position = document.querySelector('.position');
const selection = document.querySelector('.selection');
const fileStats = document.querySelector('.file-stats');
const file = document.querySelector('.file-name > div');
const time = document.querySelector('.time');

module.exports = {
  init() {
    let isVisible = true;

    if (store.has('footer')) {
      isVisible = store.get('footer');
    }

    if (!isVisible) {
      footer.classList.add('hide');
    }

    module.exports.updateFileStats();

    module.exports.updateTime();
    setInterval(module.exports.updateTime, 10000);
  },
  toggle() {
    footer.classList.toggle('hide');
    const isHidden = footer.classList.contains('hide');
    store.set('footer', !isHidden);
  },
  updateTime() {
    const date = new Date();
    time.textContent = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  },
  updateCursorStats() {
    const range = quill.getSelection();

    if (range) {
      const lines = quill.getText(0, range.index).split('\n');
      const line = lines.length;
      const char = lines[line - 1].length + 1;

      // Update the cursor position stats
      position.textContent = `${line}:${char}`;

      // Update the selection stats
      if (range.length !== 0) {
        const text = quill.getText(range.index, range.length).trim();
        const sLines = text.split('\n').length;
        const sChars = text.length;
        selection.textContent = `[${sLines}, ${sChars}]`;
      } else {
        selection.textContent = '';
      }
    }
  },
  updateFileStats() {
    const text = quill.getText(0, quill.getLength());
    const lines = text.split('\n').length - 1;
    const words = text.length > 1 ? text.split(/\s+/).length - 1 : 0;

    // Update the file stats
    fileStats.textContent = `${lines}L ${words}W`;
  },
  setFile(name) {
    file.textContent = `${name}`;
  },
  hasChanges() {
    file.classList.add('unsaved');
  },
  noChanges() {
    file.classList.remove('unsaved');
  },
};
