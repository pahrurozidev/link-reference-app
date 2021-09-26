const input = document.querySelectorAll('input');
const label = document.querySelectorAll('label');
const section = document.querySelectorAll('section');
const flashMessage = document.getElementsByClassName('flash-message')[0];
const close = document.getElementsByClassName('close')[0];


// storage
if (typeof (localStorage !== 'undefined')) {
    console.log('Local storage available');
} else {
    console.log('your data will missing after at reload');
}

const STORAGE_REFERENCE = 'STORAGE_REFERENCE';
let reference = {};

if (referenceFromLocal = localStorage.getItem(STORAGE_REFERENCE)) {
    reference = JSON.parse(referenceFromLocal);
    for (key in reference) {
        section[1].insertAdjacentHTML("afterbegin", designUI(key, reference[key]));
    }
}

// user experience
input[0].addEventListener('click', () => {
    label[0].classList.toggle('labelHidden');
    input[0].addEventListener('mouseout', () => {
        label[0].classList.toggle('labelHidden');
    })
});
input[0].addEventListener('keydown', () => {
    label[0].innerText = "";
})

input[1].addEventListener('click', () => {
    label[1].classList.toggle('labelHidden');
    input[1].addEventListener('mouseout', () => {
        label[1].classList.toggle('labelHidden');
    })
});
input[1].addEventListener('keydown', () => {
    label[1].innerText = "";
})

function syncLocalStorage(input1, input2) {
    
    if (input1 == "Remove") {
        delete reference[input2];
    } else {
        reference[input1] = input2;
        section[1].insertAdjacentHTML("afterbegin", designUI(input1, input2));
        window.location.reload();
    }
    localStorage.setItem(STORAGE_REFERENCE, JSON.stringify(reference));
}

// input data
const button = document.querySelector('button');
button.addEventListener('click', (e) => {

    if (input[1].value && input[2].value) {
        const input1 = input[1].value;
        const input2 = input[2].value;

        syncLocalStorage(input1, input2);
    } else {
        flashMessage.classList.toggle('flash');
    }
    e.preventDefault();
});

function designUI(in1, in2) {
    return /*html*/ `
    <div class="box">
        <span class="close">x</span>
        <h5>${in1}</h5>
        <a href="${in2}">${in2}</a>
    </div>`;
}

const box = document.querySelectorAll('.box');
const boxClose = document.querySelectorAll('.box .close');

for (let i = 0; i < boxClose.length; i++) {
    boxClose[i].addEventListener('click', (el) => {
        section[1].removeChild(box[i]);
        const textKey = box[i].querySelector('h5').innerText;
        syncLocalStorage('Remove', textKey);
        el.preventDefault();
    })
}

close.addEventListener('click', () => {
    flashMessage.classList.toggle('flash');
})