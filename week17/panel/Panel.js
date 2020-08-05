
import {create,Text,Wrapper} from './reactCreateElement.js';

export class Panel {
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

    select(i){
        for(let view of this.childViews){
            view.root.style.display = 'none';
        }

        for(let title of this.titleView){
            title.root.classList.remove('selected');
        }

        this.titleView[i].root.classList.add('selected')

        this.childViews[i].root.style.display = 'block';
        // this.titleView.innerText = this.children[i].title;
    }

    render(){
        this.childViews = this.children.map(item=><div style='width:100px;height:100px;'>{item}</div>)
        this.titleView = this.children.map((item,i)=><span onClick={()=>{this.select(i)}}>{item.getAttribute('title')}</span>);

        setTimeout(()=>{this.select(0)});
        return <div class='title'>
            <div style='width:100px;height:20px;background-color:green;color:#fff;'>{this.titleView }</div>
            <div style='border:1px solid #ccc;width:100px;'>
                {this.childViews}
            </div>
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}





