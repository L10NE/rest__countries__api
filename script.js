`use strict`
const toggleDarkBtn = document.querySelector(`.dark-mode`);
const headerContainer = document.querySelector(`.header-container`);
const countriesContainer = document.querySelector(`.countries-container`);
const main = document.querySelector(`.main`);
const regions = document.querySelector(`.regions`);
const filterBar = document.querySelector(`.filter`);
const searchBar = document.querySelector(`.search`);
const searchIcon = document.querySelector(`.search-icon`);
const input = document.querySelector(`.input`);
let allCountriesData = `https://restcountries.com/v3.1/all`

fetch(allCountriesData)
.then(function(rest){
    return rest.json();
}).then((data)=>{
    renderCountries(data);
    allCountriesData = data;
});

    function renderCountries(data){
        countriesContainer.innerHTML = '';
        return data.forEach(country => {
            const population = new Intl.NumberFormat("en-US").format(country.population);
            // console.log((country));
            const countryCard = document.createElement(`div`);
            countryCard.classList.add(`country-card`);
            // console.log(countryCard);
            countryCard.addEventListener(`click`, function(){
                window.location.href = `./country.html?name=${country.name.common}`;
                
            });
            
            
            const cardHTML = ` 
            <img src="${country.flags.svg}" alt="${country.flags.alt}">
            <div class="country-content">
            <h3 class="country-title">${country.name.common}</h3>
            <p><b>Population</b>&nbsp; ${population}</p>
                        <p><b>Region}</b> &nbsp; ${country.region}</p>
                        <p><b>Capital</b>&nbsp; ${country.capital}</p>
                    </div>
                `;
                countryCard.innerHTML = cardHTML;
                countriesContainer.append(countryCard)
            });
    };

    const run = ()=>{
        // toggle between `light and dark mode` 
        const changeUI = ()=>{
            filterBar.classList.toggle(`header-dark`);
            searchBar.classList.toggle(`header-dark`);
            input.classList.toggle(`header-dark`);
            searchIcon.classList.toggle(`header-dark`);
            regions.classList.toggle(`header-dark`);
            headerContainer.classList.toggle(`header-dark`);
            document.body.classList.toggle(`dark`);
            const isDark = document.body.classList.contains(`dark`);
            localStorage.setItem(`darkMode`, isDark ? `enabled` : `disabled`);
        };

        // save the tggled options to the localstorage::
        if(localStorage.getItem(`darkMode`) === `enabled`){
            changeUI();
        }

        // to make the regions visible when the user clicks  on the filter bar ::
        const region = (e)=>{
            const parent = e.target.closest(`.filter`);
            if(parent.classList.contains(`filter`)){
                regions.style.visibility = `visible`;
            };
        };

        // to focus on one particular region and reduce attention to the others ::
        const hoverRegions = function(e){
            const target = e.target; 
            if(target.classList.contains(`region`)){
                const siblings = target.closest(`.regions`).querySelectorAll(`.region`);
                
                siblings.forEach(link => {
                    if(target !== link){
                        link.style.opacity = this
                    }
                });
                };
        }

        // to make the text content of the fiter bar the same as the selsected region ::
        const activeRegions = function(e){
            const target = e.target; 
                if(!target.classList.contains(`region`)) return;
                document.querySelector(`.filter-text`).textContent = e.target.textContent;
        }

        // this function is to filter the countries according 
        // to the selected regions or continents;
        filterBar.addEventListener(`click`, function(e){
            const continent = document.querySelector(`.filter-text`).textContent
            if(continent === `Filter by Region`) return;
                
            fetch(`https://restcountries.com/v3.1/region/${continent}`)
            .then(function(rest){
                return rest.json();
            }).then(renderCountries);
        });

        //filter by search ::
        input.addEventListener(`input`, (e)=>{
            const text = e.target.value.tolowerCase();

            const filterCountries = allCountriesData.filter(function(country){
                return country.name.common.toLowerCase().includes(text)
            });
            renderCountries(filterCountries);
        });

        // closing the continent/regions bar using event delegation::
        document.body.addEventListener(`click`, function(e){
            const target = e.target;
            if(!target.closest(`.filter`)){
            regions.style.visibility = `hidden`;
            }
        });

        // the various evenlisteners button::
        toggleDarkBtn.addEventListener(`click`, function(){
            changeUI();
        });
        filterBar.addEventListener(`click`, region);
        regions.addEventListener(`mouseover`, hoverRegions.bind(0.5));
        regions.addEventListener(`mouseout`, hoverRegions.bind(1));
        regions.addEventListener(`click`, activeRegions);
    };
run();
