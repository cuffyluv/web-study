//DOM 요소 연결
const quoteDisplayArea = document.querySelector("#quoteContainer");
const currentQuote = document.querySelector("#quote");
const loadingSpinner = document.getElementById("loader");
const favoriteQuoteList = document.getElementById("quotePickList");
const nextQuoteButton = document.getElementById("nextQuote");
const saveQuoteButton = document.getElementById("selectQuote");

//변수들 설정
let currentQuoteText = "";
let isQuoteSaved = false;
//명언이 중복되지 않은 상태를 false로 표현한것

//로딩 애니메이션 표시
function showLoadingSpinner(){
    loadingSpinner.style.display="block";
    //"로딩중텍스트는 보이게"
    quoteDisplayArea.style.display="none";
    //"명언텍스트는 보이지않게"
}

//로딩 애니메이션 숨기
function hideLoadingSpinner(){
    loadingSpinner.style.display="none";
    quoteDisplayArea.style.display="block";
}

//한국어 명언 API호출 및 명언가져오는 함수(비동기화)
async function fetchKoreaQuotes(){
    showLoadingSpinner();
    const apiUrl = "https://korean-advice-open-api.vercel.app/api/advice";
    try {
        //명언을 가져옵니다.
        const response = await fetch(apiUrl);
        const data = await response.json();
        currentQuoteText = data.message;

        //명언을 화면에 표시
        currentQuote.innerText = currentQuoteText;
        localStorage.setItem("currentQuote",currentQuoteText);
        isQuoteSaved = false;
        //isQuoteSaved는 아직 true 가 되면안됨,
        //api를 통해 데이터를 가져오기만했지 아직 로컬스토리지에 저장한거는 명언을 저장한걸로 치지를 않는다.
        //정확히는 로컬스토리지에 저장한것과 즐겨찾기에 명언이 존재해야지 두가지 조건이 성립해야지
        //이떄서야 isQuoteSaved가 됬다고 true를 설정한다.
    } catch (error) {
        console.error(`에러발생: ${error}`);
        currentQuote.innerText = "명언을 불러올수 없습니다. 다시 시도해주세요.";
    }
    hideLoadingSpinner();
}

//명언을 즐겨찾기 리스트에 추가
function saveFavoriteQuote(){
    const storedQuote = localStorage.getItem("currentQuote");

    if(isQuoteSaved == false && storedQuote !== null && isQuoteAlreadyInList(storedQuote) == false){
        const listItem = document.createElement("li");
        //<li></li>;
        listItem.innerText = storedQuote;
        //<li>명언~~</li>;
        favoriteQuoteList.appendChild(listItem);
        // <ul id="quotePickList">
        //     <li>명언~~</li>;
        //     <li>명언~~</li>;
        // </ul>
        isQuoteSaved = true;//명언이 저장되었음을 표시
    }else if(isQuoteSaved==true){
        alert("이 명언은 이미 저장되었습니다.");
    }else{
        alert("이 명언은 이미 즐겨찾기에 추가되었습니다.");
    }
}

function isQuoteAlreadyInList(quote){
    const listItems = favoriteQuoteList.getElementsByTagName("li");
    for(item of listItems){
        if(item.innerText === quote){
            return true;
            //데이터가 이미 존재하는 경우 더이상 중복 데이터가 저장되면 안된다.
        }
    }
    return false;
    //데이터가 중복되지 않은경우
}

//다음 버튼 클릭시 새로운 명언 생성
nextQuoteButton.addEventListener("click",fetchKoreaQuotes);
//선택 버튼 클릭시 명언을 즐겨찾기에 추가
saveQuoteButton.addEventListener("click",saveFavoriteQuote);

//페이지 로드시 첫 명언 호출
fetchKoreaQuotes();