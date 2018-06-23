// This hack will compensate mobile control section
// vh works on desktop version fine

const element = document.getElementById('map');

let size = function() {
	return window.innerHeight;
};

const vpHack = function(size, element) {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		// map height calculation - get vh and extract header, filter-section and scroll-down
		element.style.height = `${size - 100 - 110 - 40}px`;
		element.style.transition = '0.5s';
	}
};

// listen for orientation change
window.addEventListener('orientationchange', function() {
	window.setTimeout(function() {
		vpHack(size(), element);
	}, 200);

});

vpHack(size(), element);