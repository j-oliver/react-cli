import React from 'react';

const preventedKeys = [
  'Shift',
  'Alt',
  'Ctrl',
  'Tab',
  'Meta',
  'CapsLock',
];

export default class Prompt extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
      textIndex: 0,
      log: [],
      logIndex: 0,
    }
  }

  moveCursor(direction) {
    if (direction === 'right' && this.state.textIndex === this.state.text.length
      || direction === 'left' && this.state.textIndex === 0) return;

    const textIndex = direction === 'left' ? this.state.textIndex - 1 : this.state.textIndex + 1;
    this.setState({ textIndex });
  }

  addChar(char) {
    const text1 = this.state.text.slice(0, this.state.textIndex);
    const text2 = this.state.text.slice(this.state.textIndex);
    const text = `${text1}${char}${text2}`;

    const textIndex = this.state.textIndex + 1;

    this.setState({ text, textIndex });
  }

  delChar() {
    const text = this.state.text.substring(0, this.state.text.length - 1);
    this.moveCursor('left');
    this.setState({ text });
  }

  setPromptToPrevLog() {
    if (this.state.logIndex <= 0) return;

    const logIndex = this.state.logIndex - 1;
    const text = this.state.log[logIndex];
    const textIndex = text.length;

    this.setState({ text, logIndex, textIndex });
  }

  setPromptToNextLog() {
    if (this.state.logIndex >= this.state.log.length - 1) {
      const text = '';
      const textIndex = 0;
      const logIndex = this.state.log.length;
      this.setState({ text, textIndex, logIndex });
      return;
    }

    const logIndex = this.state.logIndex + 1;
    const text = this.state.log[logIndex];
    const textIndex = text.length;

    this.setState({ text, logIndex, textIndex });
  }

  enterCommand() {
    this.props.submit(this.state.text);

    const text = '';
    const textIndex = 0;
    const log = [...this.state.log, this.state.text];
    const logIndex = log.length;

    this.setState({ text, textIndex, log, logIndex });
  }

  onKeyPress(event) {
    if (preventedKeys.includes(event.key)) {
      return;
    }
    switch(event.key) {
      case 'ArrowUp': this.setPromptToPrevLog(); return;
      case 'ArrowDown': this.setPromptToNextLog(); return;
      case 'ArrowLeft': this.moveCursor('left'); return;
      case 'ArrowRight': this.moveCursor('right'); return;
      case 'Enter': this.enterCommand(); return;
      case 'Backspace': this.delChar(); return;
      default: this.addChar(event.key);
    }
  }

  render() {
    const text1 = this.state.text.substring(0, this.state.textIndex);
    const text2 = this.state.text.substring(this.state.textIndex);
    return (
      <div ref={this.props.divRef} className='prompt' onKeyDown={(evt) => this.onKeyPress(evt)} tabIndex='0'>
        <span className='promptsign'>{this.props.prompt}</span>
        {text1}
        <span className='highlightedLetter'></span>
        {text2}
      </div>
    )
  }
}