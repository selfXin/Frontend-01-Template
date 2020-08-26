import {Animation,TimeLine} from './animation.js'

import {create,Text,Wrapper} from './reactCreateElement.js';


export class Carousel {
    constructor(config){
        this.children = [];
        this.data = [];
    }

    setAttribute(name, value) { //attribute
        this[name] = value;
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){
        
        return this.root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}





