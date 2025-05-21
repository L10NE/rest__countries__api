`use strict`
const countryName = new URLSearchParams(location.search).get("name");
 window.backBtn = document.querySelector(`.back--btn`);

const countryDetails = document.querySelector(".country-details");
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(data => {
    data.forEach(country => {
      // console.log(country);
        const borders = country?.borders;
        // console.log(borders);
        const currencies = Object.values(country.currencies).map(c => c.name).join(", ");
        const population = new Intl.NumberFormat("en-US").format(country.population);
        const languages = Object.values(country.languages).join(", ");

      // First, clear previous content (if needed)
        countryDetails.innerHTML = "";


      // Create image
        const img = document.createElement("img");
        img.src = country.flags.svg;
        img.alt = "Flag";
        img.classList.add("country-details-img");

      // Create text container
        const textContainer = document.createElement("div");
        textContainer.classList.add("details-text-container");
        textContainer.innerHTML = `
        <h1 class="country-name">${country.name.common}</h1>
        <div class="details-text">
            <p><b>Native name:</b> ${country.name?.nativeName?.eng?.common ?? country.name.common}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Sub Region:</b> ${country.subregion}</p>
            <p><b>Capital:</b> ${country.capital[0]}</p>
            <p><b>Top Level Domain:</b> ${country.tld[0]}</p>
            <p><b>Currencies:</b> ${currencies}</p>
            <p><b>Languages:</b> ${languages}</p>
        </div>
        `;

      // Create borders section
        const bordersContainer = document.createElement("div");
        bordersContainer.classList.add("border-countries");

        const bordersLabel = document.createElement("p");

        // if borders exist::
        if(country.borders){
          bordersContainer.appendChild(bordersLabel);
          country.borders.forEach(border => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then( res => res.json())
            .then( ([borders]) => {          
              bordersLabel.textContent = borders.length > 1 ? "Border Countries: " : "Border Country: ";
              const a = document.createElement("a");
                a.href = "#";
                a.textContent = borders.name.common || `unknown`;
                a.classList.add(`border-link`);
                
                span.appendChild(a);
              })
            });
            const span = document.createElement("span");
            span.classList.add("borders");
            bordersContainer.appendChild(span);
          }
          
          // window.location.href = `/country.html?name=${borders.name.common}`;
      
      // Finally, append all to countryDetails
        countryDetails.appendChild(img);
        countryDetails.appendChild(textContainer);
        textContainer.appendChild(bordersContainer);
      });
    });


  backBtn.addEventListener(`click`, function(e){
    window.history.back();
});

const change = ()=>{
  headerContainer.classList.toggle(`header-dark`);
  main.classList.toggle(`dark`);
  backBtn.classList.toggle(`header-dark`);
};

if(localStorage.getItem(`darkMode`) === `enabled`){
  change()
}
toggleDarkBtn.addEventListener(`click`, function(){
  change();
});
