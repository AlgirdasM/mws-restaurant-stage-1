const init = function() {
	if (!navigator.serviceWorker) {
		return;
	}
	// register service worker
	navigator.serviceWorker.register('/sw.js').then(function(reg) {
		//console.log('registered!');
	}).catch(function(err) {
		console.log('Error: ' + err);
	});
};

init();