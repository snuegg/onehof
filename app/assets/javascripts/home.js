# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

var placeSelected = new Array();
for(i=1;i<=4;i++)	placeSelected[i] = 0;
var placeTags = new Array();

function togglePlace(index, e){
	placeSelected[index] = 1 - placeSelected[index];
	displayPlace(index, e);
}

function displayPlace(index, e){
	// 플레이스의 선택상황에 맞는 그래픽 효과 제공

	if(placeSelected[index] == 0 && $("#placeTagContainer").find(placeTags[index]).length > 0){
		// 선택이 해제됬는데 객체를 가지고 있다면
		// 객체를 제거해준다.
		placeTags[index].remove();
		placeTags[index] = null;

	}

	if(placeSelected[index] == 1 && $("#placeTagContainer").find(placeTags[index]).length == 0){
		// 석택됬는데 객체를 가지고 있지 않다면
		// 객체를 추가해준다.
		placeTags[index] = document.createElement('div');
		placeTags[index].style.width="50px";
		placeTags[index].style.height="20px";
		placeTags[index].style.background="#AAA";
		placeTags[index].style.color="#FFF";
		placeTags[index].style.display="inline-block";
		placeTags[index].style.margin="2px";
		placeTags[index].style.cursor="pointer";
		placeTags[index].style.textAlign="center";
		placeTags[index].style.borderRadius="2px";
		$(placeTags[index]).text($(e).text());
		$(placeTags[index]).click(function(){
			placeSelected[index] = 0;
			placeTags[index].remove();
			placeTags[index] = null;
		});

		$("#placeTagContainer").append(placeTags[index]);
	}
//	alert('c3');

}