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

        let linear = t => t;
        let timeLine = new TimeLine();
        timeLine.start();
        let position = 0;

        let nextPicStopHandle = null;


        let children =  this.data.map((item,currentPosition)=>{
            let lastPostion = (currentPosition-1 + this.data.length)%this.data.length;
            let NextPostion = (currentPosition+1)%this.data.length;
            let offset = 0;
            let onStart = () => {
                timeLine.pause();
                clearTimeout(nextPicStopHandle)


                let currentElement = children[currentPosition];
                let currentTransformValue = Number(currentElement.root.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500*currentPosition;

            }

            let onPan = event => {
                

                let lastElement = children[lastPostion];
                let currentElement = children[currentPosition];
                let nextElement = children[NextPostion];

                let currentTransformValue = -500*currentPosition + offset;
                let lastTransformValue = -500 - 500*lastPostion + offset;
                let nextTransformValue = 500 - 500*NextPostion + offset;

                let dx = event.clientX - event.startX;


                lastElement.root.style.transform = `translateX(${lastTransformValue+dx}px)`
                currentElement.root.style.transform = `translateX(${currentTransformValue+dx}px)`
                nextElement.root.style.transform = `translateX(${nextTransformValue+dx}px)`

            }

            let onPanend = event => {
                let direction = 0;
                let dx = event.clientX - event.startX;

                if(dx + offset > 250){
                    direction=1;
                }else if(dx + offset < -250){
                    direction=-1;
                }

                timeLine.restart();
                timeLine.start();


                let lastElement = children[lastPostion];
                let currentElement = children[currentPosition];
                let nextElement = children[NextPostion];


                let lastAinmation = new Animation(lastElement.root.style,'transform',v=>`translateX(${v}px)`,- 500-500*lastPostion+offset+dx,- 500-500*lastPostion+direction*500,500,0,linear);
                let currentAinmation = new Animation(currentElement.root.style,'transform',v=>`translateX(${v}px)`,-500*currentPosition+offset+dx,-500*currentPosition+direction*500,500,0,linear);
                let nextAinmation = new Animation(nextElement.root.style,'transform',v=>`translateX(${v}px)`,500-500*NextPostion+offset+dx,500-500*NextPostion+direction*500,500,0,linear);

                timeLine.add(lastAinmation)
                timeLine.add(currentAinmation)
                timeLine.add(nextAinmation)


                position = (position - offset + this.data.length)%this.data.length;
                nextPicStopHandle = setTimeout(nextPic,3000);
            }
            let element = <img src = {item} onPanend={onPanend} onPan={onPan} onStart={onStart} enableGesture={true}/>;
            element.root.style.transform = 'translateX(0px)';
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        })

        this.root = <div class='carousel'>
                {
                   children
                }
            </div>;

        let nextPic = ()=>{
            let nextPosition = (position+1)%this.data.length;


            let current = this.root.children[position].root;
            let next = this.root.children[nextPosition].root;

            let currentAinmation = new Animation(current.style,'transform',v=>`translateX(${5*v}px)`,-100*position,-100-100*position,500,0,linear);
            let nextAinmation = new Animation(next.style,'transform',v=>`translateX(${5*v}px)`,100-100*nextPosition,-100*nextPosition,500,0,linear);


            current.style.transform = `translateX(${-100*position}%)`;
            next.style.transform = `translateX(${100-100*nextPosition}%)`;

            
            position = nextPosition;
            
            timeLine.add(currentAinmation)
            timeLine.add(nextAinmation)

            nextPicStopHandle = setTimeout(nextPic,3000);
        }
        
        setTimeout(nextPic,3000);


        return this.root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}





