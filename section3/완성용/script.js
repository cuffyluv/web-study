// DOM 요소 연결
const quoteDisplayArea = document.querySelector("#quoteContainer");
const currentQuote = document.querySelector("#quote");
const loadingSpinner = document.getElementById("loader");
const favoriteQuotesList = document.getElementById("quotePickList");
const nextQuoteButton = document.getElementById("nextQuote");
const saveQuoteButton = document.getElementById("selectQuote");

// 상태 변수들
let currentQuoteText = '';
let isQuoteSaved = false;

// 로딩 애니메이션 표시
function showLoadingSpinner() {
    loadingSpinner.style.display = "block";
    quoteDisplayArea.style.display = "none";
}

// 로딩 애니메이션 숨기기
function hideLoadingSpinner() {
    loadingSpinner.style.display = "none";
    quoteDisplayArea.style.display = "block";
}

// 한국명언 API 호출 및 명언 가져오기
async function fetchKoreaQuotes() {
    showLoadingSpinner();
    const apiUrl = "https://korean-advice-open-api.vercel.app/api/advice";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 단일 명언 객체에서 명언 텍스트 가져오기
        currentQuoteText = data.message;
        
        // 명언을 화면에 표시
        currentQuote.innerText = currentQuoteText;
        localStorage.setItem("currentQuote", currentQuoteText);
        isQuoteSaved = false; // 새 명언이 생성되면 저장되지 않은 상태로 초기화

    } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
        currentQuote.innerText = "명언을 불러올 수 없습니다. 다시 시도해주세요.";
    }
    hideLoadingSpinner();
}

// 명언을 즐겨찾기 리스트에 추가
function saveFavoriteQuote() {
    const storedQuote = localStorage.getItem("currentQuote");

    if (!isQuoteSaved && storedQuote && !isQuoteAlreadyInList(storedQuote)) {
        const listItem = document.createElement("li");
        listItem.innerText = storedQuote;
        favoriteQuotesList.appendChild(listItem);
        isQuoteSaved = true; // 명언이 저장되었음을 표시
    } else if (isQuoteSaved) {
        alert("이 명언은 이미 저장되었습니다.");
    } else {
        alert("이 명언은 이미 즐겨찾기에 추가되었습니다.");
    }
}

// 리스트에 이미 명언이 있는지 체크하는 함수
function isQuoteAlreadyInList(quote) {
    const listItems = favoriteQuotesList.getElementsByTagName("li");
    for (let item of listItems) {
        if (item.innerText === quote) {
            return true; // 이미 리스트에 존재하는 경우
        }
    }
    return false;
}

// '다음' 버튼 클릭 시 새로운 명언 생성
nextQuoteButton.addEventListener("click", fetchKoreaQuotes);

// '선택' 버튼 클릭 시 명언을 즐겨찾기에 추가
saveQuoteButton.addEventListener("click", saveFavoriteQuote);

// 페이지 로드 시 첫 명언 호출
fetchKoreaQuotes();
