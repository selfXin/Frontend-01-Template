import {Animation,TimeLine} from './animation.js'

import {create,Text,Wrapper} from './reactCreateElement.js';

class Carousel {
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

        let linear = t => t;
        let timeLine = new TimeLine();

        this.root = <div class='carousel'>
                {
                    this.data.map((item,index)=>{
                        let element = <img src = {item}/>;
                        element.addEventListener("dragstart", event => event.preventDefault());
                        return element;
                    })
                }
            </div>;

        let position = 0;
        let nextPic = ()=>{
            let nextPosition = (position+1)%this.data.length;


            let current = this.root.children[position].root;
            let next = this.root.children[nextPosition].root;

            // current.style.transition = '0s ease';
            // next.style.transition = '0s ease';


            current.style.transform = `translateX(${-100*position}%)`;
            next.style.transform = `translateX(${100-100*nextPosition}%)`;

            setTimeout(()=>{
                // current.style.transition = '';
                // next.style.transition = '';
// debugger
                timeLine.restart();
                timeLine.add(new Animation(current.style,'transform',v=>`translateX(${v}%)`,-100*position,-100-100*position,800,0,linear))
                timeLine.add(new Animation(next.style,'transform',v=>`translateX(${v}%)`,100-100*nextPosition,-100*nextPosition,800,0,linear))
                timeLine.start();

                // current.style.transform = `translateX(${-100-100*position}%)`;
                // next.style.transform = `translateX(${-100*nextPosition}%)`;
                position = nextPosition;
            },20)
            setTimeout(nextPic,3000);
        }
        /*
        this.root.addEventListener('mousedown',(e)=>{
                let lastPostion = (position-1 + this.data.length)%this.data.length;
                let NextPostion = (position+1)%this.data.length;

                let current = this.root.children[position].root;
                let last = this.root.children[lastPostion].root;
                let next = this.root.children[NextPostion].root;

                current.style.transition = `0s ease`;
                last.style.transition = `0s ease`;
                next.style.transition = `0s ease`;


                current.style.transform = `translateX(${-500*position}px)`;
                last.style.transform = `translateX(${-500 -500*lastPostion}px)`;
                next.style.transform = `translateX(${500 -500*NextPostion}px)`;

                let startx = e.clientX,
                    starty = e.clientY;
                let move = (event) => {
                    let x = event.clientX - startx,
                        y = event.clientY - starty;


                    current.style.transform = `translateX(${x-500*position}px)`;
                    last.style.transform = `translateX(${x-500 -500*lastPostion}px)`;
                    next.style.transform = `translateX(${x + 500 -500*NextPostion}px)`;

                };
                let up = (event) => {
                    let offset = 0;
                    console.log('up')
                    let x =  event.clientX - startx;
                    if(x > 250){
                        offset=1;
                    }else if(x < -250){
                        offset=-1;
                    }


                    current.style.transition = '';
                    last.style.transition = '';
                    next.style.transition = '';


                    current.style.transform = `translateX(${offset*500-500*position}px)`;
                    last.style.transform = `translateX(${offset*500-500 -500*lastPostion}px)`;
                    next.style.transform = `translateX(${offset*500 + 500 -500*NextPostion}px)`;

                    position = (position - offset + this.data.length)%this.data.length;
                    document.removeEventListener("mousemove",move);
                    document.removeEventListener("mouseup",up);
                }
                document.addEventListener('mousemove',move)
                document.addEventListener('mouseup',up)
            });
        */
        setTimeout(nextPic,3000);


        return this.root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}

let data = [
            "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
            "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
            "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
            "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
        ];
let carousel = <Carousel data={data}></Carousel>


    
carousel.mountTo(document.querySelector('#container'));



