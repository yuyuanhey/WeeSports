var current_tab, next_tab, previous_tab;
$(".sports").click(function(){
	location.replace("./sport.html");
	// location.href='./sport.html';
	console.log("hi");
	var index = $(".sports").index(this);
	
	var select = ":nth-child(" + index + ")";
	$(".tablinks"+select).css("background","white");
	index = index + 1;
	current_tab = "sport"+index;
});
$("#sport1").show();
$(".tablinks:first").css("background","white");
$(".tablinks").click(function(){
	$(".tablinks").css("background","#91DBF3");
	$(this).css("background-color", "white");
	var index = $(".tablinks").index(this) + 1;
	var panel = "#sport"+index;
	$(".tabcontent").hide();
	$(panel).show();
	// console.log(current_tab);
	// console.log(next_tab);
	// console.log(previous_tab);
	// console.log(panel);
	// var str = $(this).text();
	// console.log(str);
	// console.log(index);
});

// data
var data1 = [{
'name': '台大資管男籃',
'time': '2017/12/3 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},
},{
'name': '台大資管男籃',
'time': '2017/12/4 12:30'
},
];
var data2 = [{
'name': '台大資管男排',
'time': '2017/12/3 12:30'
},{
'name': '台大資管男排',
'time': '2017/12/4 12:30'
},
];

function buildTable(){
	for(var i = 0; i < data1.length; i++){
		var content = "<div style='border:solid 1px black'>"
					+ data1[i].name + "<br>"
					+ data1[i].time + "</div>";
		$("#sport1").append(content);
	}
	for(var i = 0; i < data2.length; i++){
		var content = "<div style='border:solid 1px black'>"
					+ data2[i].name + "<br>"
					+ data2[i].time + "</div>";
		$("#sport2").append(content);
	}
}
buildTable();

$(".tabcontent div").click(function(){
	$(".tabcontent div").css("background", "none");
	$(this).css("background", "white");
});