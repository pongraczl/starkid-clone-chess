let player_name;
let current_campaign;   //ha null, akkor nem kampány (küldetés) módban vagyunk, hanem szabad játékban
let current_level_count;    //a kampányon belüli sorszám
let current_level_code;     //a pálya kódneve
let current_level;          //a pálya adatainak objektuma
let current_theme;          //a pálya témájának objektuma
let difficulty;
let score;
let scores_of_players = [{
    name : "Pista",
    score : 100
},
    {
        name : "Vera",
        score : 300
    }];
let life;
let death;
let available_campaigns = [
    {
        name : "chess",
        title : "Sakk",
        levels : ["CHESS_TUNNEL", "CHESS_X", "CHESS_WAVES"]
    }
];
let music;

let startGame = function(gameInfo) {
    player_name = gameInfo.player_name ? gameInfo.player_name : "ismeretlen" ;
    //küldetés
    current_campaign = null;
    if (gameInfo.campaign) {
        available_campaigns.forEach(function(campaign){
            if (campaign.name === gameInfo.campaign) {
                current_campaign = campaign;
            }
        });
    }
    current_level_count = 0;
    current_level_code = current_campaign ? current_campaign.levels[0] : gameInfo.level;
    console.log(current_campaign);
    difficulty = gameInfo.difficulty ? gameInfo.difficulty : "IMMORTAL";
    score = {
        previous : 0,
        current : 0,
        penalty : 0,
        total : function() {
            return this.previous + this.current;
        }
    };
    switch (difficulty) {
        case 'IMMORTAL':
            life = null;
            break;
        case 'NORMAL':
            life = 3;
            break;
        case 'ONELIFE':
            life = 1;
            break;
        default:
            life = null;
    }
    death = 0;

    startLevel(current_level_code);
};
let endGame = function() {
    //alert("A játék véget ért");
    /*let newScores = [];
    let currentScore = score.total();
    let currentScoreIn = false;
    scores_of_players.forEach(function (other_score) {
       if (newScores.length <= 10 && !currentScoreIn && currentScore > other_score.score) {
           newScores.push({
               name : player_name,
               score : currentScore
           });
           currentScoreIn = true;
       }
        if (newScores.length <= 10) {
            newScores.push(other_score);
        }
    });
    scores_of_players = newScores;*/
    scores_of_players.push({
        name : player_name,
        score : score.total()
    });
    window.location.replace('index.html?scores=' + util_code_scores(scores_of_players));
};

let campaignFinished = function() {
    //alert('Ügyes vagy, küldetés teljesítve!');
    endGame();
};

let loadLevel = function(current_level_code) {
    current_level = window['leveldata_' + current_level_code.toLowerCase()];
    if (current_level.theme) {
        current_theme = window['theme_' + current_level.theme];
    }
};
let startLevel = function(current_level_code) {
    $("#gameArea").empty();
    loadLevel(current_level_code);
    initBoard(current_level);
    drawInfo();
    //kampány / egypályás kampány
    //módok beállítása
    //billentyűérzékelés aktiválása
    $(window).on('keydown', startPlayer);
    $(window).on('keyup', stopPlayer);
    //ellenségmozgás aktiválása
    startEvents();
    //ha változik a zene, akkor újraindítja
    if (!music || (current_theme.music && current_theme.music!==music.filename)) {
        music = new sound('res/music/' + current_theme.music);
        music.filename = current_theme.music;
        music.play();
    }
};
let endLevel = function() {
    if (score) {
        score.previous += score.current;
        score.current = 0;
    };
    stopEvents();
    $(window).off('keydown');
    $(window).off('keyup');
};

let event_death = function() {
    death++;
    $("#death").text("Halál: " + death);
    if (life) {
        life--;
        if (score) score.current=0;
        $("#health").text(difficulty==="IMMORTAL" ? "" : "Élet: " + life);
        if (life <= 0) {
            //alert('Meghaltál!');
            endGame();
        }
        else startLevel(current_level_code);
    } else {
        startLevel(current_level_code);
    }
};

let level_completed = function() {
    endLevel();
    if (current_campaign) {
        current_level_count++;
        if (current_level_count === current_campaign.levels.length) { //nincs több pálya a küldetésen belül
            campaignFinished();
        } else {
            current_level_code = current_campaign.levels[current_level_count];
            startLevel(current_level_code);
        }
    } else {    //játék vége szabad (egypályás) módban
        endGame();
    }

};

let showInfo = function() {

};

let showPopupInfo = function(title, text, buttonCaption) {

};

let getDifficultyText = function(code) {
    switch (code) {
        case "IMMORTAL": return "HALHATATLAN";
        case "NORMAL" : return "NORMÁL";
        case "ONELIFE" : return "EGY ÉLET";
        default: return "???";
    }
};


let util_code_scores = function(score_list) {
    let text = "";
    score_list.forEach(function(tetel) {
       text += "----" + tetel.name + "---" + tetel.score;
    });
    return text;
};

let util_decode_scores = function(score_list_text) {
    let score_list = [];
    let items = score_list_text.split("----");
    items.forEach(function (items) {
        let data = items.split("---");
        if (data && data[0]) {
            let name = data[0];
            let score = data[1];
            score_list.push({
                name: name,
                score: score
            });
        }
    });
    return score_list;
};