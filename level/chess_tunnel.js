var leveldata_chess_tunnel = {
  "id" : "CHESS_TUNNEL",
  "title" : "Sakk alagút",
  "theme" : "chess",
  "levelinfo" : "Szedd fel az órákat, és juss el a tábla jobb oldalára!",
  "blocks" : [
	["P_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "F_W"],
	["P_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "F_B"],
	["P_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "F_W"],
	["P_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "F_B"],
  ],
  "start" : [0, 0],
  "enemies" : [
	{
	  "type" : "BASTYA",
	  "score" : 50,
	  "rotationtype" : "FIX",
	  "speed": 2.0,
	  "route" : [ [0, 1], [0, 16]]
	},
	{
	  "type" : "BASTYA",
	  "score" : 50,
	  "rotationtype" : "FIX",
	  "speed": 2.0,
	  "route" : [ [1, 16], [1, 1] ]
	},
	{
	  "type" : "BASTYA",
	  "score" : 50,
	  "rotationtype" : "FIX",
	  "speed": 2.0,
	  "route" : [ [2, 1], [2, 16] ]
	},
	{
	  "type" : "BASTYA",
	  "score" : 50,
	  "rotationtype" : "FIX",
	  "speed": 2.0,
	  "route" : [ [3, 16], [3, 1] ]
	}
  ],
  "food" : [
	{ "type" : "chess_mind",
	  "positions" : [
		[5,0], [13,0],
		[5,3], [13,3],
		[6,0], [14,0],
		[6,3], [14,3]
	  ]
	}
  ],
  "bonus" : [
	{ "type" : "chess_clock_left",
	  "positions" : [
		[9,1]
	  ]
	},
	{ "type" : "chess_clock_right",
	  "positions" : [
		[10,1]
	  ]
	}
  ]
};
