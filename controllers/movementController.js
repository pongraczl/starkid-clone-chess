//Billentyűk
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const STEP_PLAYER = blockSize/1;

let gameClock;

let startPlayer = function(event) {
    if (player.div.is(":animated")) return;     //ne halmozza fel a lépéseket (elvész a vezérlés)
    player.isMoving = true;
    let key = event.which;
    switch (key) {
        case KEY_LEFT:
        case KEY_RIGHT:
        case KEY_DOWN:
        case KEY_UP:
            //console.log('START');
            movePlayer(key);
    }
};

let movePlayer = function(key) {
    if (!player.isMoving) return;
    let newPos = {
        top : player.div.position().top,
        left : player.div.position().left
    };
    switch (key) {
        case KEY_LEFT: newPos.left -= STEP_PLAYER; break;
        case KEY_RIGHT: newPos.left += STEP_PLAYER; break;
        case KEY_UP: newPos.top -= STEP_PLAYER; break;
        case KEY_DOWN: newPos.top += STEP_PLAYER; break;
    }

    //megnézi, hogy érvényes-e a lépés
    let validMovement = true;
    if      (newPos.top < 0)    validMovement = false; //pálya teteje
    else if (newPos.left < 0)   validMovement = false; //pálya bal oldala
    else if (newPos.top + blockSize > boardHeight)  validMovement = false; //pálya alja
    else if (newPos.left + blockSize > boardWidth)  validMovement = false; //pálya jobb oldala
    else {  //járható helyre lépett-e a játékos

    }

    if (validMovement) {
        //mozoghat
        animatePlayer(newPos);
        detectCollision();  //megnézi, hogy ütközött-e ellenséggel
        detectFood();       //megnézi, hogy talált-e ételt
        detectBonus();      //megnézi, hogy talált-e bónuszt
    }
};

let stopPlayer = function(event) {
    player.isMoving = false;
    //console.log('STOP');
};

let startEvents = function() {
    gameClock = setInterval(function() {
        moveEnemies();
        detectFood();
        detectBonus();
        if (detectFinish()) {
            level_completed();
        }
    }, 100);
};

let stopEvents = function() {
    clearInterval(gameClock);
};

let moveEnemies = function() {
    enemies.forEach(function(enemy) {
       if (! (enemy.div.is(":animated")) ) {
           let oldPos = {
               top : enemy.div.position().top,
               left : enemy.div.position().left
           };
           enemy.nextSection();     //új szakasz
           //console.log("Enemy a " + enemy.x + " soron megfordul... " + " cél: " + enemy.route[enemy.currentSectionIndex][1] + " //" + Date.now());
           let newPos = {
               top : enemy.route[enemy.currentSectionIndex][0] * blockSize,
               left : enemy.route[enemy.currentSectionIndex][1] * blockSize
           };
           animateEnemy(enemy, oldPos, newPos);     //animáció indítása
       }
    });
    detectCollision();       //ütközésdetektálás
};

let detectCollision = function() {
    let collisionDetected = false;
    let collisionEnemy = null;  //büntetőpont miatt fontos, a többszörös ütközéstől viszont eltekint
    enemies.forEach(function(enemy){    //ellenséggel érintkezik?
        if (isContact(enemy.div, player.div)) {
            collisionDetected = true;
            collisionEnemy = enemy;
        }
    });
    //let safePlace = false;
    //$("#logger").text(JSON.stringify(blocks[0]));
    blocks.forEach(function(blockRow){ //védett mezőn van? --> ekkor mégsincs ütközés
        blockRow.forEach(function(block){
            if (current_theme.blocks[block.type].type==="PROTECTED"
                || current_theme.blocks[block.type].type==="FINISH") {
                if (isContact(player.div, block.div)) {
                    collisionDetected = false;
                    //safePlace = true;
                }
            }
        });
    });
    //if (safePlace) $("#logger").text("SAFE"); else $("#logger").text("dangerous");
    //if (collisionDetected) $("#logger").text("puff"); else $("#logger").text("ok");
    if (collisionDetected) {
        if(collisionEnemy) {
            enemySounds[collisionEnemy.type].play();
        }
        event_death();
        //büntetőpont
        //életvesztés
        //restartGame
    }
};

let detectFood = function() {
    let foodDetected = false;
    let detected_food;
    food.forEach(function(one_food){    //étellel érintkezik?
        if (one_food.div && isContact(one_food.div, player.div)) {
            foodDetected = true;
            detected_food = one_food;
        }
    });
    if (foodDetected && detected_food && detected_food.div) {
        foodCount--;
        score.current += foodValue;

        //removeÉtel
        detected_food.div.css({ display: "hidden"});
        detected_food.div.remove();
        detected_food.div = null;

        foodSounds[detected_food.type].play();
        drawInfo();
    }
};

let detectBonus = function() {
    let bonusDetected = false;
    let detected_bonus;
    bonus.forEach(function(one_bonus){    //bónusszal érintkezik?
        if (one_bonus.div && isContact(one_bonus.div, player.div)) {
            bonusDetected = true;
            detected_bonus = one_bonus;
        }
    });
    if (bonusDetected && detected_bonus && detected_bonus.div) {
        score.current += detected_bonus.value;

        //removeBónusz
        detected_bonus.div.css({ display: "hidden"});
        detected_bonus.div.remove();
        detected_bonus.div = null;

        bonusSounds[detected_bonus.type].play();
        drawInfo();
    }
};

let detectFinish = function() {
    let isCompleted = false;
    if (foodCount <= 0) {
        blocks.forEach(function (blockRow) {  //célban van-e?
            blockRow.forEach(function (block) {
                if (current_theme.blocks[block.type].type === "FINISH") {
                    if (isContact(player.div, block.div)) {
                        isCompleted = true;
                    }
                }
            });
        });
    }
    return isCompleted;
};

//Két elem átfedésben van-e (játékos, ellenség, étel, bónusz, mező [blokk])
let isContact = function(div1, div2) {
    //például div1-enemy/bonus/food, div2-player; vagy fordítva, nem lényeges
    let D1L, D1R, D1T, D1B;     //enemy-left, enemy-right, enemy-top, enemy-bottom
    let D2L, D2R, D2T, D2B;     //másik...
    D1L = div1.position().left+1;
    D1R = D1L + div1.width()-2;
    D1T = div1.position().top+1;
    D1B = D1T + div1.height()-2;
    D2L = div2.position().left+1;
    D2R = D2L + div2.width()-2;
    D2T = div2.position().top+1;
    D2B = D2T + div2.height()-2;
    //if (log) {console.log("D1L="+D1L+"|D1R="+D1R+"|D1T="+D1T+"|D1B="+D1B+"|D2L="+D2L+"|D2R="+D2R+"|D2T="+D2T+"|D2B="+D2B);}
    //érintkezés div1 (E)-hez képest div2 (P) állapotából
    let CONTACT_LEFT = (D2R > D1L) && !(D2L > D1R);
    let CONTACT_RIGHT = (D2L < D1R) && !(D1L > D2R);
    let CONTACT_TOP = (D2B > D1T) && !(D1B < D2T);
    let CONTACT_BOTTOM = (D2T < D1B) && !(D2B < D1T);
    //if (CONTACT_LEFT) $("#LEFT_PUFF").css({'font-weight':'bold', color:'red'}); else $("#LEFT_PUFF").css({'font-weight':'normal', color:'black'});
    //if (CONTACT_RIGHT) $("#RIGHT_PUFF").css({'font-weight':'bold', color:'red'}); else $("#RIGHT_PUFF").css({'font-weight':'normal', color:'black'});
    //if (CONTACT_TOP) $("#TOP_PUFF").css({'font-weight':'bold', color:'red'}); else $("#TOP_PUFF").css({'font-weight':'normal', color:'black'});
    //if (CONTACT_BOTTOM) $("#BOTTOM_PUFF").css({'font-weight':'bold', color:'red'}); else $("#BOTTOM_PUFF").css({'font-weight':'normal', color:'black'});
    //$("#coordP").text("Player Y-top=" + player.div.position().top + "                  width:" + player.div.height());
    //$("#coordE").text("Enemy4 Route=" + enemies[3].route[enemies[3].currentSectionIndex] + ", y-top=" + enemies[3].div.position().top+ "                  height:" + enemies[3].div.height());
    //if (log) { console.log("LEFT: " + CONTACT_LEFT + ", RIGHT: " + CONTACT_RIGHT + ", TOP: " + CONTACT_TOP + ", BOTTOM: " + CONTACT_BOTTOM);}
    if ( (CONTACT_LEFT || CONTACT_RIGHT) && (CONTACT_BOTTOM || CONTACT_TOP)) {
        //console.log("LEFT: " + CONTACT_LEFT + ", RIGHT: " + CONTACT_RIGHT + ", TOP: " + CONTACT_TOP + ", BOTTOM: " + CONTACT_BOTTOM);
        //console.log("D1L="+D1L+"|D1R="+D1R+"|D1T="+D1T+"|D1B="+D1B+"|D2L="+D2L+"|D2R="+D2R+"|D2T="+D2T+"|D2B="+D2B);
        return true;
    } else {
        return false;
    }

};