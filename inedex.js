// Variables
const spans = document.getElementsByClassName('error-text');

const cardholder = document.getElementById('cardholder');
const number = document.getElementById('number');
const dateM = document.getElementById('date-m');
const dateY = document.getElementById('date-y');
const cvc = document.getElementById('cvc');

const confirm = document.getElementById('confirm');
const continueBtn = document.getElementById('continue');

const form = document.querySelector('.form');
const thanksScreen = document.querySelector('#thanks');
        

let inputs = [
    {
        cardholder: false,
        number: false,
        dateM: false,
        dateY: false,
        cvc: false
    }
]

// Error clear
for (const item of spans) {
    item.classList.add('none')
}

thanksScreen.classList.add('none');

function mask() {
    let val = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '');
    val = val !== '' ? val.match(/.{1,4}/g).join` ` : ``;
    this.value = val;
}

number.addEventListener('input', mask);


confirm.addEventListener('click', () => {
    checkNameInput();
    checkNumberInput();
    checkDateInout();
    checkCvcInout();

    showThanksScreen();
});


// Check functions
function checkNameInput() {
    cardholder.value = cardholder.value.trim();
    if (cardholder.value.length < 4) {
        inputs[0].cardholder = false;
        spans[0].classList.remove('none');
        spans[0].classList.add('block');
        cardholder.classList.add('error-input');
    } else {
        inputs[0].cardholder = true;
        spans[0].classList.remove('block');
        spans[0].classList.add('none');
        cardholder.classList.remove('error-input');
        if (cardholder.value.length > 19) {
            cardholder.value = cardholder.value.slice(0, 19)
        }
        document.querySelector('.owner').textContent = cardholder.value;
    }
}


function checkNumberInput() {
    inputs[0].number = /^[0-9]+$/.test(number.value.replaceAll(' ', ''));

    if (number.value.length < 15) {
        inputs[0].number = false;
    }

    inputs.map((val) => {
        if (val.number === false) {
            spans[1].classList.remove('none');
            spans[1].classList.add('block');
            number.classList.add('error-input');
        } else if (val.number === true) {
            spans[1].classList.remove('block');
            spans[1].classList.add('none');
            number.classList.remove('error-input');
            document.querySelector('.number').textContent = number.value;
        }
    })
}

function checkDateInout() {

    inputs[0].dateY = /^[0-9]+$/.test(dateY.value.slice(0, 2).replaceAll(' ', ''));
    inputs[0].dateM = /^[0-9]+$/.test(dateM.value.slice(0, 2).replaceAll(' ', ''));

    if (inputs[0].dateY) {
            
        dateY.value = dateY.value.trim();

        if (dateY.value.length < 2  || Number(dateY.value) < 23) {
            inputs[0].dateY = false;
            spans[2].classList.remove('none');
            spans[2].classList.add('block');
            dateY.classList.add('error-input');
        } else {
            inputs[0].date = true;
            spans[2].classList.remove('block');
            spans[2].classList.add('none');
            dateY.classList.remove('error-input');
        }
    } else {
        dateY.classList.add('error-input');
    }


    if (inputs[0].dateM) {
            
        dateM.value = dateM.value.trim();

        if (dateM.value.length < 2 || Number(dateM.value) > 12) {
            inputs[0].dateM = false;
            spans[2].classList.remove('none');
            spans[2].classList.add('block');
            dateM.classList.add('error-input');
        } else {
            inputs[0].date = true;
            spans[2].classList.remove('block');
            spans[2].classList.add('none');
            dateM.classList.remove('error-input');
        }
    } else {
        dateM.classList.add('error-input');
    }

    if (inputs[0].dateM && inputs[0].dateY) {
        document.querySelector('.date').textContent = `${dateM.value}/${dateY.value}`;
    } else {
        spans[2].classList.remove('none');
        spans[2].classList.add('block');
    }
}


function checkCvcInout() {

    inputs[0].cvc = /^[0-9]+$/.test(cvc.value.slice(0, 3).replaceAll(' ', ''));

    if (inputs[0].cvc) {
            
        cvc.value = cvc.value.trim();

        if (cvc.value.length < 2) {
            inputs[0].cvc = false;
            spans[3].classList.remove('none');
            spans[3].classList.add('block');
        } else {
            inputs[0].cvc = true;
            spans[3].classList.remove('block');
            spans[3].classList.add('none');
            cvc.classList.remove('error-input');
            document.querySelector('.cvc').textContent = cvc.value;
        }
    } else {
        spans[3].classList.remove('none');
        spans[3].classList.add('block');
        cvc.classList.add('error-input');
    }
}



function showThanksScreen() {
    let thanks = false;

    for (key in inputs[0]) {
        if (inputs[0][key] === false) {
           break;
        } else {
            thanks = true;
        }
    }

    if (thanks) {
        form.classList.add('none');
        thanksScreen.classList.remove('none');
    }
}


continueBtn.addEventListener('click', () => {
    window.location = 'https://github.com/NikitaBenzin';
})