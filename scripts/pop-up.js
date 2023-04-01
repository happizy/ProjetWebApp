
function modalInit() {
    // Obtenez la modale
    var modal = document.getElementById("myModal");
    
    // Obtenez le bouton qui ouvre la modale
    var btn = document.querySelectorAll(".country");
    
    // Obtenez l'élément <span> qui ferme la modale
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal

    btn.forEach(function(element) {
        element.addEventListener('click', function() {
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
      
      // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function() {
        if (event.target == modal) {
            let modalInfo = document.querySelector('.modal-info');
            modalInfo.innerHTML = null;
            modal.style.display = "none";
        }
    });
}
