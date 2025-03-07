(function ($) {

	"use strict";

	if (isExists('#rounded-countdown')) {
		let currentTime = $.now();
		let endTime = new Date('Apr 20, 2025 18:30:00').getTime();
		let remainingMs = endTime - currentTime;
		let remainingSec = Math.floor(remainingMs / 1000);

		$('.countdown').ClassyCountdown({
			theme: "flat-colors-very-wide",
			end: currentTime + remainingSec
		});
	}

})(jQuery);

function isExists(elem) {
	return $(elem).length > 0;
}
$(document).ready(function () {
	$('.footer-icons a').attr({
		'rel': 'noopener noreferrer',
		'target': '_blank'
	});
});