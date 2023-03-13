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