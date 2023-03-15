
// Fonction qui créer des instances de la classe Country, Currency, Language avec les données countries_data
function fill_db(){
    // Création des instances de Country à partir des données JSON
    countries_data.forEach(countryData => {
        
        const country = new Country(
            countryData.alpha3Code,
            countryData.name,
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

fill_db();
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
