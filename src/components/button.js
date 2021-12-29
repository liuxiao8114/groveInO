import React from 'react'

export default function Button(props) {
  return React.createElement(
    'button',
    { style: { padding: '10px 20px', color: '#fff' }, onClick: props.handleClick, ...props },
    props.children,
  )

  // Or using JSX:
  // return (
  //   <button style={{ background: 'red', color: '#fff' }} onClick={props.handleClick}>
  //     { props.children }
  //   </button>
  // )
}
