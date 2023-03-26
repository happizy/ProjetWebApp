



// Fonction qui créer des instances de la classe Country, Currency, Language avec les données countries_data
function fill_db(){
    // Création des instances de Country à partir des données JSON
    countries_data.forEach(countryData => {
        
        const country = new Country(
            countryData.alpha3Code,
            countryData.translations,
            countryData.capital,
            countryData.area,
            countryData.population,
            countryData.region,
            countryData.flag,
            countryData.topLevelDomain,
            [],
            [],
            countryData.borders,
            countryData.demonym
            );

            if(countryData.hasOwnProperty("currencies") > 0){
                countryData.currencies.forEach(currency => {
                    country.currencies.push(currency.code); // Ajout du code de la devise dans le tableau des devises du pays
                    var newCurrency = new Currency(
                        currency.code,
                        currency.name,
                        currency.symbol
                    );
                    Currency.all_currencies[newCurrency._code] = newCurrency; // Stockage dans le tableau static de la classe Currency
                });
            }

            if(countryData.hasOwnProperty("languages") > 0){
                countryData.languages.forEach(language => {
                    country.languages.push(language.iso639_2); // Ajout du code de la langue dans le tableau des langues du pays
                    var newLanguage = new Language(
                        language.name,
                        language.iso639_2,
                    );
                    Language.all_languages[newLanguage._code] = newLanguage; // Stockage dans le tableau static de la classe Language
                });
            }

            Country.all_countries[country.alphaCode3] = country; // Stockage dans le tableau static de la classe Country

        });
}

function fillPage(){
    const tbodyCountries = document.querySelector('tbody');
    Object.keys(Country.all_countries).forEach(key => {
    
        let currentCountry = Country.getCountryByCode(key);
        
        
        let newTr = document.createElement('tr');
        newTr.id = currentCountry.alphaCode3;
        
        
        let tdNom = document.createElement('td');
        tdNom.classList.add('name');
        tdNom.innerHTML = currentCountry.name.fr;
        newTr.appendChild(tdNom);
        
        let tdPop = document.createElement('td');
        tdPop.classList.add('pop');
        tdPop.innerHTML = currentCountry.population;
        newTr.appendChild(tdPop);
        
        let tdArea = document.createElement('td');
        tdArea.classList.add('area');
        tdArea.innerHTML = currentCountry.superficie;
        newTr.appendChild(tdArea);
        
        let tdDensity = document.createElement('td');
        tdDensity.classList.add('density');
        tdDensity.innerHTML = currentCountry.getPopDensity().toFixed(3);
        newTr.appendChild(tdDensity);
        
        let tdContinent = document.createElement('td');
        tdContinent.classList.add('continent');
        tdContinent.innerHTML = currentCountry.continent;
        newTr.appendChild(tdContinent);
        
        let tdFlag = document.createElement('td');
        tdFlag.classList.add('flag');
        let newFlag = document.createElement('img');
        newFlag.src = currentCountry.flag;
        tdFlag.appendChild(newFlag);
        newTr.appendChild(tdFlag);
    
        tbodyCountries.appendChild(newTr);
    });
}

function fillPage25(index){
    const tbodyCountries = document.querySelector('tbody');
    tbodyCountries.innerHTML = null;
    let max = index*25+24;
    if(max > Object.keys(Country.all_countries).length){
        max = Object.keys(Country.all_countries).length;
    }
    for(let i = index*25; i<=max; i++){
        let currentCountry = Country.getCountryByCode(Object.keys(Country.all_countries)[i]);

        let newTr = document.createElement('tr');
        newTr.id = currentCountry.alphaCode3;
        
        
        let tdNom = document.createElement('td');
        tdNom.classList.add('name');
        tdNom.innerHTML = currentCountry.name.fr;
        newTr.appendChild(tdNom);
        
        let tdPop = document.createElement('td');
        tdPop.classList.add('pop');
        tdPop.innerHTML = currentCountry.population;
        newTr.appendChild(tdPop);
        
        let tdArea = document.createElement('td');
        tdArea.classList.add('area');
        tdArea.innerHTML = currentCountry.superficie;
        newTr.appendChild(tdArea);
        
        let tdDensity = document.createElement('td');
        tdDensity.classList.add('density');
        tdDensity.innerHTML = currentCountry.getPopDensity().toFixed(3);
        newTr.appendChild(tdDensity);
        
        let tdContinent = document.createElement('td');
        tdContinent.classList.add('continent');
        tdContinent.innerHTML = currentCountry.continent;
        newTr.appendChild(tdContinent);
        
        let tdFlag = document.createElement('td');
        tdFlag.classList.add('flag');
        let newFlag = document.createElement('img');
        newFlag.src = currentCountry.flag;
        tdFlag.appendChild(newFlag);
        newTr.appendChild(tdFlag);
    
        tbodyCountries.appendChild(newTr);
    }
    let currentNumber = document.getElementById("currNumber");
    let previousNumber = document.getElementById("prevNumber");
    let nextNumber = document.getElementById("nextNumber");
    currentNumber.innerHTML = index+1;
    if(index == 0){
        previousNumber.innerHTML = null;
    }else{
        previousNumber.innerHTML = index;
    }
    nextNumber.innerHTML = index+2;

}



document.addEventListener("DOMContentLoaded", () => {
    var index = 0;
    var next = document.getElementById("next");
    var previous = document.getElementById("previous");
    var nextNumber = 1;
    var previousNumber = null;
    fill_db();
    //fillPage();
    fillPage25(0);
    document.getElementById("next").addEventListener("click", () => {
        if( index*25+25 < Object.keys(Country.all_countries).length){
            index++;
            nextNumber = null;
        }
        fillPage25(index);
    });

    document.getElementById("back").addEventListener("click", () => {
        if(index > 0){
            index--;
        }
        fillPage25(index);
    });  
});

//Country.display_all_countries();







// Fonction qui créer des instances de la classe Country, Currency, Language avec le fichier JSON : countries.json
// function fill_db(){
//     // Récupération des données du fichier JSON avec fetch
//     fetch('./countries.json')
//     .then(response => response.json())
//     .then(data => {
//         // Création des instances de Country à partir des données JSON
//         data.forEach(countryData => {
            
//             const country = new Country(
//                 countryData.alpha3Code,
//                 countryData.name,
//                 countryData.capital,
//                 countryData.area,
//                 countryData.population,
//                 countryData.region,
//                 countryData.flag,
//                 countryData.topLevelDomain,
//                 [],
//                 [],
//                 countryData.borders,
//                 countryData.demonym
//                 );

//                 if(countryData.hasOwnProperty("currencies") > 0){
//                     countryData.currencies.forEach(currency => {
//                         country.currencies.push(currency.code); // Ajout du code de la devise dans le tableau des devises du pays
//                         var newCurrency = new Currency(
//                             currency.code,
//                             currency.name,
//                             currency.symbol
//                         );
//                         Currency.all_currencies[newCurrency._code] = newCurrency; // Stockage dans le tableau static de la classe Currency
//                     });
//                 }
    
//                 if(countryData.hasOwnProperty("languages") > 0){
//                     countryData.languages.forEach(language => {
//                         country.languages.push(language.iso639_2); // Ajout du code de la langue dans le tableau des langues du pays
//                         var newLanguage = new Language(
//                             language.name,
//                             language.iso639_2,
//                         );
//                         Language.all_languages[newLanguage._code] = newLanguage; // Stockage dans le tableau static de la classe Language
//                     });
//                 }


//                 Country.all_countries[country.alphaCode3] = country; // Stockage dans le tableau static de la classe Country
//             });



                
//     }).catch(error => console.error(error));
// }
