class Currency{
    
    static all_currencies = [];
    
    constructor(code,nom,symbole){
        this.code = code;
        this.name = nom;
        this.symbol = symbole;
    }
    
    static fill_db(){

        fetch('./countries.json')
        .then(response => response.json())
        .then(data => {
            // Création des instances de Country à partir des données JSON
            data.forEach(countryData => {
                if(countryData.hasOwnProperty("currencies") > 0){
                    countryData.currencies.forEach(currency => {
                        var newCurrency = new Currency(
                            currency.code,
                            currency.name,
                            currency.symbol
                        );
                        Currency.all_currencies[newCurrency.code] = newCurrency; // Stockage dans le tableau static de la classe Country
                    });
                }
            })
        });
    }
    
    toString(){
        return this.code+";"+this.name+";"+this.symbol;
    }

}


Currency.fill_db();

