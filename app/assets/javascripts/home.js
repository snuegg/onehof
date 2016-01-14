/************************ kind 저장 *****************************/
var kind_id = 1;
function initKind(_kind_id){
	kind_id = _kind_id;
}

/************************ Host(Org) 선택, 전달 구조 *****************************/
var gorgNames = new Array();
var gorgCnt = 0;

var orgNames = new Array();
var orgTags = new Array();
var orgCnt = 0;
var orgCntMax = 0;

function initOrgs(p_orgCntMax){
	// 최대 선택수 지정
	orgCntMax = p_orgCntMax;
	// 초기화
	orgCnt = gorgCnt;
	for(i=0;i<orgCnt;i++)	orgTags[i] = null;
	for(i=0;i<orgCnt;i++)	orgNames[i] = gorgNames[i];
	$("#hostTagContainer").empty();
	// 객체 재생성
	for(i=0;i<orgCnt;i++)	makeOrgTag(i, orgNames[i]);
}

function commitOrgs(){
	// global값으로 배포
	gorgCnt = orgCnt;
	for(i=0;i<orgCnt;i++)	gorgNames[i] = orgNames[i];
	$("#hostResult").text("");
	first = 0;
	for(i=0;i<orgCnt;i++){
		if(first == 0){
			first = 1;
			$("#hostResult").text($("#hostResult").text() + orgNames[i]);
		}
		else{
			$("#hostResult").text($("#hostResult").text() + ",  " + orgNames[i]);
		}
	}
}

function addOrg(name){
	if(orgCntMax > 0 && orgCntMax<=orgCnt){
		alert("최대 " + orgCntMax + "개만 선택할 수 있습니다.");
	}else{
		makeOrgTag(orgCnt, name);
		orgCnt++;
	}
}

function makeOrgTag(index, name){
	var tag;
	

	tag = document.createElement('div');
	tag.style.minWidth="50px";
	tag.style.height="20px";
	tag.style.background="#AAA";
	tag.style.color="#FFF";
	tag.style.display="inline-block";
	tag.style.margin="2px";
	tag.style.cursor="pointer";
	tag.style.textAlign="center";
	tag.style.borderRadius="2px";
	$(tag).text(name);
	$(tag).click(function(){
		removeOrgTag(index);
	});


	orgTags[index] = tag;
	orgNames[index] = name;
	$("#hostTagContainer").append(orgTags[index]);
}

function removeOrgTag(index){
	orgTags[index].remove();
	orgTags[index] = null;
	for(i=index;i<orgCnt-1;i++){
		orgTags[i] = orgTags[i+1];
		orgNames[i] = orgNames[i+1];
	}
	
	orgCnt--;
}


/************************ Place 선택, 전달 구조 *****************************/

var placeNum = 4;
var placeName = ["", "관악", "신촌", "홍대", "대학로"];
var gplaceSelected = new Array();
for(i=1;i<=placeNum;i++)	gplaceSelected[i] = 0; // global initialzation

var placeSelected = new Array();
var placeTags = new Array();
var placeSelectMax = 0;

function initPlaces(p_placeSelectMax){
	// 최대 선택 수 지정
	placeSelectMax = p_placeSelectMax;
	// 초기화
	for(i=1;i<=placeNum;i++)	placeSelected[i] = gplaceSelected[i];
	for(i=1;i<=placeNum;i++)	placeTags[i] = null;
	$("#placeTagContainer").empty();
	// 객체 재생성
	for(i=1;i<=placeNum;i++)	displayPlace(i);
}

function commitPlaces(){
	// global값으로 배포
	for(i=1;i<=placeNum;i++)	gplaceSelected[i] = placeSelected[i];
	$("#placeResult").text("");
	first = 0;
	for(i=1;i<=placeNum;i++)
	if(gplaceSelected[i] == 1){
		if(first == 0){
			first = 1;
			$("#placeResult").text($("#placeResult").text() + placeName[i]);
		}
		else{
			$("#placeResult").text($("#placeResult").text() + ",  " + placeName[i]);
		}
	}
}

function togglePlace(index){
	placeSelected[index] = 1 - placeSelected[index];
	// 개수 점검
	var cnt = 0;
	for(i=1;i<=placeNum;i++)
		if(placeSelected[i] == 1)	cnt++;
	
	if(placeSelectMax > 0 && placeSelectMax < cnt){
		alert("최대 " + placeSelectMax + "개만 선택할 수 있습니다.");
		placeSelected[index] = 0;
	}else{
		displayPlace(index);
	}
}

function makePlaceTag(index){
	var tag;
	
	tag = document.createElement('div');
	tag.style.minWidth="50px";
	tag.style.height="20px";
	tag.style.background="#AAA";
	tag.style.color="#FFF";
	tag.style.display="inline-block";
	tag.style.margin="2px";
	tag.style.cursor="pointer";
	tag.style.textAlign="center";
	tag.style.borderRadius="2px";
	$(tag).text(placeName[index]);
	$(tag).click(function(){
		removePlaceTag(index);
	});

	placeTags[index] = tag;
	$("#placeTagContainer").append(placeTags[index]);
}

function removePlaceTag(index){
	placeSelected[index] = 0;
	placeTags[index].remove();
	placeTags[index] = null;
}

function displayPlace(index){
	// 플레이스의 선택상황에 맞는 그래픽 효과 제공

	if(placeSelected[index] == 0 && $("#placeTagContainer").find(placeTags[index]).length > 0){
		// 선택이 해제됬는데 객체를 가지고 있다면
		// 객체를 제거해준다.
		removePlaceTag(index);
	}

	if(placeSelected[index] == 1 && $("#placeTagContainer").find(placeTags[index]).length == 0){
		// 석택됬는데 객체를 가지고 있지 않다면
		// 객체를 추가해준다.
		makePlaceTag(index);
	}

}
/************************ 시간 *****************************/
var gselectedTime;
var gtimeNum = 0;
var timeNumMax = 0;
function initTimes(p_timeNumMax){
	timeNumMax = p_timeNumMax;
	$('#datepicker2').multiDatesPicker('resetDates');
	if(gtimeNum > 0)	$('#datepicker2').multiDatesPicker({addDates: gselectedTime});
}

$(document).ready(
	function(){
		$('#timebutton').click(function(){
			initTimes(-1);
		});
		$('#save-time').click(function(){
			gselectedTime = null;
			gselectedTime = $('#datepicker2').multiDatesPicker('getDates',"object");
			gtimeNum = gselectedTime.length;
			// 출력 지정
			$('#timeResult').empty();
			var first = 0;
			for(var i=0;i<gtimeNum;i++){
				var time = (gselectedTime[i].getMonth()+1)+'/'+gselectedTime[i].getDate();
				if(first == 0){
					first = 1;
					$("#timeResult").text($("#timeResult").text() + time);
				}
				else{
					$("#timeResult").text($("#timeResult").text() + ",  " + time);
				}
			}
			
			//search();
		});

		$('#clear').click(function(){
			$('#datepicker2').multiDatesPicker('resetDates');
		});
		$('#Close-time').click(function(){
		});
	}
	);
	
/************************ 글쓰기 업로드 *****************************/
var uploading = 0;
var ret_url = "";

function regist(_url, _ret_url){
	// check uploading
	if(uploading == 1){
		alert("업로드 중입니다.");
		return;
	}else{
		uploading = 1;
	}
	
	// return address
	ret_url = _ret_url;

	// kind
	var kind_id = 1;
	if($("#kind").val() == "일일호프")	 kind_id = 1;
	if($("#kind").val() == "주점")	 kind_id = 2;
	if($("#kind").val() == "공연")	 kind_id = 3;
	if($("#kind").val() == "축제")	 kind_id = 4;

	// loc
	var loc_id = 1;
	for(i=1;i<=placeNum;i++)
	if(placeSelected[i] == 1)
		loc_id = i;
	
	// org
	var org = gorgNames[0];

	// pw, owner, title, contents, summary
	var pw = $("#pw").val();
	var owner = $("#owner").val();
	var title = $("#title").val();
	var contents = $("#contents").val();
	var summary = $("#summary").val();
	
	// submit
	$.ajax({
		type : "POST",
		dataType : "html",
		url : _url,
		data : "kind_id=" + kind_id
		+ "&loc_id=" + loc_id
		+ "&owner=" + owner
		+ "&pw=" + pw
		+ "&org=" + org
		+ "&title=" + title
		+ "&contents=" + contents
		+ "&summary=" + summary
		+ "&st_date=" + "2010-06-09"
		+ "&ed_date=" + "2020-06-09"
		+ "&st_time=" + "23:00:00"
		+ "&ed_time=" + "23:00:00"
		,
		success : regist_success,
		error : errorNotice
	});
}

function regist_success(_data){
	if(_data[0] == '1'){
		alert("글 등록에 성공했습니다.")
		location.href=ret_url;
	}else{
		alert("글 등록에 실패했습니다.")
	}
	uploading = 0;
}

function search(){
	// orgs
	var orgs = "";
	first = 0;
	for(i=0;i<orgCnt;i++){
		if(first == 0){
			first = 1;
			orgs = orgs + orgNames[i];
		}
		else{
			orgs = orgs + ";" + orgNames[i];
		}
	}
	
	// locs
	var locs = "";
	first = 0;
	for(i=1;i<=placeNum;i++)
		if(gplaceSelected[i] == 1){
			if(first == 0){
				first = 1;
				locs = locs + i;
			}
			else{
				locs = locs + ";" + i;
			}
		}

	
	$.ajax({
		type : "GET",
		dataType : "html",
		url : "events",
		data : "kind_id=" + kind_id
		+ "&orgs=" + orgs
		+ "&locs=" + locs
		+ "&dates=" + "",
		success : search_success,
		error : errorNotice
	});
}

function search_success(_data){
	$("#resultDiv").empty();
	$("#resultDiv").append(_data);
}

function getCertList(){
	$.ajax({
		type : "GET",
		dataType : "html",
		url : "events/cert",
		data : "&cert=" + "N",
		success : search_success,
		error : errorNotice
	});
}

function cert(_id, cert){
	$.ajax({
		type : "GET",
		dataType : "html",
		url : "events/cert/"+_id,
		data : "&cert=" + cert,
		success : cert_success,
		error : errorNotice
	});
}

function del(_id){
	$.ajax({
		type : "DELETE",
		dataType : "html",
		url : "event/admin/"+_id,
		success : del_success,
		error : errorNotice
	});
}

function cert_success(_data){
	window.location.reload(true);
}

function del_success(_data){
	window.location.reload(true);
}


function errorNotice(){
	alert("error!");
	uploading = 0;
}

