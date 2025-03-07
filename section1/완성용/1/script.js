// 'wrapperBox'라는 변수에 ID가 'wrapper'인 요소를 가져옵니다. 
// 마치 특정 서랍을 열기 위해 서랍 이름표를 확인하고 그 서랍을 찾는 것과 같습니다.
const wrapperBox = document.getElementById("wrapper");

// 'inputFieldGroup'라는 변수에 클래스명이 'inputGroup'인 모든 요소를 가져옵니다. 
// 이는 같은 이름표가 붙은 여러 서랍을 한 번에 모두 가져오는 것과 비슷합니다.
const inputFieldGroup = document.getElementsByClassName("inputGroup");

// 모든 'input' 요소 중 첫 번째를 가져옵니다.
// `querySelector`는 일치하는 첫 번째 요소만 선택하므로 한 개의 input만 가져옵니다. 
// 마치 여러 책 중 가장 첫 번째 책만 고르는 것과 비슷합니다.
const allInputs = document.querySelector("input");

// ID가 'nickname'인 입력 필드를 가져옵니다.
// 이 작업은 특정 학생(입력 필드)의 이름표(ID)를 보고 그 학생을 찾는 것과 같습니다.
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("phone");
const registrationForm = document.getElementById("registrationForm");

// 'updateHelperText' 함수: 입력 필드의 유효성 상태를 나타내는 도움말을 업데이트합니다.
// 마치 선생님이 학생에게 "잘했어!" 또는 "다시 해봐!"라고 말해주는 것과 같습니다.
const updateHelperText = (input, message, isValid) => {
    // 입력 필드의 부모 요소(inputGroup)를 찾습니다.
    const inputGroup = input.parentElement;
    // inputGroup 안의 'helperText' 클래스 요소를 찾습니다.
    const helperText = inputGroup.getElementsByClassName("helperText")[0];

    if (isValid) {
        // 유효한 경우: 'invalid' 클래스를 제거하고 'valid' 클래스를 추가합니다.
        // 이 작업은 선생님이 "잘했어" 스티커를 붙여주고 "다시 해봐" 스티커를 떼는 것과 비슷합니다.
        inputGroup.classList.remove('invalid');
        inputGroup.classList.add('valid');
        helperText.style.visibility = 'hidden'; // 도움말 숨기기
    } else {
        // 유효하지 않은 경우: 'valid' 클래스를 제거하고 'invalid' 클래스를 추가합니다.
        // 선생님이 "잘했어" 스티커를 떼고 "다시 해봐" 스티커를 붙이는 것과 같습니다.
        inputGroup.classList.remove('valid');
        inputGroup.classList.add('invalid');
        helperText.style.visibility = 'visible'; // 도움말 보이기
        helperText.innerText = message; // 도움말에 메시지 설정
    }
};

// 입력 필드가 비어 있는지 확인하는 함수
// 학생에게 숙제 제출 여부를 확인하는 것과 같습니다.
const checkEmptyInput = (input) => {
    if (input.value.trim() === "") {
        // 입력이 비어 있으면 "값을 입력해주세요." 메시지를 보여줍니다.
        updateHelperText(input, "값을 입력해주세요.", false);
        return false;
    } else {
        // 입력이 있으면 도움말을 지웁니다.
        updateHelperText(input, "", true);
        return true;
    }
};

// 비밀번호 강도를 확인하는 함수
// 비밀번호가 충분히 강한지 검증하는 것은 마치 학생의 답안이 올바른지 확인하는 것과 비슷합니다.
const checkPasswordStrength = (password) => {
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (strongPattern.test(password.value)) {
        updateHelperText(password, "비밀번호 강도: 강함", true);
        return true;
    } else {
        updateHelperText(password, "비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.", false);
        return false;
    }
};

// 비밀번호와 확인 비밀번호가 일치하는지 확인하는 함수
// 마치 두 개의 열쇠가 일치하는지 확인하는 것과 비슷합니다.
const validatePasswordMatch = (passwordInput, confirmInput) => {
    if (passwordInput.value !== confirmInput.value) {
        updateHelperText(confirmInput, "비밀번호가 일치하지 않습니다.", false);
        return false;
    } else {
        updateHelperText(confirmInput, "", true);
        return true;
    }
};

// 이메일 형식이 올바른지 확인하는 함수
// 이메일 주소가 규칙에 맞게 작성되었는지 확인하는 것과 같습니다.
const validateEmailFormat = (input) => {
    const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (emailPattern.test(input.value.trim())) {
        updateHelperText(input, "", true);
        return true;
    } else {
        updateHelperText(input, "유효한 이메일 주소를 입력해주세요.", false);
        return false;
    }
};

// 전화번호가 올바른 형식인지 확인하는 함수
// 올바른 전화번호를 입력했는지 확인하는 것과 비슷합니다.
const validatePhoneNumber = (input) => {
    const phonePattern = /^01[0-9]{1}-[0-9]{3,4}-[0-9]{4}$/;
    if (phonePattern.test(input.value.trim())) {
        updateHelperText(input, "", true);
        return true;
    } else {
        updateHelperText(input, "유효한 전화번호를 입력해주세요. (예: 010-1234-5678)", false);
        return false;
    }
};

// 폼 제출 시 전체 입력 필드가 유효한지 확인하는 함수
// 숙제 검사에서 모든 항목을 검토하는 것과 같습니다.
const validateForm = () => {
    const isNicknameValid = checkEmptyInput(userNickname);
    const isEmailValid = validateEmailFormat(userEmail);
    const isPasswordStrong = checkPasswordStrength(userPassword);
    const isPasswordMatch = validatePasswordMatch(userPassword, confirmPassword);
    const isPhoneValid = validatePhoneNumber(userPhone);

    // 모든 검사가 통과해야 제출 가능
    return isNicknameValid && isEmailValid && isPasswordStrong && isPasswordMatch && isPhoneValid;
};

// 폼 제출 시 실행되는 이벤트 리스너 추가
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    if (validateForm()) {
        console.log("모든 필드가 유효합니다.");
        // 데이터를 서버로 전송하는 로직을 여기에 추가
    } else {
        console.log("유효성 검사 실패.");
    }
});

// 모든 input 요소를 대상으로 실시간 유효성 검사를 수행하는 이벤트 리스너 추가
// 반복적으로 각 입력 필드를 확인하는 것과 같습니다.
document.querySelectorAll("input").forEach(input => {
    input.addEventListener('input', () => {
        switch (input.id) {
            case 'nickname':
                checkEmptyInput(input);
                break;
            case 'email':
                validateEmailFormat(input);
                break;
            case 'userPassword':
                checkPasswordStrength(input);
                break;
            case 'confirmPassword':
                validatePasswordMatch(userPassword, confirmPassword);
                break;
            case 'phone':
                validatePhoneNumber(input);
                break;
        }
    });
});
