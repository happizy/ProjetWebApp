// Question 1 : Pays dont au moins un pays frontalier n’est pas dans le même continent.
function outsideTheContinent(){
    let result = [];
    Object.keys(Country.all_countries).forEach(code =>{
        let currentCountry = Country.getCountryByCode(code);
        let borders = Country.getCountryByCode(code).getBorders();
        borders.forEach(c => {
            if (Country.getCountryByCode(c).continent != currentCountry.continent){
                if (!result.includes(currentCountry)) result.push(currentCountry);
            }
        })
    });
    return result;
}
console.log(outsideTheContinent());

// Question 3 : Pays n’ayant aucun voisin.
function neighborless(){
    let result = [];
    Object.keys(Country.all_countries).forEach(code =>{
        let currentCountry = Country.getCountryByCode(code);
        if (currentCountry.getBorders().length == 0) result.push(currentCountry);
    });
    return result;
}
console.log(neighborless());

// Question 5 : 