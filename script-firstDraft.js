// Extract only the folloing keys from the countries json file
/*name,capital,population,region, subregion,languages,currencies, flag
*/
/* const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
    .then(response => response.json())
    .then(countries => {
		let div;
        countries.forEach(country => {
				div = document.createElement('div');
				div.textContent = country.name;
				document.body.appendChild(div)
        })
            
    }) */
// =====================================================================================
    
const wrapperBox = document.querySelector('.wrapper-area');

// =================================== Fetch function ===================================

const fetchData = url => {
    return fetch(url)
            //.then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem!', error))
}

/* const checkStatus = response => {
    if ( response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
} */

const url = 'https://restcountries.eu/rest/v2/all';

fetchData(url)
    .then(countries => {
        countryData(countries);
        console.log(countryData(countries));
    })

 
// =================================== Helper functions ===================================

let countriesInfo = [];                         // **Collect all the data of each country in the array and each country in itself object
const countryData = countries => {
    //console.log(countries);
    
        // Due to some countries having languages more than one, then loop through each country
    for (let country of countries) {

        let languages = [];
        for (let i = 0 ; i < country.languages.length ; i++) {
            languages.push(country.languages[i].name);
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

    }
}



const createBoxOfInfo = () => {
    let table;
    countriesInfo.forEach(country => {
        table = document.createElement('table');
        const html = `
        <tr>
            <td><img src='${country.flag}' alt='${country.name}' width='100%' ></td>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.population}</td>
            <td>${country.region}</td>
            <td>${country.subregion}</td>
            <td>${country.currency[0]} ( ${country.currency[1
            ]} )</td>
            <td>${country.language}</td>
        </tr>

        `;
        table.innerHTML = html;
        table.className ='each-country-box';
        wrapperBox.appendChild(table);

    })
}


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
    
})

/* const html = `
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
`; */