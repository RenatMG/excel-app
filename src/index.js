import Person from './person.js';
import './styles/style.css';
import './styles/style.scss';
import pic from './images/3dwall66.jpg';


console.log('webpack is working');
const Elena = new Person('Елена', 35, 'Russia');
console.log(Elena)

document.querySelector('img').src = pic
