class Language {
    // Properties
    static all_languages = [];

    constructor(name, code) {
        this._name = name;
        this._code = code;
    }

    // Getters
    get name() { return this._name; }
    get code() { return this._code; }

    // Setters
    set name(name) { this._name = name; }
    set code(code) { this._code = code; }

    // Methods
    // get the language as a string
    toString() {
        return `${this._name} (${this._code})`;
    }

    static getLanguageByCode(code) {
        return Language.all_languages[code];
    }

    static getNumberOfLanguages() {
        return Object.keys(Language.all_languages).length;
    }
}
