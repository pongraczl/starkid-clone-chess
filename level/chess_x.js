var leveldata_chess_x = {
  "id" : "CHESS_X",
  "title" : "X tábla",
  "theme" : "chess",
  "levelinfo" : "Szedd fel az órákat, és juss el a tábla jobb oldalára!",
  "blocks" : [
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B"],
	["P_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W"],
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B"],
	["R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W"],
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B"],
	["R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W"],
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B"],
	["R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W"],
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "F_B"]
  ],
  "start" : [0, 1],
  "enemies" : [
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.0,
	  "route" : [ [4, 4], [8, 8], [0, 0]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.0,
	  "route" : [ [0, 8], [8, 0] ]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.0,
	  "route" : [ [0, 4], [4, 0], [8, 4], [4, 0] ]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.0,
	  "route" : [ [8, 4], [4, 8], [0, 4], [4, 8] ]
	}
  ],
  "food" : [
	{ "type" : "chess_mind",
	  "positions" : [
		[0,4], [4,0],
		[8,4], [4,8]
	  ]
	}
  ],
  "bonus" : [
	{ "type" : "chess_clock_left",
	  "positions" : [
		[4,4]
	  ]
	},
	{ "type" : "chess_clock_right",
	  "positions" : [
		[5,4]
	  ]
	}
  ]
};
