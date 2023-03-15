// Question 1 : Pays dont au moins un pays frontalier n’est pas dans le même continent.
function outsideTheContinent(){
    let result = [];
    Object.keys(Country.all_countries).forEach(code =>{
        let currentCountry = Country.getCountryByCode(code);
        let borders = Country.getCountryByCode(code).getBorders();
        borders.forEach(c => {
            if (c.continent != currentCountry.continent){
                if (!result.includes(currentCountry)) result.push(currentCountry);
            }
        })
    });
    return result;
}
console.log("Q1 : ");
console.log(outsideTheContinent());

// Question 2 : Pays (possibilité de plusieurs) ayant le plus grand nombre de voisins. Affichez aussi les voisins.
function moreNeighbors(){
    let moreNeighborsTable = [];
    let moreNeighborsNumber = 0;
    Object.keys(Country.all_countries).forEach(key => {
        let currentCountry = Country.getCountryByCode(key);
        if(currentCountry.getBorders().length > moreNeighborsNumber){
            moreNeighborsTable = [];
            moreNeighborsNumber = currentCountry.getBorders().length;
            moreNeighborsTable[currentCountry.alphaCode3] = currentCountry.getBorders();
        }else if(currentCountry.getBorders().length == moreNeighborsNumber){
            moreNeighborsTable[currentCountry.alphaCode3] = currentCountry.getBorders();
        }
    });
    return moreNeighborsTable;
}
console.log("Q2 : ");
console.log(moreNeighbors());

// Question 3 : Pays n’ayant aucun voisin.
function neighborless(){
    let result = [];
    Object.keys(Country.all_countries).forEach(code =>{
        let currentCountry = Country.getCountryByCode(code);
        if (currentCountry.getBorders().length == 0) result.push(currentCountry);
    });
    return result;
}
console.log("Q3 : ");
console.log(neighborless());

// Question 4 : Pays (possibilité de plusieurs) parlant le plus de langues. Affichez aussi les langues.
function moreLanguages(){
    let moreLanguagesTable = [];
    let moreLanguagesNumber = 0;
    Object.keys(Country.all_countries).forEach(key => {
        let currentCountry = Country.getCountryByCode(key);
        if(currentCountry.getLanguages().length > moreLanguagesNumber){
            moreLanguagesTable = [];
            moreLanguagesNumber = currentCountry.getBorders().length;
            moreLanguagesTable[currentCountry.alphaCode3] = currentCountry.getBorders();
        }else if(currentCountry.getLanguages().length == moreLanguagesNumber){
            moreLanguagesTable[currentCountry.alphaCode3] = currentCountry.getBorders();
        }
    });
    return moreLanguagesTable;
}
console.log("Q4 : ");
console.log(moreLanguages());

// Question 5 : Pays ayant au moins un voisin parlant l’une de ses langues. Affichez aussi les pays voisins et les langues en question.
function withCommonLanguage(){
    let result = [];
    Object.keys(Country.all_countries).forEach(code => {
        let currentCountry = Country.getCountryByCode(code);
        let borders = currentCountry.getBorders();
        borders.forEach(c => {
            let neighborLanguages = c.getLanguages();
            neighborLanguages.forEach(l => {
                if ((currentCountry.getLanguages().includes(l)) && !(result.includes(currentCountry))) result.push(currentCountry); 
            });
        });
    });
    return result;
}
console.log("Q5 : ");
console.log(withCommonLanguage());

// Question 6 : Pays sans aucun voisin ayant au moins une de ses monnaies.
function withoutCommonCurrency(){
    let withoutCommonCurrencyTable = [];
    Object.keys(Country.all_countries).forEach(key =>{
        let currentCountry = Country.getCountryByCode(key);
        let hasCommonCurrency = false;
        currentCountry.getBorders().forEach(neighbour => {
            if ((neighbour.getCurrencies().some(currency => currentCountry.getCurrencies().includes(currency)))){
                hasCommonCurrency = true;
            }
        });
        if(!hasCommonCurrency) withoutCommonCurrencyTable.push(currentCountry);
    });
    return withoutCommonCurrencyTable;
}
console.log("Q6 : ");
console.log(withoutCommonCurrency());

// Question 7 : Pays triés par ordre décroissant de densité de population.
function sortingDecreasingDensity() {
    const sortedCodes = Object.keys(Country.all_countries).sort((a, b) => {
      const popDensityA = Country.getCountryByCode(a).getPopDensity();
      const popDensityB = Country.getCountryByCode(b).getPopDensity();
      return popDensityB - popDensityA;
    });
    return sortedCodes;
  }
  

console.log("Q7 : sort by density");
console.log(sortingDecreasingDensity());

// Question 8 : Pays ayant plusieurs Top Level Domains Internet.
function moreTopLevelDomains(){
    let moreTopLevelDomainsTable = [];
    Object.keys(Country.all_countries).forEach(key => {
        let currentCountry = Country.getCountryByCode(key);
        if(currentCountry.topLevelDomain.length > 1) moreTopLevelDomainsTable.push(currentCountry);
    });
    return moreTopLevelDomainsTable;
}
console.log("Q8 : ");
console.log(moreTopLevelDomains());

/* Question 9 : En partant d’un pays donné (représenté ici par l’argument nom_pays), 
        listez tous les pays que l’on peut visiter en passant de l’un à l’autre. 
        Evidemment, seuls les pays frontaliers sont accessibles depuis un pays donné. */
function veryLongTrip(mon_pays) {
    let destinations = [];

    function recursif(pays) {
        if (pays) {
            if(!destinations.includes(pays.alphaCode3)){
                destinations.push(pays.alphaCode3);
                for (let voisin of pays.getBorders()) {
                    recursif(voisin);
                }
            } 
        }
    }

    recursif(mon_pays);

    return destinations;
}
console.log("Q9 : ");
console.log(veryLongTrip(Country.getCountryByCode("FRA")));

/* Question 9 complément : Essayez de trouver un exemple de pays depuis lequel on peut ainsi visiter le plus de pays.
         Vous ajouterez aussi un appel à la fonction veryLongTrip(nom_pays) en utilisant ce pays comme argument.*/
function mostDestinations(){
let currentMaxDestinations = [];
let currentMaxDestinationsNumber = 0;
Object.keys(Country.all_countries).forEach(key => {
    let currentCountry = Country.getCountryByCode(key);
    let trips = veryLongTrip(currentCountry);
    if(trips.length > currentMaxDestinationsNumber){
        currentMaxDestinations = [];
        currentMaxDestinationsNumber = trips.length;
        currentMaxDestinations[currentCountry.alphaCode3] = trips;
    }else if(trips.length == currentMaxDestinationsNumber){
        currentMaxDestinations[currentCountry.alphaCode3] = trips;
    }
});
return currentMaxDestinations;
}
console.log("Q9 complément : ");
console.log(mostDestinations());

// Les pays d'Amérique sont les pays depuis lesquels on peut visiter le plus de pays.
// On remarque que les pays frontaliers avec la Guyane Française ont la france dans leurs voisins. 
// Cependant, la France n'a pas les pays frontaliers de la Guyane Française dans ses voisins.
// C'est pourquoi on ne peut pas visiter le plus de pays depuis la France.