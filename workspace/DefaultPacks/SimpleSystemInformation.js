
function cmd(sender,args) {
	for (var file in Files) {
		sender.sendMessage(color('&aFile: &f'+file.getAbsolutePath()));
	}
	for (var world in Worlds) {
		sender.sendMessage(color('&aWorld: &f'+world.getName()));
	}
	for (var plugin in Plugins) {
		sender.sendMessage(color('&aPlugin: &f'+plugin));
	}
	for (var player in Players) {
		sender.sendMessage(color('&aPlayer: &f'+player.getName()));
	}
}

Commands['sysinfo'].executor(cmd).permission('server.admin').register();
Hooks.onDisable(function() {
	log(color('&eSimpleSystemInformation.js has been disabled!'));
});