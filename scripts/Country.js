class Country {
    // Properties
    static all_countries = [];

    constructor(alphaCode3, name, capital, superficie, population, continent, flag, topLevelDomain, currencies, languages, borders, demonym){
        this._alphaCode3 = alphaCode3;
        this._name = {
            fr : name.fr,
            br : name.br,
            de : name.de,
            it : name.it,
            es : name.es
        };
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
        if (!this._superficie) return -1;
        else return this._population / this._superficie;
    }

    // get the country's neighbours
    getBorders(){
        let borders = [];
        if (this._borders != undefined){ 
            for (let i = 0; i < this._borders.length; i++) {
                let neighbor = this._borders[i];
                borders.push(Country.getCountryByCode(neighbor));
            }
        };
        return borders;
    }
    
    getCurrencies(){
        let countryCurrencies = [];
        this.currencies.forEach(currency => {
            countryCurrencies.push(Currency.getCurrencyByCode(currency));
        });
        return countryCurrencies;
    }

    getLanguages(){
        let countrylanguages = [];
        this.languages.forEach(language => {
            countrylanguages.push(Language.getLanguageByCode(language));
        });
        return countrylanguages;
    }

    static getCountryByCode(code){
        return Country.all_countries[code];
    }

    static getNumberOfCountries(){
        return Object.keys(Country.all_countries).length;
    }

    
}


