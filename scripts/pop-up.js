
function modalInit() {
    // Obtenez la modale
    var modal = document.getElementById("myModal");
    var modal2 = document.getElementById("myModal2");
    
    // Obtenez le bouton qui ouvre la modale
    var btn = document.querySelectorAll(".country");
    
    // Obtenez l'élément <span> qui ferme la modale
    var span = document.getElementsByClassName("close")[0];
    var span2 = document.getElementsByClassName("close")[1];
    // When the user clicks on the button, open the modal


    btn.forEach(function(element) {
        for (let index = 0; index < 5; index++) {
            element.cells[index].addEventListener('click', function() {
                let currentCountry = Country.getCountryByCode(element.id);
                let modalDetail = document.querySelector('.texte-detail');
                let modalFlag = document.querySelector('.flag-detail');

                let countryName = document.createElement('h1');
                countryName.innerHTML = "Nom : " + currentCountry.name.fr;
                modalDetail.appendChild(countryName);

                let countryPop = document.createElement('h1');
                countryPop.innerHTML = "Population : " + currentCountry.population;
                modalDetail.appendChild(countryPop);

                let countryArea = document.createElement('h1');
                countryArea.innerHTML = "Superficie : " + currentCountry.superficie;
                modalDetail.appendChild(countryArea);

                let countryDensity = document.createElement('h1');
                countryDensity.innerHTML = "Densité : " + currentCountry.getPopDensity().toFixed(3);
                modalDetail.appendChild(countryDensity);

                let countryContinent = document.createElement('h1');
                countryContinent.innerHTML = "Continent : " + currentCountry.continent;
                modalDetail.appendChild(countryContinent);

                let countryCapital = document.createElement('h1');
                countryCapital.innerHTML = "Capitale : " + currentCountry.capital;
                modalDetail.appendChild(countryCapital);

                let countryLanguages = document.createElement('div');
                countryLanguages.innerHTML = "<h1>Langues : </h1>";
                currentCountry.getLanguages().forEach(function(element) {
                    let language = document.createElement('h2');
                    language.innerHTML = element.name;
                    countryLanguages.appendChild(language);
                });
                modalDetail.appendChild(countryLanguages);

                let countryCurrencies = document.createElement('div');
                countryCurrencies.innerHTML = "<h1>Devises : </h1>";
                currentCountry.getCurrencies().forEach(function(element) {
                    let currency = document.createElement('h2');
                    currency.innerHTML = element.name + " (" + element.symbol + ")";
                    countryCurrencies.appendChild(currency);
                });
                modalDetail.appendChild(countryCurrencies);
                
                let countryFlag = document.createElement('img');
                countryFlag.src = currentCountry.flag;
                modalFlag.appendChild(countryFlag);

                modal2.style.display = "block";
            });
        }
        element.cells[5].addEventListener('click', function() {
            modal.style.display = "block";
            let currentCountry = Country.getCountryByCode(element.id);
            let modalInfo = document.querySelector('.modal-info');

            //adds the flag to the modal of the current country to the modal
            let flag = document.createElement('img');
            flag.src = currentCountry.flag;
            let countryName = document.createElement('h1');
            countryName.innerHTML = currentCountry.name.fr;
            modalInfo.appendChild(countryName);
            modalInfo.appendChild(flag);
        });
    });
      
    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function() {
        let modalInfo = document.querySelector('.modal-info');
        modalInfo.innerHTML = null;
        modal.style.display = "none";
    });

    span2.addEventListener('click', function() {
        let modalDetail = document.querySelector('.texte-detail');
        let modalFlag = document.querySelector('.flag-detail');
        modalDetail.innerHTML = null;
        modalFlag.innerHTML = null;
        modal2.style.display = "none";
    });
      
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function() {
        if (event.target == modal) {
            let modalInfo = document.querySelector('.modal-info');
            modalInfo.innerHTML = null;
            modal.style.display = "none";
        }else if(event.target == modal2){
            let modalDetail = document.querySelector('.texte-detail');
            let modalFlag = document.querySelector('.flag-detail');
            modalDetail.innerHTML = null;
            modalFlag.innerHTML = null;
            modal2.style.display = "none";
        }
    });
}
