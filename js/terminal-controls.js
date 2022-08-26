document.addEventListener('mousemove', rotateTerminal);

function rotateTerminal(ev) {
    let mouse = {x: ev.clientX, y: ev.clientY};
    let distance = {
        x: mouse.x - parseInt(window.innerWidth/2),
        y: mouse.y - parseInt(window.innerHeight/2)
    }

    let CLAMP = 500;
    distance.x = clamp(distance.x, -CLAMP, CLAMP);
    distance.y = clamp(distance.y, -CLAMP, CLAMP);
    
    document.querySelector('.terminal').style.transform = `rotateX(${distance.y * 0.002}deg) rotateY(${distance.x * 0.001}deg) rotateZ(${distance.y * 0.0002}deg)`;
}   

function clamp(n, a = 0, b = 1) {
    return Math.min(b, Math.max(n, a));
}