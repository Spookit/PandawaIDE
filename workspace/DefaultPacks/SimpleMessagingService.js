var last = {}; // new hashmap
var messageFormat = '&d&lPM &7[&aYou &8-> &a{player}&7] &e';
var receiveFormat = '&d&lPM &7[&a{player} &8-> &aYou&7] &e';

/*
	Private Message command.
*/
Commands['pm'].also('msg').also('message').executor(function(sender,args) {
	if (args.length > 0) {
		if (args.length > 1) {
			var player = Players[args[0]];
			if (player) {
				var message = args[1];
				for (var i = 2; i < args.length; i++) {
					message += args[i];
				}
				message = tryColor(sender,message);
				sender.sendMessage(color(messageFormat.replace('{player}', player.getName()))+message);
				player.sendMessage(color(receiveFormat.replace('{player}', sender.getName()))+message);
				last[sender.getName()] = player.getName();
				last[player.getName()] = sender.getName();
			} else {
				sender.sendMessage(color('&cPlayer not found!'));
			}
			return;
		}
		sender.sendMessage(color('&cPlease specify the message to be sent to '+args[0]));
		return;
	}
	sender.sendMessage(color('&eSend message privately to a player. Usage: &b/msg <player> <message>'));
}).register(); // don't forget to register it!

/*
	Reply command.
 */

Commands['reply'].also('r').executor(function(sender,args) {
	var lastReply = last[sender.getName()];
	if (lastReply) {
		if (args.length > 0) {
			var player = Players[lastReply];
			if (player) {
				var message = args[0];
				for (var i = 1; i < args.length; i++) {
					message += args[i];
				}
				message = tryColor(sender,message);
				sender.sendMessage(color(messageFormat.replace('{player}', player.getName()))+message);
				player.sendMessage(color(receiveFormat.replace('{player}', sender.getName()))+message);
				last[sender.getName()] = player.getName();
				last[player.getName()] = sender.getName();
			} else {
				sender.sendMessage(color('&c'+lastReply+' is Offline'));
			}
		} else {
			sender.sendMessage(color('&eReply a message to the last person you chat with (Last: '+lastReply+'). Usage: &b/r <message>'));
		}
		return;
	}
	sender.sendMessage(color('&cYou don\'t have anyone to reply!'));
}).register(); //don't forget to register it!

/**
	Return a colored message if sender has permission "message.color"
 */
function tryColor(sender,message) {
	if (sender.hasPermission('message.color')) {
		return color(message);
	} else return message;
}