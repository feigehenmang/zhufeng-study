import './styles/index.css'
import './styles/index.less'
import './styles/index.scss'

const a = 10
document.querySelector('#app').innerHTML = a
let logo = require('./assets/images/a.jpg');
let img = new Image();
console.log(logo)
img.src = logo;
document.body.appendChild(img);
console.log(a)