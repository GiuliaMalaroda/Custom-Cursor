import gsap from 'gsap';
import { getMousePosition } from './utils';

// Track the mouse position
let mouse = { x: 0, y: 0 };
window.addEventListener(
    'mousemove', 
    event => {
        return mouse = getMousePosition(event)
    }
);

export default class Cursor {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.el.style.opacity = 0;

        this.bounds = this.DOM.el.getBoundingClientRect();

        this.renderedStyles = {
            tx: { previous: 0, current: 0, amt: 0.2 },
            ty: { previous: 0, current: 0, amt: 0.2 }
        };

        this.onFirstMouseMove = () => {
            this.renderedStyles.tx.previous = this.renderedStyles.tx.current = mouse.x - this.bounds.width / 2;
            this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = mouse.y - this.bounds.height / 2;
                
            gsap.to(this.DOM.el, {
                duration: 2, 
                ease: 'Power3.easeOut', 
                opacity: 1
            });
            
            this.render();
            window.removeEventListener('mousemove', this.onFirstMouseMove);    
        }

        this.onMouseDown = (e) => {
            if (e.which === 1) {
                this.DOM.el.classList.add("cursor--mousedown");
            }
        }

        this.onMouseUp = () => {
            this.DOM.el.classList.remove("cursor--mousedown");
        }

        window.addEventListener('mousemove', this.onFirstMouseMove);
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    render() {
        this.renderedStyles['tx'].current = mouse.x - this.bounds.width / 2;
        this.renderedStyles['ty'].current = mouse.y - this.bounds.height / 2;

        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].previous = this.renderedStyles[key].current;
        }

        this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px)`;
    
        requestAnimationFrame(() => this.render());
    }

    onMouseEnter = () => this.DOM.el.classList.add("cursor--mousehover");

    onMouseLeave = () => this.DOM.el.classList.remove("cursor--mousehover");
}