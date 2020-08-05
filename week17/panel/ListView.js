
import {create,Text,Wrapper} from './reactCreateElement.js';

export class ListView {
    constructor(config){
        this.children = [];
        this.data = [];

        this.state = Object.create(null);
    }

    setAttribute(name, value) { //attribute
        this[name] = value;
    }

    appendChild(child){
        this.children.push(child);
    }


    render(){
        console.log(this)
        let data = this.data;
        return <div>
        {
            data.map(this.children[0])
        }
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}





