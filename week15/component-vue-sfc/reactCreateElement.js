

export function create(Cls, attributes, ...children){
    
    let o;

    if(typeof Cls === "string") {
        o = new Wrapper(Cls);
    } else {
        o = new Cls({
            timer: {}
        });
    }



    for(let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }


    let visit=(children)=>{
        for(let child of children) {
            if(typeof child === "string"){
                child = new Text(child);
            }
            if(Array.isArray(child)){
                visit(child);
                continue;
            }
            o.appendChild(child);
        }
    }
    visit(children);

    return o;
}

class Text {
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Wrapper{
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);

    }

    addEventListener(type,handler,config){
        this.root.addEventListener(...arguments);
    }

    mountTo(parent){
        parent.appendChild(this.root);

        for(let child of this.children){
            child.mountTo(this.root);
        }
    }

}