import React, { Component } from 'react';
import Prompt from './Prompt';
import Line from './CLILine';


export default class ReactCLI extends Component {

  constructor() {
    super();

    this.state = {
      lines: []
    }
  }

  addLine(text) {
    this.setState({ lines: [...this.state.lines, text]});
  }

  focusPrompt(prompt) {
    this.promptDiv.focus();
  }

  render() {
    const prompt = '>';
    return (
      <div className='cli' onClick={() => this.focusPrompt()}>
        {
          this.state.lines.map((line, index) => (
            <Line key={`cli-line-${index}`} text={line} prompt={prompt}/>
          ))
        }
        <Prompt divRef={prompt => this.promptDiv = prompt} submit={text => this.addLine(text)} prompt={prompt} />
      </div>
    );
  }
}
