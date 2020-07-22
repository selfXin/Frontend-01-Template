function create(Cls, attributes, ...children){
	let o = new Cls({
        timer: {}
    });
	for(let name in attributes){
		o.setAttribute(name,attributes[name]);
	}
	for(let child of children){
		o.appendChild(child);
	}
	return o;
}

class Div {
	constructor(){
		this.children = [];
		this.root = document.createElement('div');
	}

	appendChild(child){
		this.children.push(child)
	}

	setAttribute (name,value){
		this.root.setAttribute(name,value)
	}

	montTo(parent){
		console.log(parent)
		// parent.appendChild(this.root);
		// for(let child of this.children){
		// 	child.montTo(this.root)
		// }
	}
}
let component = <Div>
					<Div></Div>
					<Div></Div>
					<Div></Div>
				</Div>
console.log(component.montTo,document,'component')
component.montTo(document.body);







