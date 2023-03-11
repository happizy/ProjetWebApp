class Currency{
    
    static all_currencies = [];
    
    constructor(code,name,symbole){
        this._code = code;
        this._name = name;
        this._symbol = symbole;
    }

    //getters
    get code() {return this._code;}
    get name() {return this._name;}
    get symbol() {return this._symbol;}

    //setters
    set code(code) {this._code = code;}
    set name(name) {this._name = name;}
    set symbol(symbol) {this._symbol = symbol;}
    
    toString(){
        return this._code+";"+this._name+";"+this._symbol;
    }

    static getCurrencyByCode(code){
        return Currency.all_currencies[code];
    }

}

