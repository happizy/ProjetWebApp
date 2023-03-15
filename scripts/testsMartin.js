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

function moreTopLevelDomains(){
    let moreTopLevelDomainsTable = [];
    Object.keys(Country.all_countries).forEach(key => {
        let currentCountry = Country.getCountryByCode(key);
        if(currentCountry.topLevelDomain.length > 1) moreTopLevelDomainsTable.push(currentCountry);
    });
    return moreTopLevelDomainsTable;
}

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