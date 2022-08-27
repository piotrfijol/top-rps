document.addEventListener('mousemove', rotateTerminal);

const terminal = {
    isPrinting: false
}

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

function readInput(ev) {

    if(terminal.isPrinting) {
        return;
    }

    let commandLine = document.querySelector('.terminal .screen .command');
    let char = ev.key;
    let command = commandLine.textContent;
    if(char === 'Enter') {

        let textNode = document.createTextNode('> ' + command);

        commandLine.textContent = '';

        document.querySelector('.instructions').appendChild(document.createElement('br'));
        document.querySelector('.instructions').appendChild(textNode);

        readCommand(command);

        
    } else if(char === 'Backspace') {
        commandLine.textContent = command.slice(0, command.length-1);
        return;
    } else if(char === 'Space') {
        char = ' ';
        commandLine.textContent += char;
    } else if(char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122
    || char.charCodeAt(0) >= 48 && char.charCodeAt(0) < 58) {
        commandLine.textContent += char;
    }

}

document.addEventListener('keydown', readInput);


function readCommand(command) {
    if(command === 'rps') {
        printText(splashScreen);
    }
    
}

function htmlEncode(text) {
    return text
        .replace(/\'/g, '&#39;')
        .replace(/\"/g, '&quot;')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
        .replace(/[ ]/g, '&nbsp;');
}

function printText(text) {

    let textArr = text.split("\n")
    
    terminal.isPrinting = true;
    printLine(textArr.shift());

    function printLine(line) {
        let textOutput = document.querySelector('.terminal .instructions');
        textOutput.innerHTML += htmlEncode(line)+'<br>';

        if(textArr.length !== 0)
            setTimeout(printLine,  Math.floor(Math.random() * 200), textArr.shift());
        else
            terminal.isPrinting = false;
    }
}