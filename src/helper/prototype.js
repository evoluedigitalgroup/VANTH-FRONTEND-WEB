Date.prototype.getWeek = function (dowOffset) {
	dowOffset = typeof dowOffset == "number" ? dowOffset : 0;
	var newYear = new Date(this.getFullYear(), 0, 1);
	var day = newYear.getDay() - dowOffset;
	day = day >= 0 ? day : day + 7;

	var daynum =
		Math.floor(
			(this.getTime() -
				newYear.getTime() -
				(this.getTimezoneOffset() - newYear.getTimezoneOffset()) *
					60000) /
				86400000
		) + 1;
	var weeknum;

	if (day < 4) {
		weeknum = Math.floor((daynum + day - 1) / 7) + 1;
		if (weeknum > 52) {
			let nYear = new Date(this.getFullYear() + 1, 0, 1);
			let nday = nYear.getDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			let weeknum = nday < 4 ? 1 : 53;
		}
	} else {
		weeknum = Math.floor((daynum + day - 1) / 7);
	}
	return weeknum;
};
