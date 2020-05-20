var leveldata_chess_waves = {
  "id" : "CHESS_WAVES",
  "title" : "Hullámok",
  "theme" : "chess",
  "levelinfo" : "Szedd fel az órákat, és juss el a tábla jobb oldalára!",
  "blocks" : [
	["P_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "P_W"],
	["P_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "P_B"],
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W"],
	["R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B"],
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W"],
	["R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "F_W", "F_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B"],
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "F_B", "F_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W"],
	["R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B"],
	["R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W"],
	["R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B"],
	["P_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "P_W"],
	["P_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "R_B", "R_W", "P_B"]
  ],
  "start" : [0, 1],
  "enemies" : [
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.1,
	  "route" : [ [0, 16], [11, 4]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.2,
	  "route" : [ [0, 15], [11, 3]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.3,
	  "route" : [ [0, 14], [11, 2]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.4,
	  "route" : [ [0, 13], [11, 1]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.5,
	  "route" : [ [0, 12], [11, 0]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 3.9,
	  "route" : [ [0, 11], [10, 0]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.0,
	  "route" : [ [0, 10], [9, 0]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.0,
	  "route" : [ [2, 17], [11, 8]]
	},
	{
	  "type" : "FUTO",
	  "score" : 60,
	  "rotationtype" : "FIX",
	  "speed": 4.0,
	  "route" : [ [5, 17], [11, 11]]
	},
	{
	  "type" : "BASTYA",
	  "score" : 50,
	  "rotationtype" : "FIX",
	  "speed": 2.0,
	  "route" : [ [0, 1], [11, 1], [11, 16], [0, 16]]
	}
  ],
  "food" : [
	{ "type" : "chess_mind",
	  "positions" : [
		[0,4], [4,0],
		[8,4], [4,8],
		[11,9], [13,6],
		[14, 11], [16, 0]
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
