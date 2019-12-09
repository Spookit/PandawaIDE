function cmd(sender,args) {
	if (isPlayer(sender)) {
		if (args.length > 0) {
			let entity = Entities[args[0]];
			if (entity) {
				entity.spawn(sender.getLocation());
				sender.sendMessage(color('&aSpawned a '+entity));
				return;
			}
			sender.sendMessage(color('&cThere is no entity type '+args[0]));
			return;
		}
		sender.sendMessage(color('&eSpawn an entity. Usage: &b/mob <mobType>'));
	} else sender.sendMessage(color('&cYou must be a player to do this!'));
}

Commands['mob'].alias('mobs').also('entity').also('entities').also('spawnmob').executor(cmd).register();