"use strict";

const currenciesURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const countryURL = "../resourses/js/country.json";

const curImg = document.querySelector("#cur-img");
const toImg = document.querySelector("#to-img");

const fromCur = "usd";
//const fromFlag = "us"

const toCur = "pkr"
//const toFlag = "pk";

async function updateCurrency(){

    const responseCountry = await fetch(countryURL);
    const country = await responseCountry.json();

    const responsesCur = await fetch(`${currenciesURL}.json`);
    const currencies = await responsesCur.json();

    const rate = currencies;
    const countryCode  = {
        pk:{
            country_iso3: 'pak', 
            country_iso_numeric: '586', 
            country_name: "Paksistan", 
            currency_name: 'pakistan rupee', 
            currency_code: 'pkr',
            currency_number: "586"
        },
        us:{
            country_iso3: "usa",
            country_iso_numeric: "840",
            country_name: "united states of america (the)",
            currency_name: "us dollar",
            currency_code: "usd",
            currency_number: "840"
        }
    }

    for (const key in countryCode) {
        if(countryCode[key].currency_code === fromCur){
            curImg.src = `https://flagsapi.com/${(key).toUpperCase()}/flat/64.png`;
        }

        if(countryCode[key].currency_code === toCur){
            toImg.src = `https://flagsapi.com/${(key).toUpperCase()}/flat/64.png`;
        }
      }
}

updateCurrency();

function populateCur(){

}

// console.dir()

// const fromCur = "usd";
// const toCur = "pkr"
// const currencies = {
//     date: '10-10-10',
//     usd: {
//         pkr: 300,
//         ind: 200
//     }
// };

// const curr = `${currencies}[date]`

// console.log("Res:",curr,currencies[fromCur][toCur]);

