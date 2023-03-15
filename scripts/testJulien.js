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
let result = sortingDecreasingDensity();
result.forEach(c => {
    let currentCountry = Country.getCountryByCode(c);
    console.log(currentCountry.name.fr + " : " + currentCountry.getPopDensity());
});
