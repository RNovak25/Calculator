import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [value, setValue] = useState('');
  
  const handleClick = (val) => {
    if (['+', '-', '*', '/'].includes(val) && ['+', '-', '*', '/'].includes(value.slice(-1))) {
      return;
    }
    if (value.length < 19) {
      setValue(value + val);
    }
  };

  const calculate = () => {
    try {
      setValue(eval(value).toString().slice(0, 19));
    } catch {
      setValue('Ошибка');
      setTimeout(() => setValue(''), 1500);
    }
  };

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'div',
      { className: 'calculator-wrapper' },
      React.createElement(
        'div',
        { className: 'calculator' },
        React.createElement(
          'form',
          {},
          React.createElement(
            'div',
            { className: 'display' },
            React.createElement('input', { type: 'text', value, readOnly: true })
          ),
          ...[
            ['AC', 'DE', '.', '/'],
            ['7', '8', '9', '*'],
            ['4', '5', '6', '+'],
            ['1', '2', '3', '-'],
            ['00', '0', '=']
          ].map((row, rowIndex) => 
            React.createElement(
              'div',
              { key: rowIndex },
              ...row.map(val => 
                React.createElement('input', {
                  key: val,
                  type: 'button',
                  value: val,
                  className: val === '=' ? 'equal' : '',
                  onClick: val === 'AC' ? () => setValue('') :
                          val === 'DE' ? () => setValue(value.slice(0, -1)) :
                          val === '=' ? calculate : () => handleClick(val)
                })
              )
            )
          )
        )
      )
    )
  );
}
