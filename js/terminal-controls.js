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
    
    document.querySelector('.terminal').style.transform = `rotateX(${-distance.y * 0.004}deg) rotateY(${distance.x * 0.002}deg) rotateZ(${distance.y *distance.x * 0.000001}deg)`;
}   

function clamp(n, a = 0, b = 1) {
    return Math.min(b, Math.max(n, a));
}

function readInput(ev) {

    if(terminal.isPrinting) {
        return;
    }

    let commandLine = document.querySelector('.terminal .screen .command');
    let key = ev.key;
    let command = commandLine.textContent;
    if(key === 'Enter') {
        commandLine.textContent = '';

        printText('> ' + command);
        if(terminal.eventAwait) {
            terminal.eventAwait.next();
        }

        if(terminal.status === FREE)
            readCommand(command);

        terminal.input = '';
        
    } else if(key === 'Backspace') {
        commandLine.textContent = command.slice(0, command.length-1);
        terminal.input = terminal.input.slice(0, terminal.input.length-1);
        return;
    } else if(key === 'Space') {
        key = ' ';
        commandLine.textContent += key;
    } else if(key.charCodeAt(0) >= 97 && key.charCodeAt(0) <= 122
    || key.charCodeAt(0) >= 48 && key.charCodeAt(0) < 58) {
        commandLine.textContent += key;
        terminal.input += key;
    }

}

document.addEventListener('keydown', readInput);

function readLine() {}

function readCommand(command) {
    if(command === 'rps') {
        terminal.status = PROGRAM;
        printText(splashScreen, playGame);
    }
    
}

function htmlEncode(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/\'/g, '&#39;')
        .replace(/\"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
        .replace(/[ ]/g, '&nbsp;');
}

function printText(text, callback) {

    let textArr = text.split("\n")
    
    terminal.isPrinting = true;
    printLine(textArr.shift());


    function printLine(line) {
        let textOutput = document.querySelector('.terminal .instructions');
        let textOutputStyles = getComputedStyle(textOutput);
        
        if(parseInt(textOutputStyles.marginTop) + parseInt(textOutputStyles.height) + parseInt(textOutputStyles.lineHeight) > 450) {
            textOutput.style.marginTop = (parseInt(textOutputStyles.marginTop)-parseInt(textOutputStyles.lineHeight))+'px';
        }
        textOutput.innerHTML += htmlEncode(line)+'<br>';

        if(textArr.length !== 0)
            setTimeout(printLine,  Math.floor(Math.random() * 200), textArr.shift());
        else {
            terminal.isPrinting = false;

            if(callback !== undefined)
                callback();
        }
    }
}