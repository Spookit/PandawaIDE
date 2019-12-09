function onCommand(sender,args) {
	if (args.length > 0) {
			var msg = args[0];
			// collect message for multiple args like "this is a message"
			for (var i = 1; i < args.length; i++) {
				msg+=' '+args[i];
			}
			// send message to all players
			for (var player in Players) {
				player.sendMessage(color(msg));
			}
			// send message to console as well
			log(color(msg));
			return;
		}
		sender.sendMessage(color('&eBroadcast a message to online players. Usage: &b/broadcast <message>'));
}
// register the command
Commands['broadcast'].alias('bc').alias('me').permission('server.admin').executor(onCommand).register();
