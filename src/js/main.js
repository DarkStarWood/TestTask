$(document).ready(function(){
var CUR_ID = $(".dropbtn").text();
var names = ['ETH', 'LTC', 'BTC'];
var fullNames = ['ethereum', 'litecoin', 'bitcoin'];
for (i = 0; i < 3; i++) {
	getData(names[i], CUR_ID, fullNames[i]);
}
$(".dropdown-content a").click(function() {
	id = $(".dropbtn").text();
	id_2 = $(this).text();
	$(".dropbtn").text(id_2);
	$(this).text(id);
	CUR_ID = id_2;
	for (i = 0; i < 3; i++) {
		getData(names[i], CUR_ID, fullNames[i]);
	}
});
$(".chk").click(function() {
	for (i = 0; i < 3; i++) {
		getData(names[i], CUR_ID, fullNames[i]);
	}
});

function getData(name, id, fullNames) {
	$.getJSON("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + name + id, function(data) {
		$("." + fullNames + " .val_price").text(data.ask);
		if (!$("." + fullNames + " .chk").prop("checked")) {
			$("." + fullNames + " .val_hour").text(data.changes.price.hour);
			$("." + fullNames + " .val_day").text(data.changes.price.day);
			$("." + fullNames + " .val_week").text(data.changes.price.week);
			$("." + fullNames + " .val_month").text(data.changes.price.month);
		} else {
			$("." + fullNames + " .val_hour").text(data.changes.percent.hour);
			$("." + fullNames + " .val_day").text(data.changes.percent.day);
			$("." + fullNames + " .val_week").text(data.changes.percent.week);
			$("." + fullNames + " .val_month").text(data.changes.percent.month);
		}
		$("." + fullNames + " .value").each(function() {
			if ($(this).text() < 0) {
				$(this).addClass("red");
			} else {
				$(this).removeClass("red");
			}
		});
	});
}
});