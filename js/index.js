var current_tab, next_tab, previous_tab;

function myConfirm(){
    $("#confirm-mySport").html($("#mySport").val());
    $("#confirm-myDate").html($("#myDate").val());
    $("#confirm-myTime").html($("#myTime").val());
    $("#confirm-myTeam").html($("#myTeam").val());
    $("#confirm-myLoc").html($("#myLoc").val());
    $("#confirm-myNotes").html($("#myNotes").val());
    $("#confirm-myName").html($("#myName").val());
    $("#confirm-myPhone").html($("#myPhone").val());
    $("#confirm-myEmail").html($("#myEmail").val());
    $("#confirm-myFB").html($("#myFB").val());
    $("#confirm-myLine").html($("#myLine").val());
    // console.log($("#mySport").val());
}

$(".sports").click(function(){
	// location.replace("./sport.html");
    location.href = "#sport";
	var index = $(".sports").index(this);
	// setTab(index);
});

// function setTab(index){
// 	if(index === 0){
// 		$(".tablinks:first-child").css("background","white");
// 	}
// 	else{
// 		var temp = ".tablinks:nth-child(" + index + ")";
// 		$(temp).css("background", "white");
// 	}
// 	console.log("tab");
// }

$("#sport1").show();
$(".tablinks:first").css("background","white");

$(".tablinks").click(function(){
	$(".tablinks").css("background","#91DBF3");
	$(this).css("background-color", "white");
	var index = $(".tablinks").index(this) + 1;
	var panel = "#sport"+index;
	$(".tabcontent").hide();
	$(panel).show();
});
// CALL AT END
function buildTable(data, id, dataName){
	var allid = 0; // 從0開始，一組資料總共有多少li allid就有多大(-1)
	for(var i = 0; i < data.length; i++){
		var listid = allid;
		var circleStyle = " style='background:";
        var circlesrc = "./photo/";
        var photo = "green.png";
		var status = "JOIN!";
		var circleColor = "#86C166'"; //未約:綠色

        //
		if(data[i].reply > 0){
			circleColor = "#FBE251'"; //洽中:黃色
            photo = "yellow.png";
        }
		
		if(data[i].confirm){
			status = "END!!";
			circleColor = "#ED784A'"; //已約:橘色
            photo = "orange.png";
		}
		listid = listid + dataName;
		circleStyle = circleStyle + circleColor;
        circlesrc = circlesrc + photo;
		var content = "<div class='sportLi' id='" + listid + "'><div class='liCircle'"
		+ circleStyle + "><img src='" + circlesrc + "' style='width:100%'></div><div class='liTeam'>"
		+ data[i].team + "<br>"
		+ data[i].time + "</div><div class='liJoin'>" + status + "</div></div>";

		$(id).append(content);
		allid++;
        console.log(listid);
	}
}
function myinvite(userid, inviteData){
    var allid = 0;
    for(var i = 0; i < inviteData.length; i++){
        var circleStyle = " style='background:";
        var circlesrc = "./photo/";
        var photo = "green.png";
        var status = "CHECK!";
        var circleColor = "#86C166'"; //未約:綠色

        if(inviteData[i].reply > 0){
            circleColor = "#FBE251'"; //洽中:黃色
            photo = "yellow.png";
        }
        
        if(inviteData[i].confirm){
            // status = "END!!";
            circleColor = "#ED784A'"; //已約:橘色
            photo = "orange.png";
        }
        allid = allid + 1;
        circleStyle = circleStyle + circleColor;
        circlesrc = circlesrc + photo;
        var content = "<div class='inviteLi' id=" + allid + " style='padding:1.5vh 30px;'><div class='liCircle'"
        + circleStyle + "><img src='" + circlesrc + "' style='width:100%'></div><div class='liTeam'>"
        + inviteData[i].team + "<br>"
        + inviteData[i].time + "</div><div class='liCheck'>" + status + "</div></div>";

        $("#invite").append(content);
    }
}

var presentData;
$(document).on('click', ".liJoin", function() {
	$("#joinContact").hide();
	$("#joinTable").show();
    var parentid = $(this).closest("div.tabcontent").prop("id");
    var childid  = $(this).closest("div.sportLi").prop("id");

    var data; //find out which dataset this list is in.
    if(parentid === "sport1") data = data1;
    else if(parentid === "sport2") data = data2;
    else if(parentid === "sport3") data = data3;
    else if(parentid === "sport4") data = data4;
    else if(parentid === "sport5") data = data5;
    else data = data6;

    //處理list的id，找到原本屬於的資料，以抓取更多detail
    var index = Math.floor(parseInt(childid) / 10);
    var target = data[index];
    presentData = target;
    console.log(index);

    if(childid)
   		location.href='#joinInfo';
    childid = "#" + childid;

    // 如果這個活動邀請已經結束，則隱藏reply的按紐，並設定circle的顏色
    var circle = $("#joinCircle img"); // 改變左上角的圈圈顏色
    if(target.confirm){
    	$(".joinReply").hide();
    	// $("#joinCircle").css("background","#ED784A"); //已約
        circle.attr("src", "./photo/orange.png");
        console.log("已約");
        console.log(circle);
    }
    else{
    	$(".joinReply").show();
    	if(target.reply > 0){
    		// $("#joinCircle").css("background","#FBE251"); //洽中
            circle.attr("src", "./photo/yellow.png");
            console.log("洽中");
        }
    	else{
    		// $("#joinCircle").css("background","#86C166"); //未約
            circle.attr("src", "./photo/green.png");
            console.log("未約");
        }
    }

    $("#joinTeam").html(target.team);
    $("#joinTime").html("日期/時間:　" + target.time);
    $("#joinPlace").html("  　　 地點:　" + target.place);
    $("#joinRemark").html(" 　　 備註:　" + target.remark);
    $("#joinName").html("姓名: " + target.name);
    $("#joinPhone").html("手機: " + target.phone);
    $("#joinEmail").html("EMAIL: " + target.email);
    $("#joinFB").html("FB: " + target.fb);
    $("#joinLine").html("LINE ID: " + target.line);

    $("#joinComment div").empty();
    $("#joinReplyer div").empty();

    for(var i in target.comment){
    	var date = target.time.split(" ");
    	var content = "<div><div class='joinCommentText'>" + target.comment[i] + "</div><div class='joinCommentTime's>" + date[0] + "</div></div>";
    	$("#joinComment").append(content);
    }
    for(var i in target.replyer){
    	var content = "<div style='margin-top:1.8vh'>" + target.replyer[i] + "</div>";
    	$("#joinReplyer").append(content);
    }
    
});
$(document).on('click', '#reply-yes', function(){
	$("#joinTable").hide();
	$("#joinContact").show();
	// 當#reply-yes送出後，要將此會員的資料送到資料庫
});

$(document).on('click', ".liCheck", function() {
    location.href = "#inviteEvent";
    var index = $(this).closest("div.inviteLi").prop("id");
    var target = userInvitation[index-1];
    var replyerN = target.replyer.length;

    var photo = "./photo/green.png";
    var type  = target.team;
    var time  = target.time;
    var place = target.place;
    var remark= target.remark;

    for(var i = 0; i < replyerN; i++){

    }
    var content = "<p>hello</p>";
    $("#inviterInfo").append(content);
});

// data
var data1 = [{
'team': '台大資管男籃',
'time': '2017/04/20 20:00',
'reply':0,
'place':'台大中央球場',
'remark':'需推派裁判',
'replyer':['師大數學男籃','台大化工男籃','台科大資工男籃'],
'comment':['GOOD GAME!','球品好','準時!'],
'confirm':false,
'name':"王小明",
"phone":"0900-300-050",
"email":"mingming666@gmail.com",
"fb":"Ming Wang",
"line":"mingming666"
},{
'team': '台科大化工男籃',
'time': '2017/12/4 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false,
'name':"陳禹媛",
"phone":"0800-000-000",
"email":"testing@yahoo.com.tw",
"fb":"something like a link or name",
"line":"testing"
},{
'team': '台大資管女籃',
'time': '2017/12/4 12:30',
'reply':3,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false,
'name':"呂承維",
"phone":"0900-000-000",
"email":"testing@gmail.com",
"fb":"something like a link or name",
"line":"yuyuanhey"
},{
'team': '台大化工男籃',
'time': '2017/12/4 12:30',
'reply':4,
'place':'blablabla',
'remark':'none',
'replyer':['台大法律男籃','台大國企男籃'],'comment':['Nice!'],
'confirm':false,
'name':"陳禹媛",
"phone":"0800-000-000",
"email":"testing@yahoo.com.tw",
"fb":"something like a link or name",
"line":"testing"
},{
'team': '師大國文女籃',
'time': '2017/12/4 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':true,
'name':"陳禹媛",
"phone":"0800-000-000",
"email":"testing@yahoo.com.tw",
"fb":"something like a link or name",
"line":"testing"
},{
'team': '台科大數學男籃',
'time': '2017/12/4 12:30',
'reply':4,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':true,
'name':"陳禹媛",
"phone":"0800-000-000",
"email":"testing@yahoo.com.tw",
"fb":"something like a link or name",
"line":"testing"
}
];
var data2 = [{
'team': '台大資管男排',
'time': '2017/12/3 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false,
'name':"呂承維", 
"phone":"0900-000-000",
"email":"testing@gmail.com",
"fb":"something like a link or name",
"line":"yuyuanhey"
},{
'team': '台大資管男排',
'time': '2017/12/4 12:30',
'reply':3,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':true,
'name':"陳禹媛",
"phone":"0800-000-000",
"email":"testing@yahoo.com.tw",
"fb":"something like a link or name",
"line":"testing"
},
];
var data3 = [{
'team': '台大資管系壘',
'time': '2017/12/3 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':true,
'name':"陳禹媛",
"phone":"0800-000-000",
"email":"testing@yahoo.com.tw",
"fb":"something like a link or name",
"line":"testing"
},{
'team': '台大資工系壘',
'time': '2017/12/4 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false,
'name':"呂承維", 
"phone":"0900-000-000",
 "email":"testing@gmail.com",
 "fb":"something like a link or name", 
 "line":"yuyuanhey"
},
];
var data4 = [{
'team': '台大資管系羽',
'time': '2017/12/3 12:30',
'reply':4,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false,
'name':"呂承維",
"phone":"0900-000-000",
"email":"testing@gmail.com",
"fb":"something like a link or name",
"line":"yuyuanhey"
},{
'team': '台大會計系羽',
'time': '2017/12/4 12:30',
'reply':1,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false,
'name':"呂承維",
"phone":"0900-000-000",
"email":"testing@gmail.com",
"fb":"something like a link or name",
"line":"yuyuanhey"
},
];
var data5 = [{
'team': '台大植昆系桌',
'time': '2017/12/3 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':true,
'name':"陳禹媛",
"phone":"0800-000-000",
"email":"testing@yahoo.com.tw",
"fb":"something like a link or name",
"line":"testing"
},{
'team': '台大園藝系桌',
'time': '2017/12/4 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false,
'name':"呂承維",
"phone":"0900-000-000",
"email":"testing@gmail.com",
"fb":"something like a link or name", 
"line":"yuyuanhey"
},
];
var data6 = [{
'team': '台大文院足球隊',
'time': '2017/12/3 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false, 
'name':"呂承維", 
"phone":"0900-000-000", 
"email":"testing@gmail.com",
"fb":"something like a link or name", 
"line":"yuyuanhey"
},{
'team': '台大校隊橄欖球',
'time': '2017/12/4 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false, 
'name':"呂承維", 
"phone":"0900-000-000", 
"email":"testing@gmail.com",
"fb":"something like a link or name",
"line":"yuyuanhey"
},
];
buildTable(data1,'#sport1','1');
buildTable(data2,'#sport2','2');
buildTable(data3,'#sport3','3');
buildTable(data4,'#sport4','4');
buildTable(data5,'#sport5','5');
buildTable(data6,'#sport6','6');

var userInvitation = [{
'team': '男籃',
'time': '2017/12/3 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false, 
'name':"呂承維", 
"phone":"0900-000-000", 
"email":"testing@gmail.com",
"fb":"something like a link or name", 
"line":"yuyuanhey"
},{
'team': '男籃',
'time': '2017/12/4 12:30',
'reply':0,
'place':'blablabla',
'remark':'none',
'replyer':{},'comment':{},
'confirm':false, 
'name':"呂承維", 
"phone":"0900-000-000", 
"email":"testing@gmail.com",
"fb":"something like a link or name",
"line":"yuyuanhey"
},
];

myinvite(1, userInvitation);