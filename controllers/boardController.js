let blocks = [];
let player;
let enemies = [];
let enemySounds;
let food = [];
let foodCount = 0;
let foodValue = 50;
let foodSounds;
let bonus = [];
let bonusSounds;

let blockSize = 30;
let blockX, blockY;

let boardWidth, boardHeight;

let initBoard = function(levelBase) {
    //blocks (fields)
    blocks = [];
    levelBase.blocks.forEach(function(row){
        let blockRow = [];
        row.forEach(function(col){
            let block = {
                type : col,
                div : null
            };
            blockRow.push(block);
        });
        blocks.push(blockRow);
    });

    //board data
    blockY = blocks.length;
    blockX = blocks[0].length;
    boardWidth = blockX*blockSize;
    boardHeight = blockY*blockSize;
    $("#gameArea").width(boardWidth);
    $("#gameArea").height(boardHeight);
    if (current_theme && current_theme.background) {
        $("#gameArea").text(current_theme.background);
        $("body").css("background-image", 'url("' + 'res/background/' + current_theme.background + '"');
    }

    //Player
    player = {
        position : {
            x: levelBase.start[0],
            y: levelBase.start[1]
        },
        div : null,
        playerSpeed : 8,     //  blokk/másodperc
        isMoving : false
    };

    //Food
    food = [];
    foodCount = 0;
    if (levelBase.food) {
        levelBase.food.forEach(function(foodType) {
            foodType.positions.forEach(function(currentFood){
                food.push({
                    type : foodType.type,
                    x : currentFood[0],
                    y : currentFood[1],
                    div : null
                });
                foodCount++;
            });
        });
    }
    //ételek hangjai
    foodSounds = {};
    Object.keys(current_theme.food.sounds).forEach(function(foodType) {
        let src = current_theme.food.sounds[foodType];
        foodSounds[foodType] = new sound('res/sound/' + src);
    });

    //Bonus
    bonus = [];
    if (levelBase.bonus) {
        levelBase.bonus.forEach(function(bonusType) {
            bonusType.positions.forEach(function(currentBonus){
                bonus.push({
                    type : bonusType.type,
                    value : current_theme.bonus.values[bonusType.type],
                    x : currentBonus[0],
                    y : currentBonus[1],
                    div : null
                });
            });
        });
    }
    //bónuszok hangjai
    bonusSounds = {};
    Object.keys(current_theme.bonus.sounds).forEach(function(bonusType) {
        let src = current_theme.bonus.sounds[bonusType];
        bonusSounds[bonusType] = new sound('res/sound/' + src);
    });

    //Enemies
    enemies = [];
    if (levelBase.enemies) {
        levelBase.enemies.forEach(function(currentEnemy){
            enemies.push({
                type : currentEnemy.type,
                score : currentEnemy.score,
                rotationtype : currentEnemy.rotationtype,
                speed : currentEnemy.speed,
                route : currentEnemy.route,
                currentSectionIndex : 0,    //which index of the route the enemy is on
                //currentSectionPercent : 0.0,  //how much of the current section is already done
                nextSection : function() {
                  this.currentSectionIndex++;
                  if (this.currentSectionIndex >= this.route.length) {
                      this.currentSectionIndex = 0;
                  }
                },
                div : null
            });
        });
    }
    //ellenséggel való ütközés hangjai
    enemySounds = {};
    console.log(JSON.stringify(current_theme.enemies.sounds));
    console.log(Object.keys(current_theme.enemies.sounds));
    Object.keys(current_theme.enemies.sounds).forEach(function(enemyType) {
        let src = current_theme.enemies.sounds[enemyType];
        console.log(enemyType);
        enemySounds[enemyType] = new sound('res/sound/' + src);
    });
    /*enemies.forEach(function(enemy) {
        console.log("Enemy a " + enemy.x + " soron, útvonal: " + enemy.route);
    });*/


    drawBoard();
    drawFoodAndBonus();
    drawEnemies();
    drawPlayer();
    console.log("BLOCK: " + JSON.stringify(blocks[0][0]));
};


let drawBoard = function() {
  for(let y = 0; y < blockY; y++) {
      for (let x = 0; x < blockX; x++) {
          drawBlock(x, y);
      }
  }
};

let drawBlock = function(x, y) {
    let blockType = blocks[y][x].type;
    let blockStyle = current_theme.blocks[blockType];
    console.log(blockType);
    let blockDiv = $('<div></div>');
    let blockBorder = (blockStyle.border) ? ("2px solid " + blockStyle.border) : "none";
    let borderSize = (blockStyle.border) ? 2 : 0;
        blockDiv.css({
        width : blockSize - borderSize,
        height : blockSize - borderSize,
        top : y * blockSize - borderSize/2,
        left : x * blockSize - borderSize/2,
        position: "absolute",
        border : blockBorder
    });
    blockDiv.css("background-color", blockStyle.background);
    blockDiv.addClass("block");
    blockDiv.addClass(blockType);
    blockDiv.addClass(blockStyle.type);
    blockDiv.appendTo("#gameArea");
    if (blockStyle.fog) {
        let blockFog = $('<div></div>');
        blockFog.css({
            width : blockSize,
            height : blockSize,
            top : y * blockSize,
            left : x * blockSize,
            position: "absolute",
            opacity : 0.5
        });
        blockFog.css("background-color", blockStyle.fog);
        blockFog.appendTo("#gameArea");
    }
    blocks[y][x].div = blockDiv;
    //console.log("" + x + "/" + y + ": " + block.background);
};

let drawPlayer = function() {
    player.div = $('<img src="res/elements/' + current_theme["player-picture"] + '" id="frog" />');
    player.div.css({
        width : blockSize,
        height : blockSize, //ehelyett a kép eredeti méretéből arányosítani a szélesség szerint!
        top : (player.position.y + 0) * blockSize,      // getCoordinateY(player.position.y) - this.height + blockSize / 2,
        left : (player.position.x + 0) * blockSize,     //getCoordinateX(player.position.x) - blockSize/2,
        position: "absolute"
    });
    player.div.appendTo('#gameArea');
};

let drawFoodAndBonus = function() {
    food.forEach(function(currentFood){
        let foodPic = current_theme.food.pictures[currentFood.type];
        currentFood.div = $('<img src="res/elements/' + foodPic + '"/>');
        currentFood.div.css({
            width : blockSize,
            height : blockSize, //ehelyett a kép eredeti méretéből arányosítani a szélesség szerint!
            top : (currentFood.y + 0)* blockSize,
            left : (currentFood.x + 0) * blockSize,
            position: "absolute"
        });
        currentFood.div.addClass("food");
        //currentFood.div.addClass(currentFood.type);
        currentFood.div.appendTo('#gameArea');
    });
    bonus.forEach(function(currentBonus){
        let bonusPic = current_theme.bonus.pictures[currentBonus.type];
        currentBonus.div = $('<img src="res/elements/' + bonusPic + '"/>');
        currentBonus.div.css({
            width : blockSize,
            height : blockSize, //ehelyett a kép eredeti méretéből arányosítani a szélesség szerint!
            top : (currentBonus.y + 0)* blockSize,
            left : (currentBonus.x + 0) * blockSize,
            position: "absolute"
        });
        currentBonus.div.addClass("bonus");
        //currentFood.div.addClass(currentFood.type);
        currentBonus.div.appendTo('#gameArea');
    });

};

let drawEnemies = function() {
    enemies.forEach(function(currentEnemy){
        let enemyPic = current_theme.enemies.pictures[currentEnemy.type];
        currentEnemy.div = $('<img src="res/elements/' + enemyPic + '"/>');
        currentEnemy.div.css({
            width : blockSize,
            height : blockSize, //ehelyett a kép eredeti méretéből arányosítani a szélesség szerint!
            top : (currentEnemy.route[0][0] + 0)* blockSize,
            left : (currentEnemy.route[0][1] + 0) * blockSize,
            position: "absolute"
        });
        currentEnemy.div.addClass("enemy");
        //currentFood.div.addClass(currentFood.type);
        currentEnemy.div.appendTo('#gameArea');
    });
};

let drawInfo = function() {
    $("#player").text("Név: " + player_name);
    $("#health").text(difficulty==="IMMORTAL" ? "" : "Élet: " + life);
    $("#death").text("Halál: " + death);
    $("#campaign").text(current_campaign ? "Küldetés: " + current_campaign.title : "Szabad játék");
    $("#level").text("Pálya: " + current_level.title);
    $("#difficulty").text("Nehézség: " + getDifficultyText(difficulty));
    $("#score").text(current_campaign ? ("Pontszám: " + score.total()) : "");
    $("#food").text("Ételek: " + foodCount);
};

//The blockPosition of the first block is 0. It is the middle (half) of that block.
let getCoordinateX = function(blockPositionX) {
  return (blockPositionX + 0.5) * blockSize;
};
let getCoordinateY = function(blockPositionY) {
    return (blockPositionY + 0.5) * blockSize;
};
let getWidth = function(originalWidth, originalHeight) {
    return blockSize/2;
};
let getHeight = function(originalWidth, originalHeight) {
    return blockSize;
};