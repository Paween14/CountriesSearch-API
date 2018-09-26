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

const searchInput = document.querySelector('.input-search');
const button = document.querySelector('.fa-search');
const wrapper = document.querySelector('.wrapper-area');
const tableBody = document.querySelector('tbody');

// =================================== Fetch function ===================================

const url = 'https://restcountries.eu/rest/v2/all';
fetch(url)
            //.then(checkStatus)
            .then(res => res.json())
            .then(countries => {
                //console.log(countryData(countries))
                countryData(countries);
                createBoxOfInfo(countriesInfo);
            })
 
// =================================== Helper functions ===================================
let countriesInfo = [];                     // **Collect all the data of each country in the array and each country in itself object

const countryData = arr => {
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

    //return createBoxOfInfo(countriesInfo);
    return countriesInfo;
}

const createBoxOfInfo = (countryArr) => {
    tableBody.innerHTML = '';
    let row;
    countryArr.forEach(country => {
        row = document.createElement('tr');
        const html = `
            <td><img src='${country.flag}' alt='${country.name}' width='100%'></td>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.population}</td>
            <td>${country.region}</td>
            <td>${country.subregion}</td>
            <td>${country.currency[0]} <br> ( ${country.currency[1
            ]} )</td>
            <td>${country.language}</td>
        `;
        row.innerHTML = html;
        tableBody.appendChild(row);

    })
}

const sortCountry = () => {
    let inputValue = searchInput.value.toLowerCase();

    if (inputValue.length === 1) {
        let firstChar = countriesInfo.filter((country) => {
            return country.name.toLowerCase()[0] == inputValue;     
        })
        createBoxOfInfo(firstChar);
    } else if (inputValue.length > 1) {
        let includingWord = countriesInfo.filter((country) => {
            let name =  country.name.toLowerCase().includes(inputValue);
            let capital =  country.capital.toLowerCase().includes(inputValue);
            let region =  country.region.toLowerCase().includes(inputValue);
            let subregion = country.subregion.toLowerCase().includes(inputValue);
            let currency = country.currency.join().toLowerCase().includes(inputValue);          //**currency and languages are in an array, so using .join() to convert to be string 
            let languages =  country.language.join().toLowerCase().includes(inputValue);
            return name || capital || region || subregion || currency || languages;              //***
            
            
        })
            //console.log(includingWord);   ---> for study how it works when it's searching
        createBoxOfInfo(includingWord);
    }  else {  //for empty string
        createBoxOfInfo(countriesInfo);
    }    
   
    // searchInput.value = '';    ----> because in this case, we don't have to clear the input value, when users type in, it won't clear automatically everytime
        //console.log(firstChar);
}

// =================================== Event listeners ===================================
searchInput.addEventListener('input', sortCountry);
button.addEventListener('click', sortCountry);

// =================================== Notes =============================================

/* // Countries which use 'English' language
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

/* // search how many regions there are in the world
const countRegions = (arr) => {
    let regions = [];
    arr.forEach((country) => {
      if(!regions.includes(country.region)){
        regions.push(country.region)
      }
      
    });
    return regions.length;
  
  } */

