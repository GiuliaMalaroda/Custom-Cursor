import Cursor from './cursor';

const cursor = new Cursor(document.querySelector('.cursor'));

const links = document.querySelectorAll('.link');
links.forEach(link => {
    link.addEventListener('mouseover', () => cursor.onMouseEnter());
    link.addEventListener('mouseleave', () => cursor.onMouseLeave());
});