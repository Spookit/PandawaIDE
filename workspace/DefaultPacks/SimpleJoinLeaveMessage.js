function onJoin(event) {
	event.setJoinMessage(color('&a&l> &7')+event.getPlayer().getDisplayName());
}

function onLeave(event) {
	event.setQuitMessage(color('&c&l< &7')+event.getPlayer().getDisplayName());
}

Events['player.PlayerJoinEvent'].listen(onJoin);
Events['player.PlayerQuitEvent'].listen(onLeave);