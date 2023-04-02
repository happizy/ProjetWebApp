



// Fonction qui créer des instances de la classe Country, Currency, Language avec les données countries_data
function fill_db(data){
    // Création des instances de Country à partir des données JSON
    data.forEach(countryData => {
        
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


function fillPage25(index, countryTable){
    const tbodyCountries = document.querySelector('tbody');
    tbodyCountries.innerHTML = null;
    let max = index*25+24;
    if(max > Object.keys(countryTable).length){
        max = Object.keys(countryTable).length;
    }
    for(let i = index*25; i<=max; i++){
        let currentCountry = Country.getCountryByCode(Object.keys(countryTable)[i]);
        if(!currentCountry) continue;

        let newTr = document.createElement('tr');
        newTr.id = currentCountry.alphaCode3;
        newTr.classList.add('country');    
        
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
    
    let currentNumber = document.getElementById('currNumber');
    currentNumber.innerHTML = index+1;
    

}

// Fonction pour mettre à jour la liste des pays en fonction du choix de l'utilisateur
function updateCountriesList(continent, language, name) {
    // Vérification si l'utilisateur a sélectionné un continent, une langue ou un nom de pays
    if ((continent === 'all') && (language === 'all') && (name === '')) {
      return Country.all_countries; // la liste de tous les pays
    } else {
        var filteredCountriesCodes = Object.keys(Country.all_countries);
        if (continent !== 'all') {
            // Filtrage des pays en fonction du continent sélectionné
            filteredCountriesCodes = filteredCountriesCodes.filter(code => Country.getCountryByCode(code).continent === continent); 
        }
        if (language !== 'all') {
            // Filtrage des pays en fonction de la langue sélectionnée
            filteredCountriesCodes = filteredCountriesCodes.filter(code => Country.getCountryByCode(code).getLanguages().includes(Language.getLanguageByCode(language)));
        }
        if (name !== '') {
            // Filtrage des pays en fonction du nom de pays saisi
            // On utilise la méthode toLowerCase() pour ne pas tenir compte de la casse
            // On utilise la méthode includes() pour vérifier si le nom de pays saisi est contenu dans le nom du pays français ou anglais
            filteredCountriesCodes = filteredCountriesCodes.filter(code => Country.getCountryByCode(code).name['fr'].toLowerCase().includes(name.toLowerCase()) || Country.getCountryByCode(code).name['br'].toLowerCase().includes(name.toLowerCase()));
        }
        const filteredCountries = filteredCountriesCodes.reduce((acc, code) => {
            acc[code] = Country.getCountryByCode(code);
            return acc;
        }, {});
        return filteredCountries; // la liste des pays filtrés
    }
  }

  // Fonction pour remplir dynamiquement le selecteur des continents
function fillContinentsSelector(countryTable) {
    const continents = Object.keys(countryTable).reduce((acc, code) => {
        const continent = Country.getCountryByCode(code).continent;
        if (!acc.includes(continent)) {
            acc.push(continent);
        }
        return acc;
    }, []);
    const continentsSelector = document.getElementById('continent');
    continentsSelector.innerHTML = null;
    // Ajout de l'option "Tous"
    const optionAll = document.createElement('option');
    optionAll.value = 'all';
    optionAll.innerHTML = 'Tous';
    continentsSelector.appendChild(optionAll);
    // Ajout des autres options
    continents.forEach(continent => {
        const option = document.createElement('option');
        option.value = continent;
        option.innerHTML = continent;
        continentsSelector.appendChild(option);
    });
}

// Fonction pour remplir dynamiquement le selecteur des langues
function fillLanguagesSelector(countryTable) {
    const languages = Object.keys(countryTable).reduce((acc, code) => {
        const languages = Country.getCountryByCode(code).getLanguages();
        languages.forEach(language => {
            if (!acc.includes(language)) {
                acc.push(language);
            }
        });
        return acc;
    }, []);
    const languagesSelector = document.getElementById('language');
    languagesSelector.innerHTML = null;
    // Ajout de l'option "Toutes"
    const optionAll = document.createElement('option');
    optionAll.value = 'all';
    optionAll.innerHTML = 'Toutes';
    languagesSelector.appendChild(optionAll);
    // Ajout des autres options
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.code;
        option.innerHTML = language.name;
        languagesSelector.appendChild(option);
    });
}

// Fonction pour trier la liste des pays en fonction du nom
function sortByName(countryTable) {
    const sortedCountriesCodes = Object.keys(countryTable).sort((code1, code2) => {
        const name1 = Country.getCountryByCode(code1).name.fr;
        const name2 = Country.getCountryByCode(code2).name.fr;
        return name1.localeCompare(name2);
      });
    const sortedCountriesTable = sortedCountriesCodes.reduce((acc, code) => {
        acc[code] = Country.getCountryByCode(code);
        return acc;
    }, {});
    return sortedCountriesTable;
}

// Fonction pour trier la liste des pays en fonction de la population
function sortByPopulation(countryTable) {
    const sortedCountriesCodes = Object.keys(countryTable).sort((code1, code2) => {
        const population1 = Country.getCountryByCode(code1).population;
        const population2 = Country.getCountryByCode(code2).population;
        return population2 - population1;
    });
    const sortedCountriesTable = sortedCountriesCodes.reduce((acc, code) => {
        acc[code] = Country.getCountryByCode(code);
        return acc;
    }, {});
    return sortedCountriesTable;
}

// Fonction pour trier la liste des pays en fonction de la densité
function sortByDensity(countryTable) {
    const sortedCountriesCodes = Object.keys(countryTable).sort((code1, code2) => {
        const density1 = Country.getCountryByCode(code1).getPopDensity();
        const density2 = Country.getCountryByCode(code2).getPopDensity();
        return density2 - density1;
    });
    const sortedCountriesTable = sortedCountriesCodes.reduce((acc, code) => {
        acc[code] = Country.getCountryByCode(code);
        return acc;
    }, {});
    return sortedCountriesTable;
}

// Fonction pour trier la liste des pays en fonction de la superficie
function sortBySurface(countryTable) {
    const sortedCountriesCodes = Object.keys(countryTable).sort((code1, code2) => {
        const surface1 = Country.getCountryByCode(code1).superficie;
        const surface2 = Country.getCountryByCode(code2).superficie;
        return surface2 - surface1;
    });
    const sortedCountriesTable = sortedCountriesCodes.reduce((acc, code) => {
        acc[code] = Country.getCountryByCode(code);
        return acc;
    }, {});
    return sortedCountriesTable;
}

// Fonction pour trier la liste des pays en fonction du continent
function sortByArea(countryTable) {
    const sortedCountriesCodes = Object.keys(countryTable).sort((code1, code2) => {
        const area1 = Country.getCountryByCode(code1).continent;
        const area2 = Country.getCountryByCode(code2).continent;
        return area1.localeCompare(area2);
    });
    const sortedCountriesTable = sortedCountriesCodes.reduce((acc, code) => {
        acc[code] = Country.getCountryByCode(code);
        return acc;
    }, {});
    return sortedCountriesTable;
}

// Fonction pour trier la liste des pays 
function sortCountries(countryTable, currentTh) {
    switch (currentTh) {
        case 'thName':
            return sortByName(countryTable);
        case 'thPop':
            return sortByPopulation(countryTable);
        case 'thDensity':
            return sortByDensity(countryTable);
        case 'thSurface':
            return sortBySurface(countryTable);
        case 'thArea':
            return sortByArea(countryTable);
        default:
            return countryTable;
    }
}




document.addEventListener("DOMContentLoaded", () => {

    var continentFilter = document.getElementById('continent');
    var languageFilter = document.getElementById('language');
    var nameFilter = document.getElementById('name');
    var selectedContinent = "all";
    var selectedLanguage = "all";
    var selectedName = "";

    var thName = document.getElementById('thName');
    var thPop = document.getElementById('thPop');
    var thDensity = document.getElementById('thDensity');
    var thSurface = document.getElementById('thSurface');
    var thArea = document.getElementById('thArea');
    var currentTh = null;


    if(continentFilter && languageFilter && nameFilter) {
        continentFilter.addEventListener('change', () => {
            selectedContinent = continentFilter.value; // Récupération de la valeur sélectionnée
            countryTable = updateCountriesList(selectedContinent, selectedLanguage, selectedName); // Appel de la fonction pour mettre à jour la liste des pays en fonction du choix de l'utilisateur
            countryTable = sortCountries(countryTable, currentTh);
            fillPage25(0, countryTable);
            modalInit();
            // fillLanguagesSelector(countryTable);
        });

        languageFilter.addEventListener('change', () => {
            selectedLanguage = languageFilter.value; // Récupération de la valeur sélectionnée
            countryTable = updateCountriesList(selectedContinent, selectedLanguage, selectedName ); // Appel de la fonction pour mettre à jour la liste des pays en fonction du choix de l'utilisateur
            countryTable = sortCountries(countryTable, currentTh);
            fillPage25(0, countryTable);
            modalInit();
        }); 

        nameFilter.addEventListener('input', () => {
            selectedName = nameFilter.value; // Récupération de la valeur sélectionnée
            countryTable = updateCountriesList(selectedContinent, selectedLanguage, selectedName ); // Appel de la fonction pour mettre à jour la liste des pays en fonction du choix de l'utilisateur
            countryTable = sortCountries(countryTable, currentTh);
            fillPage25(0, countryTable);
            modalInit();
        } );
    }


    if(thName && thPop && thDensity && thSurface && thArea){

        thName.addEventListener('click', () => {
            if(currentTh != thName){
                currentTh = thName.id;
                // Trier les pays par nom
                countryTable = sortByName(countryTable);
                // Mettre en gras l'en-tête cliqué
                thName.style.fontWeight = "bold";
                // Réinitialiser le style des autres en-têtes de colonne
                thPop.style.fontWeight = "normal";
                thDensity.style.fontWeight = "normal";
                thSurface.style.fontWeight = "normal";
                thArea.style.fontWeight = "normal";
                // Remplir la page avec les 25 premiers pays
                fillPage25(0, countryTable);
                modalInit();
            }
        });
    
        thPop.addEventListener('click', () => {
            if(currentTh != thPop){
                currentTh = thPop.id;
                // Trier les pays par population
                countryTable = sortByPopulation(countryTable);
                // Mettre en gras l'en-tête cliqué
                thPop.style.fontWeight = "bold";
                // Réinitialiser le style des autres en-têtes de colonne
                thName.style.fontWeight = "normal";
                thDensity.style.fontWeight = "normal";
                thSurface.style.fontWeight = "normal";
                thArea.style.fontWeight = "normal";
                // Remplir la page avec les 25 premiers pays
                fillPage25(0, countryTable);
                modalInit();
            }
        });
    
        thDensity.addEventListener('click', () => {
            if(currentTh != thDensity){
                currentTh = thDensity.id;
                // Trier les pays par densité
                countryTable = sortByDensity(countryTable);
                // Mettre en gras l'en-tête cliqué
                thDensity.style.fontWeight = "bold";
                // Réinitialiser le style des autres en-têtes de colonne
                thName.style.fontWeight = "normal";
                thPop.style.fontWeight = "normal";
                thSurface.style.fontWeight = "normal";
                thArea.style.fontWeight = "normal";
                // Remplir la page avec les 25 premiers pays
                fillPage25(0, countryTable);
                modalInit();
            }
        });
    
        thSurface.addEventListener('click', () => {
            if(currentTh != thSurface){
                currentTh = thSurface.id;
                // Trier les pays par superficie
                countryTable = sortBySurface(countryTable);
                // Mettre en gras l'en-tête cliqué
                thSurface.style.fontWeight = "bold";
                // Réinitialiser le style des autres en-têtes de colonne
                thName.style.fontWeight = "normal";
                thPop.style.fontWeight = "normal";
                thDensity.style.fontWeight = "normal";
                thArea.style.fontWeight = "normal";
                // Remplir la page avec les 25 premiers pays
                fillPage25(0, countryTable);
                modalInit();
            }
        });
    
        thArea.addEventListener('click', () => {
            if(currentTh != thArea){
                currentTh = thArea.id;
                // Trier les pays par superficie
                countryTable = sortByArea(countryTable);
                // Mettre en gras l'en-tête cliqué
                thArea.style.fontWeight = "bold";
                // Réinitialiser le style des autres en-têtes de colonne
                thName.style.fontWeight = "normal";
                thPop.style.fontWeight = "normal";
                thDensity.style.fontWeight = "normal";
                thSurface.style.fontWeight = "normal";
                // Remplir la page avec les 25 premiers pays
                fillPage25(0, countryTable);
                modalInit();
            }
        });
    }





});



