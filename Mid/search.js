var tab_Box = document.getElementById("tab_Box");

tab_Box.addEventListener('click', Click_Menu); //검색 탭 클릭 이벤트

var rem_tab = document.getElementById("tab_board"); //이전에 활성화된 검색 탭 저장(초기값은 '게시판 탭')
var rem_id = rem_tab.id;
var btn_tab = false;

function Click_Menu(event){
	if(btn_tab === true){
		rem_tab.parentNode.className = ""; //이전에 활성화된 탭의 클래스를 초기화
		rem_tab = event.target;				//현재 클릭한 탭 저장
		rem_id = rem_tab.id;	
		rem_tab.parentNode.className = "active" //현재 클릭한 탭의 클래스를 활성화

		//검색 값 초기화(페이지 넘버, 펼쳐본 문서 수, 화면)
		pageno = 1;
		resultCount = 0;
		wrap.innerHTML = "";
		
		Do_Search(); //검색 실행
		
		btn_tab = false;
	}
}


var Btn_Search = document.getElementById("Btn_Search");
var Loading_Template = document.getElementById("Loading_Template");
var search_box = document.getElementById("search_box");
var SearchTemplate = document.getElementById("SearchTemplate");
var wrap = document.getElementById("wrap");
var address = "";
var pageno = 1;
var resultCount = 0;

Btn_Search.addEventListener('click', Click_Search); //검색 버튼 클릭 이벤트

function Click_Search(event){
	//검색 값 초기화(페이지 넘버, 펼쳐본 문서 수, 화면)
	pageno = 1;
	resultCount = 0;
	wrap.innerHTML = "";

	Do_Search(); //검색 실행
}

function Do_Search(){
	var type, pageCount, tmp_wrap;			
	Btn_More.innerHTML = "";	//더보기 버튼 삭제

	var search_word = search_box.value;	

	if(search_word === "") { window.alert("검색어를 넣어주세요"); return; }

	switch(rem_id){
		case 'tab_board' : type = "board"; break;
		case 'tab_vclip' : type = "vclip"; break;
		case 'tab_img' : type = "image"; break;
		case 'tab_tip' : type = "knowledge"; break;
		case 'tab_blog' : type = "blog"; break;
		case 'tab_cafe' : type = "cafe"; break;
	}
	address = "https://apis.daum.net/search/"+type+"?apikey=d89846fc3b0a4b338321610e85737eb5&q="+search_word+"&output=json&pageno="+pageno;

	tmp_wrap = wrap.innerHTML; //임시저장

	wrap.innerHTML += Loading_Template.innerHTML; //로딩창 출력
	
	var Search_Template = SearchTemplate.innerHTML;	

	getJSON(address , function(data){		
		tmp_wrap += tmpl(Search_Template, {list: data.channel.item});	//tmp에 자료 입력
		wrap.innerHTML = tmp_wrap;					//로딩창을 tmp로 덮어씌움
		
		resultCount += parseInt(data.channel.result); // 이제까지 펼쳐본 페이지 수
		pageCount = parseInt(data.channel.pageCount); // 검색된 페이지 수

		if(resultCount < pageCount) Btn_More.innerHTML = Btn_More_Template.innerHTML; //이제까지 펼쳐본 페이지수 보다 검색된 페이지수가 크면 더보기 생성
	});
	

}

var Btn_More = document.getElementById("Btn_More");

var Btn_More_Template = document.getElementById("Btn_More_Template");

Btn_More.addEventListener('click', Click_More);

function Click_More(event){
	pageno ++;
	Do_Search();
}