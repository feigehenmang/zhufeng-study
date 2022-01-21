import '@/styles/index.css'
import '@/styles/index.less'
import '@/styles/index.scss'
import { Person } from '@/person'
const p1 = new Person()
console.log(p1.Pi)
const a = 10
document.querySelector('#app').innerHTML = a
let logo = require('./assets/images/a.jpg');
let img = new Image();
console.log(logo)
img.src = logo;
document.body.appendChild(img);
console.log(a)