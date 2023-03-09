class Country {
    // Properties
    static all_countries = [];

    constructor(alphaCode3, name, capital, superficie, population, continent, flag, topLevelDomain, currencies, languages, borders, demonym){
        this._alphaCode3 = alphaCode3;
        this._name = name;
        this._capital = capital;
        this._superficie = superficie;
        this._population = population;
        this._continent = continent;
        this._flag = flag;
        this._topLevelDomain = topLevelDomain;
        this._currencies = currencies;
        this._languages = languages;
        this._borders = borders;
        this._demonym = demonym;
    }

// Getters
    get alphaCode3() {return this._alphaCode3;}

    get name() {return this._name;}

    get capital() {return this._capital;}

    get superficie() {return this._superficie;}

    get population() {return this._population;}

    get continent() {return this._continent;}
    
    get flag() {return this._flag;}
    
    get topLevelDomain() {return this._topLevelDomain;}
    
    get currencies() {return this._currencies;}
    
    get languages() {return this._languages;}
    
    get borders() {return this._borders;}
    
    get demonym() {return this._demonym;}


// Setters
    set alphaCode3(alphaCode3) {this._alphaCode3 = alphaCode3;}
    
    set name(name) {this._name = name;}
    
    set capital(capital) {this._capital = capital;}
    
    set superficie(superficie) {this._superficie = superficie;}
    
    set population(population) {this._population = population;}
    
    set continent(continent) {this._continent = continent;}
    
    set flag(flag) {this._flag = flag;}
    
    set topLevelDomain(topLevelDomain) {this._topLevelDomain = topLevelDomain;}
    
    set currencies(currencies) {this._currencies = currencies;}
    
    set languages(languages) {this._languages = languages;}
    
    set borders(borders) {this._borders = borders;}
    
    set demonym(demonym) {this._demonym = demonym;}





// Methods
    // get the country as a string
    toString() {
        return `Country: ${this._name} (${this._alphaCode3})`;
    }

    // get the population density (hab/km2)
    getPopDensity() {
        return this._population / this._superficie;
    }

    // get the borders as an array of Country objects
    // getBorders(){
    //     let borders = [];
    //     for (let i = 0; i < this._borders.length; i++) {
    //         let country = Country[this._borders[i]];
    //         borders.push(country);
    //     }
    //     return borders;
    // }
    getBorders(){
        let borders = [];
        for (let i = 0; i < this._borders.length; i++) {
            let country = Country.all_countries.find(c => c.alphaCode3 === this._borders[i]);
            borders.push(country);
        }
        return borders;
    }


}


// Fonction qui créer des instances de la classe Country avec le fichier JSON : countries.json
function fill_db(){
    // Récupération des données du fichier JSON avec fetch
    fetch('./countries.json')
    .then(response => response.json())
    .then(data => {
        // Création des instances de Country à partir des données JSON
        data.forEach(countryData => {
        const country = new Country(
            countryData.alpha3Code,
            countryData.name,
            countryData.capital,
            countryData.area,
            countryData.population,
            countryData.region,
            countryData.flag,
            countryData.topLevelDomain,
            countryData.currencies,
            countryData.languages,
            countryData.borders,
            countryData.demonym
        );
        Country.all_countries.push(country); // Stockage dans le tableau static de la classe Country
        });
    }).catch(error => console.error(error));
}

// Fonction qui affiche les informations de tous les pays
function display_all_countries(){
    const countriesContainer = document.getElementById('ici');
        const ulDivStart = document.createElement('div');
        ulDivStart.innerHTML = `<ul>`;
        countriesContainer.appendChild(ulDivStart);
        Country.all_countries.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.innerHTML = `<li>${country}</li>`;
            countriesContainer.appendChild(countryDiv);
        })
        const ulDivEnd = document.createElement('div');
        ulDivEnd.innerHTML = `<ul>`;
        countriesContainer.appendChild(ulDivEnd);
}




