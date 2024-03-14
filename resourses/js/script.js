"use strict";

const currenciesURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const countryURL = "../resourses/js/country.json";

const fromCurDiv = document.querySelector("#fromCurDiv");
const toCurDiv = document.querySelector("#toCurDiv");

const toCurList = document.querySelector("#toCurList");
const fromCurList = document.querySelector("#fromCurList");

const exchangeIcon = document.querySelector("#exchange-icon");
const submitBtn = document.querySelector("#submit-btn");

const fromCurrentName = document.querySelector("#fromCurrentName");
const singleExchangeRate = document.querySelector("#singleExchangeRate");
const toCurrentName = document.querySelector("#toCurrentName");
const toCurrentRateFull = document.querySelector("#toCurrentRateFull");
const toCurrentNameFull = document.querySelector("#toCurrentNameFull");
const inputNumber = document.querySelector("#input-number");

let fromCurListItems = "";
let toCurListItems = "";

const fromCur = "US";
const toCur = "PK";

(() => {
    let listItems = "";
    let fromCurDivInner = ""
    let toCurDivInner = ""

    for (const key in countryList) {

        listItems += `<li data-cur="${countryList[key]}"> <span class="span-cur">${key}</span> <img class="flag-img" src="https://flagsapi.com/${countryList[key]}/flat/64.png" alt="flag of "> </li>`;

        if(countryList[key] === fromCur){
            fromCurDivInner = ` <span class="span-cur" data-cur="${key}" data-code="${countryList[key]}">${key}</span> <img class="flag-img" src="https://flagsapi.com/${countryList[key]}/flat/64.png" alt="flag of "> <img class="down-arrow-icon" src="resourses/img/down.png" alt="down arrow icon">`;
        }

        if(countryList[key] === toCur){
            toCurDivInner = ` <span class="span-cur" data-cur="${key}" data-code="${countryList[key]}">${key}</span> <img class="flag-img" src="https://flagsapi.com/${countryList[key]}/flat/64.png" alt="flag of "> <img class="down-arrow-icon" src="resourses/img/down.png" alt="down arrow icon">`;
        }
    }

    toCurList.innerHTML = listItems;
    fromCurList.innerHTML = listItems;

    fromCurDiv.innerHTML = fromCurDivInner;
    toCurDiv.innerHTML = toCurDivInner;

    fromCurListItems = Array.from(document.querySelectorAll("#fromCurList li"));
    toCurListItems = Array.from(document.querySelectorAll("#toCurList li"));

})();


setInterval( () =>{
    for(const fromCurListItem of fromCurListItems){
        fromCurListItem.addEventListener('click',(e)=>{
                const keyValue = e.currentTarget.dataset.cur;
                const  key = Object.keys(countryList).find(k=>countryList[k]===keyValue);
                fromCurDiv.innerHTML = ` <span class="span-cur" data-cur="${key}" data-code="${keyValue}">${key}</span> <img class="flag-img" src="https://flagsapi.com/${keyValue}/flat/64.png" alt="flag of "> <img class="down-arrow-icon" src="resourses/img/down.png" alt="down arrow icon">`;
        });
    }

    for(const toCurListItem of toCurListItems){
        toCurListItem.addEventListener('click',(e)=>{
                const keyValue = e.currentTarget.dataset.cur;
                const  key = Object.keys(countryList).find(k=>countryList[k]===keyValue);
                toCurDiv.innerHTML = ` <span class="span-cur" data-cur="${key}" data-code="${keyValue}">${key}</span> <img class="flag-img" src="https://flagsapi.com/${keyValue}/flat/64.png" alt="flag of "> <img class="down-arrow-icon" src="resourses/img/down.png" alt="down arrow icon">`;
        });
    }
}, 500);


function handleClickOutside(place,placeEvent){
    const ElementToCheck1 = document.querySelector(`#${place}CurList`);
    const ElementToCheck2 = document.querySelector(`#${place}CurDiv`);

    if( ElementToCheck1.contains(placeEvent.target) || ! ElementToCheck2.contains(placeEvent.target)){
        ElementToCheck1.style.display = "none";
    }
};

document.addEventListener('click', (Event) => {
    handleClickOutside("from",Event);
    handleClickOutside("to",Event);
});

fromCurDiv.addEventListener('click',(e) =>{
    e.currentTarget.nextElementSibling.style.display = "block";
});

toCurDiv.addEventListener('click',(e) =>{
    e.currentTarget.nextElementSibling.style.display = "block";
});

exchangeIcon.addEventListener('click', () =>{
    const repRaplce = fromCurDiv.innerHTML;
    fromCurDiv.innerHTML = toCurDiv.innerHTML
    toCurDiv.innerHTML = repRaplce;
});

async function updateCurrency(){
    const responsesCurFrom = await fetch(`${currenciesURL}/${(fromCurDiv.firstElementChild.dataset.cur).toLowerCase()}.json`);
    const resCurList = await responsesCurFrom.json();

    const resContryURl = await fetch(countryURL);
    const countryCodes = await resContryURl.json();

    const fromCurrency = fromCurDiv.firstElementChild.dataset.cur.toLowerCase();
    const toCurrency = toCurDiv.firstElementChild.dataset.cur.toLowerCase();

    fromCurrentName.textContent = fromCurDiv.firstElementChild.dataset.cur;
    singleExchangeRate.textContent = (resCurList[fromCurrency][toCurrency]).toFixed(2);
    toCurrentName.textContent = toCurDiv.firstElementChild.dataset.cur;
    toCurrentRateFull.textContent = (resCurList[fromCurrency][toCurrency] * inputNumber.value).toLocaleString('en-US', {maximumFractionDigits:2});
    toCurrentNameFull.textContent = (countryCodes[toCurDiv.firstElementChild.dataset.code.toLowerCase()]["currency_name"]).toUpperCase();
}


submitBtn.addEventListener('click', updateCurrency);

updateCurrency();