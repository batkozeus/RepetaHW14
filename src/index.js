import Model from './js/Model';
import View from './js/View';
import Controller from './js/Controller';
import './css/styles.css';

const model = new Model();
const view = new View();

new Controller(model, view);