const msgEl = document.getElementById('msg');

const randomNum = getRandomNum();

window.SpeechRecognitionAlternative = window.SpeechRecognitionAlternative || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognitionAlternative



// Write messgae
function writeMsg(msg) {
    msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
    `
}

// Check Num 

function checkNum(msg) {
    const num = +msg;

    // Check if valid number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>';
        return;
    }
    // Num in range
    if (num > 100 || num < 1) {
        msg.innerHTML += '<div>Number must be between 1 and 100</div>'
    }

    // Check num
    if (num === randomNum) {
        document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again" onclick= 'location.reload()'>Play Again</button>
    `;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>Go Lower</div>'
    } else {
        msgEl.innerHTML += '<div>Go Higher</div>'
    }

}
// Start Recognition and game
recognition.start();

// Users Words
function onSpeak(e) {
    const msg = e.results[0][0].transcript
    writeMsg(msg);
    checkNum(msg);
}

// Generate random number
function getRandomNum() {
    return Math.floor(Math.random() * 101)
}
console.log(randomNum);

// Event listener
recognition.addEventListener('result', onSpeak);
// End Event listener

recognition.addEventListener('end', function(params) {
    recognition.start();
});