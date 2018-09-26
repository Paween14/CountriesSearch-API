    
const wrapperBox = document.querySelector('.wrapper-area');

// =================================== Fetch function ===================================
const url = 'https://restcountries.eu/rest/v2/all';
fetch(url)
            //.then(checkStatus)
            .then(res => res.json())
            .then(countries => {
                console.log(countryData(countries))
                countryData(countries);
            })


/* const checkStatus = response => {
    if ( response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
} */
 
// =================================== Helper functions ===================================

                       
const countryData = arr => {
    let countriesInfo = [];                     // **Collect all the data of each country in the array and each country in itself object
    //console.log(countries);

        arr.forEach((country) => {
            let languages = [];
            for (let language of country.languages) {
                    languages.push(language.name);
                }

            countriesInfo.push({name: country.name,
                capital: country.capital,
                population: country.population,
                region: country.region,
                subregion: country.subregion,
                language: languages,
                currency: [country.currencies[0].name, country.currencies[0].symbol],
                flag: country.flag
                                       
            });

        })

    return countriesInfo;
}



const createBoxOfInfo = () => {
    let div;
    countriesInfo.forEach(country => {
        div = document.createElement('div');
        const html = `
        <img src='${country.flag}' alt='${country.name}' width='50%' >
        <div class='info-wrapper'>
            <h4>${country.name}</h4>
            <p>Capital City: ${country.capital}<p>
            <p>Population: ${country.population}</p>
            <p>Continent: ${country.region} </p>
            <p>Subcontinent: ${country.subregion}</p>
            <p>Currency: ${country.currency[0]} ( ${country.currency[1
            ]} )</p>
            <p>Languages: ${country.language}</p>
        </div>
        `;
        div.innerHTML = html;
        div.className ='each-country-box';
        wrapperBox.appendChild(div);

    })
}

/* 
// Countries which use 'English' language
countriesInfo.forEach( country => {
    for(let i = 0 ; i < country.language.length ; i++) {
        if (country.language[i] == 'English') {
            console.log(country.name);
        }
    }
})

// Countries which use 'Euro' currency
countriesInfo.forEach(country => {
    if (country.currency[0]== 'Euro') {
        console.log(country.name)
    }
})

// how many region there are 
countriesInfo.forEach(country => {
    console.log(country.region);
    
}) */

