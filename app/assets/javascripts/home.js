/************************ Host(Org) 선택, 전달 구조 *****************************/
/*var orgTags = new Array();
var orgNames = new Array();
var orgCnt;
function addOrg(name){
	orgNames[orgCnt] = name;
	var $tag;
	$tag = $(<div>'name'</div>);
	$tag.style.minWidth="50px";
	$tag.style.height="20px";
	$tag.style.background="#AAA";
	$tag.style.color="#FFF";
	$tag.style.display="inline-block";
	$tag.style.margin="2px";
	$tag.style.cursor="pointer";
	$tag.style.textAlign="center";
	$tag.style.borderRadius="2px";
	orgTags[orgCnt] = $tag
	$("#hostTagContainer").append(orgTags[orgCnt]);
	orgCnt++;
}
function removeOrgTag(){
	orgTags[orgCnt].remove();
	orgTags[orgCnt] = null;
	for(i=;i<orgCnt-1;i++){
		orgTags[i] = orgTags[i+1];
		orgNames[i] = orgNames[i+1];
	}
	
	orgCnt--;
}
$(document).ready(
	
	function{
		$('button.#hostBtn').click(
				function(){
					for(i=0;i<orgCnt;i++) orgTags[i]= null; orgNames[i] = null;
					orgCnt = 0;
				}
			);
		$('button.#hostadd').click(
				function(){
					addOrg('#orgInput');
				}
			);
	}
	);


*/
$(document).ready(function(){
    	$('#testDatepicker').datepicker({
    	});
    }
);
var gorgNames = new Array();
var gorgCnt = 0;

var orgNames = new Array();
var orgTags = new Array();
var orgCnt = 0;
var i;
function initOrgs(){
	// 초기화
	orgCnt = gorgCnt;
	for(i=0;i<orgCnt;i++)	orgTags[i] = null;
	for(i=0;i<orgCnt;i++)	orgNames[i] = gorgNames[i];
	$("#hostTagContainer").empty();
	// 객체 재생성
	for(i=0;i<orgCnt;i++)	displayOrg(i, orgNames[i]);
}

function commitOrgs(){
	// global값으로 배포
	gorgCnt = orgCnt;
	for(i=0;i<orgCnt;i++)	gorgNames[i] = orgNames[i];
	$("#hostBtn").text("주최 : ");
	first = 0;
	for(i=0;i<orgCnt;i++){
		if(first == 0){
			first = 1;
			$("#hostBtn").text($("#hostBtn").text() + orgNames[i]);
		}
		else{
			$("#hostBtn").text($("#hostBtn").text() + ",  " + orgNames[i]);
		}
	}
	search();
}

function addOrg(name){
	makeOrgTag(orgCnt, name);
	orgCnt++;
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

var placeName = ["", "관악", "신촌", "홍대", "대학로"];
var gplaceSelected = new Array();
for(i=1;i<=4;i++)	gplaceSelected[i] = 0; // global initialzation

var placeSelected = new Array();
var placeTags = new Array();

function initPlaces(){
	// 초기화
	for(i=1;i<=4;i++)	placeSelected[i] = gplaceSelected[i];
	for(i=1;i<=4;i++)	placeTags[i] = null;
	$("#placeTagContainer").empty();
	// 객체 재생성
	for(i=1;i<=4;i++)	displayPlace(i);
}

function commitPlaces(){
	// global값으로 배포
	for(i=1;i<=4;i++)	gplaceSelected[i] = placeSelected[i];
	$("#placeBtn").text("장소 : ");
	first = 0;
	for(i=1;i<=4;i++)
	if(gplaceSelected[i] == 1){
		if(first == 0){
			first = 1;
			$("#placeBtn").text($("#placeBtn").text() + placeName[i]);
		}
		else{
			$("#placeBtn").text($("#placeBtn").text() + ",  " + placeName[i]);
		}
	}
	search();
}

function togglePlace(index){
	placeSelected[index] = 1 - placeSelected[index];
	displayPlace(index);
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

function search(){
	
}