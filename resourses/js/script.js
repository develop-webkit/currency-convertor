"use strict";

const currenciesURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const countryURL = "../resourses/js/country.json";
const curURL = "../resourses/js/cur.js";


const fromCurDiv = document.querySelector("#fromCurDiv");
const toCurDiv = document.querySelector("#toCurDiv");

const toCurList = document.querySelector("#toCurList");
const fromCurList = document.querySelector("#fromCurList");

let fromCurListItems = "gg";
let toCurListItems = "gg";

const fromCur = "US";
const toCur = "PK";

(async () => {

    const responsesCur = await fetch(`${currenciesURL}.json`);
    const currencies = await responsesCur.json();
    let listItems = "";
    let fromCurDivInner = ""
    let toCurDivInner = ""

    for (const key in countryList) {

        listItems += `<li data-cur="${countryList[key]}"> <span class="span-cur">${key}</span> <img class="flag-img" src="https://flagsapi.com/${countryList[key]}/flat/64.png" alt="flag of "> </li>`;

        if(countryList[key] === fromCur){
            fromCurDivInner = ` <span class="span-cur" data-cur="${countryList[key]}">${key}</span> <img class="flag-img" src="https://flagsapi.com/${countryList[key]}/flat/64.png" alt="flag of "> <img class="down-arrow-icon" src="resourses/img/down.png" alt="down arrow icon">`;
        }

        if(countryList[key] === toCur){
            toCurDivInner = ` <span class="span-cur" data-cur="${countryList[key]}">${key}</span> <img class="flag-img" src="https://flagsapi.com/${countryList[key]}/flat/64.png" alt="flag of "> <img class="down-arrow-icon" src="resourses/img/down.png" alt="down arrow icon">`;
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
                fromCurDiv.innerHTML = ` <span class="span-cur" data-cur="${key}">${key}</span> <img class="flag-img" src="https://flagsapi.com/${keyValue}/flat/64.png" alt="flag of "> <img class="down-arrow-icon" src="resourses/img/down.png" alt="down arrow icon">`;
        });
    }

    for(const toCurListItem of toCurListItems){
        toCurListItem.addEventListener('click',(e)=>{
                const keyValue = e.currentTarget.dataset.cur;
                const  key = Object.keys(countryList).find(k=>countryList[k]===keyValue);
                toCurDiv.innerHTML = ` <span class="span-cur" data-cur="${key}">${key}</span> <img class="flag-img" src="https://flagsapi.com/${keyValue}/flat/64.png" alt="flag of "> <img class="down-arrow-icon" src="resourses/img/down.png" alt="down arrow icon">`;
        });
    }
}, 200);

fromCurDiv.addEventListener('click',(e) =>{
    e.currentTarget.nextElementSibling.style.display = "block";
});



document.addEventListener('click', ())



