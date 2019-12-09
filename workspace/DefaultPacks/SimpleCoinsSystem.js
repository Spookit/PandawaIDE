let configFile = Files['userdata.yml'];

let config;
if (configFile.exists()) {
	config = configFile.loadConfig();
} else {
	config = new Yaml();
	configFile.createNewFile(); //create the file
}

Hooks.onDisable(function() {
	configFile.write(config);
});

function getBalance(name) {
	var balance = config.balance[name];
	return balance ? balance : 0; //ternary operator
}

function setBalance(name,value) {
	config.balance[name] = value;
}

function addBalance(name,value) {
	setBalance(name,getBalance(name)+value);
}

function removeBalance(name,value) {
	setBalance(name,getBalance(name)-value);
}
let prefix = color('&6Coins &8- &7');
function oncommand(sx,ar) {
	if (ar.length > 0) {
		let a1 = ar[0];
		if (a1.equalsIgnoreCase('balance') || a1.equalsIgnoreCase('bal')) {
			if (ar.length > 1 && sx.hasPermission('coins.balance.other')) {
				var target = ar[1];
				var balance = getBalance(target);
				sx.sendMessage(prefix+target+' balance: '+balance);
				return;
			}
			var bal = getBalance(sx.getName());
			sx.sendMessage(prefix+sx.getName()+' balance: '+bal);
			return;
		}
		if (a1.equalsIgnoreCase('pay')) {
			if (ar.length > 2) {
				var target = ar[1];
				if (target.equals(sx.getName())) {
					sx.sendMessage(prefix+'You cannot pay yourself!');
					return;
				}
				var amount;
				try {
					amount = parseInt(ar[2]);
				} catch (thrown) {
					sx.sendMessage(prefix+'Please input a number!');
					return;
				}
				var balance = getBalance(sx.getName());
				if (balance < amount) {
					sx.sendMessage(prefix+'You dont have enough money!');
					return;
				}
				removeBalance(sx.getName(),amount);
				addBalance(target,amount);
				sx.sendMessage(prefix+'You paid '+target+' '+amount+' coins');
				var player = Players[target];
				if (player) {
					player.sendMessage(prefix+sx.getName()+' paid you '+amount+' coins!');
				}
				return;
			}
			sx.sendMessage(prefix+'Pay someone. Usage: /coin pay <target> <amount>');
			return;
		}
		if (sx.hasPermission('server.admin')) {
			if (a1.equalsIgnoreCase('set')) {
				if (ar.length > 2) {
					var target = ar[1];
					var amount;
					try {
						amount = parseInt(ar[2]);
					} catch (thrown) {
						sx.sendMessage(prefix+'Please input a number!');
						return;
					}
					setBalance(target,amount);
					sx.sendMessage(prefix+'You set '+target+' coins to '+amount+' coins');
					return;
				}
				sx.sendMessage(prefix+'Set player coin amount. Usage: /coin set <target> <amount>');
				return;
			}
			if (a1.equalsIgnoreCase('add')) {
				if (ar.length > 2) {
					var target = ar[1];
					var amount;
					try {
						amount = parseInt(ar[2]);
					} catch (thrown) {
						sx.sendMessage(prefix+'Please input a number!');
						return;
					}
					addBalance(target,amount);
					sx.sendMessage(prefix+'You set '+target+' coins to '+amount+' coins');
					return;
				}
				sx.sendMessage(prefix+'Set player coin amount. Usage: /coin set <target> <amount>');
				return;
			}
			if (a1.equalsIgnoreCase('remove')) {
				if (ar.length > 2) {
					var target = ar[1];
					var amount;
					try {
						amount = parseInt(ar[2]);
					} catch (thrown) {
						sx.sendMessage(prefix+'Please input a number!');
						return;
					}
					addBalance(target,amount);
					sx.sendMessage(prefix+'You set '+target+' coins to '+amount+' coins');
					return;
				}
				sx.sendMessage(prefix+'Set player coin amount. Usage: /coin set <target> <amount>');
				return;
			}
		}
	}
	if (sx.hasPermission('server.admin')) {
		sx.sendMessage(prefix+'Usage: /coin <balance|pay|set|add|remove>');
	} else {
		sx.sendMessage(prefix+'Usage: /coin <balance|pay>')
	}
}

function tabcomp(sx,ar) {
	if (ar.length == 0) {
		if (sx.hasPermission('server.admin')) {
			return ['balance','pay','set','remove'];
		} else return ['balance','pay'];
	}
}

Commands['coin'].alias('coins').alias('c').executor(oncommand).tabcompleter(tabcomp).register();