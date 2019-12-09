let gui = new GUI('Actions', 27);

gui[10] = Items.APPLE.display(color('&aHeal')).executor(function(event) {
	event.getWhoClicked().performCommand('/heal');
});
gui[12] = Items.POTION.display(color('&dNausea')).lore(color('&7Gives you confusion effect'),color('&7for 20 seconds.')).executor(function(event) {
	Potions.CONFUSION.duration(seconds(20)).amplifier(2).apply(event.getWhoClicked());
});
gui[16] = Items.BARRIER.display(color('&cDisconnect')).lore(color('&7get out from this server.')).executor(function(event) {
	event.getWhoClicked().kickPlayer('Disconnected');
});

function cmd(sender,args) {
	if (isPlayer(sender)) {
		sender.sendMessage(color('&eOpening GUI...'));
		gui.open(sender);
	} else sender.sendMessage(color('&cThis command is only for players!'));
}

Commands['guitest'].permission('server.tester').executor(cmd).register();