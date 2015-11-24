var harvester = require('harvester');

module.exports.loop = function () {
  var count = {
    worker:0,
    builder:0
  }
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    count[creep.memory.role]++;
  }
  if(count.worker < 5){
    Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE,MOVE], {role:"worker"})
  }
  if(count.builder < 8){
    Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], {role:"builder"})
  }
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'worker') {
      count.worker++;
			harvester(creep);
		}

		if(creep.memory.role == 'builder') {
			if(creep.carry.energy == 0) {
				if(count.worker >= 5 && count.builder >= 8&& Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Game.spawns.Spawn1);
				}
			}
			else {
        if(creep.room.controller) {
          if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
          }
        }
			}
		}
	}
}
