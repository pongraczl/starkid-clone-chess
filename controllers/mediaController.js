let errorCounter = 0;

//animations
let animatePlayer = function(newPos) {
    let animationDuration = animationDuration_Player();
    //console.log ("Hossz: " + animationDuration + " ||| Idő: " + Date.now());
    player.div.animate({
        top : newPos.top,
        left : newPos.left
    }, animationDuration); //, movePlayer(keyOfDirection)
};

let animationDuration_Player = function() {
    return 1000 / ((blockSize / STEP_PLAYER) * player.playerSpeed);
};

let animateEnemy = function(enemy, oldPos, newPos) {
    let distanceInPixel = Math.sqrt(Math.pow(newPos.top - oldPos.top, 2) + Math.pow(newPos.left - oldPos.left,2));
    //console.log ("Distance = " + Math.pow(oldPos.left));
    let speedInPixelPerSecond = enemy.speed * blockSize;
    let animationDuration_Enemy = 1000 * distanceInPixel / speedInPixelPerSecond;
    enemy.div.animate({
        top : newPos.top,
        left : newPos.left
    }, animationDuration_Enemy);
};

//sounds
//music
function sound(src) {       //https://www.w3schools.com/graphics/game_sound.asp
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
}