import React from 'react';

const Line = ({text, prompt}) => (
  <div className='cli-line'>
    <span className='promptsign'>{prompt}</span>
    {text}
  </div>
);

export default Line;