var theme_chess = {
  "background" : "checkmate.jpg",
  "music" : "K_365_Mozart_Concerto_for_Two_Pianos_in_E-flat_major_III_Rondeau_Allegro.mp3",
  "player-picture" : "chess_white_rook.png",
  "enemies": {
    "pictures" : {
	"BASTYA" : "chess_black_rook.png",
	"FUTO" : "chess_black_bishop.png"
    },
    "sounds" : {
	"BASTYA" : "chess_knock.mp3",
	"FUTO" : "chess_knock.mp3"
    }
  },
  "food" : {
    "pictures" : {
	"chess_mind"  : "chess_mind.png"
    },
    "sounds" : {
	"chess_mind"  : "chess_yes.mp3"
    }
  },
  "bonus" : {
    "values" : {
	"chess_clock_left"  : 111,
	"chess_clock_right" : 111,
    },
    "pictures" : {
	"chess_clock_left"  : "chess_clock_left.png",
	"chess_clock_right" : "chess_clock_right.png",
    },
    "sounds" : {
	"chess_clock_left"  : "chess_clock_ticking.mp3",
	"chess_clock_right" : "chess_clock_ticking.mp3",
    }
  },
  "blocks" : {
	"R_B" : {
	  "type" : "ROAD",
	  "source" : null,
	  "background" : "#101010"
	},
	"R_W" : {
	  "type" : "ROAD",
	  "source" : null,
	  "background" : "#f8f8f8"
	},
	"P_B" : {
	  "type" : "PROTECTED",
	  "source" : null,
	  "background" : "#101010",
	  "fog" : "#009205"
	},
	"P_W" : {
	  "type" : "PROTECTED",
	  "source" : null,
	  "background" : "#f8f8f8",
	  "fog" : "#009205"
	},
	"F_B" : {
	  "type" : "FINISH",
	  "source" : null,
	  "background" : "#101010",
	  "fog" : "#009205",
	  "border" : "#ff0000"
	},
	"F_W" : {
	  "type" : "FINISH",
	  "source" : null,
	  "background" : "#f8f8f8",
	  "fog" : "#009205",
	  "border" : "#ff0000"
	}	
  }

}
