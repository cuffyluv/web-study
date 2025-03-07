// DOM 요소 선택을 위한 유틸리티 함수

const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");

let currentInput = ""; 

const operatorRegex = /^[+\-*/]$/; // 연산자 구별 정규식
const numberRegex = /^[0-9]$/; // 숫자 구별 정규식

// 화면에 숫자 또는 연산자를 추가하는 함수
function appendToScreen(value) {
    screen.value += value;
}

// 화면 초기화 함수
function clearScreen() {
    screen.value = "";
}

// 연산 수행 함수
function calculate(operator, numbers) {
    const [num1, num2] = numbers.map(Number);

    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num2 !== 0 ? num1 / num2 : "Error"; // 0으로 나눌 때 오류 처리
        default:
            return "";
    }
}

// 버튼 클릭 시 동작을 처리하는 함수
function handleButtonClick(event) {
    event.preventDefault();
    const buttonText = event.target.innerText;

    if (numberRegex.test(buttonText)) {
        appendToScreen(buttonText);
    } else if (operatorRegex.test(buttonText)) {
        appendToScreen(buttonText);
    }
}

// 버튼 클릭 이벤트 리스너 등록 함수
function initializeButtonListeners() {
    buttons.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });
}

// "=" 버튼 클릭 시 계산 결과를 화면에 표시
function handleResultClick() {
    const screenValue = screen.value;

    // 연산자가 있는지 확인 후 연산 수행
    if (screenValue.includes("+")) {
        const [num1, num2] = screenValue.split("+");
        screen.value = calculate("+", [num1, num2]);
    } else if (screenValue.includes("-")) {
        const [num1, num2] = screenValue.split("-");
        screen.value = calculate("-", [num1, num2]);
    } else if (screenValue.includes("*")) {
        const [num1, num2] = screenValue.split("*");
        screen.value = calculate("*", [num1, num2]);
    } else if (screenValue.includes("/")) {
        const [num1, num2] = screenValue.split("/");
        screen.value = calculate("/", [num1, num2]);
    }
}

// 초기화 버튼 클릭 시 화면을 초기화
document.getElementById("resetButton").addEventListener("click", function () {
    clearScreen();
});

// "=" 버튼 클릭 시 계산 실행
document.getElementById("result").addEventListener("click", handleResultClick);

// 계산기 기능 실행
initializeButtonListeners();
