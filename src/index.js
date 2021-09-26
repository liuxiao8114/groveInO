import print from './print'
import './style.css'

const dce = document.createElement.bind(document)

function createButton(text, style = `
  padding: 4px;
  background-color: yellow;
`) {
  const btn = dce('button')
  btn.style = style
  btn.innerHTML = text
  return btn
}

function component() {
  const element = dce('h2');
  element.innerHTML = 'Hello, the new world.'
  element.classList.add('hello')

  return element
}

function button() {
  const btn = createButton('Click me and see the print')
  btn.addEventListener('click', print)
  return btn
}

document.body.appendChild(component())
document.body.appendChild(button())
