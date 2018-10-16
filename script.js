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
const searchButton = document.querySelector('.fa-search');
const wrapper = document.querySelector('.wrapper-area');
const tableBody = document.querySelector('tbody');
const sortName  = document.querySelector('.country-name-sort');
const sortCap = document.querySelector('.capital-sort');
const sortPop = document.querySelector('.pop-sort');
const continentSelect = document.querySelector('.option-continent');

//const test = document.querySelector('.country-name-sort');
// =================================== Fetch function ===================================

const url = 'https://restcountries.eu/rest/v2/all';
fetch(url)
            //.then(checkStatus)
            .then(res => res.json())
            .then(countries => {
                //console.log(countryData(countries))
                countryData(countries);
                createBoxOfInfo(countriesInfo);
                regionDropdownMenu(countriesInfo);
            })
 
// =================================== Functionalities ===================================
let countriesInfo = [];                                 // **(Optional: because 'countryData' returns array too)Collect all the data of each country in the array and each country in itself object

const countryData = arr => {
    //console.log(countries);

        arr.forEach((country) => {
            // Destructuring
            let { name,
                capital,
                population,
                region,
                subregion} = country

            let languages = [];    
            for (let language of country.languages) {
                    languages.push(language.name);
            }

            countriesInfo.push({
                name,
                capital,
                population,
                region,
                subregion,
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
        let populationWithCommas = numberWithCommas(country.population);

        row = document.createElement('tr');
        const html = `
            <td><img src='${country.flag}' alt='${country.name}' width='100%'></td>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${populationWithCommas}</td>
            <td>${country.region}</td>
            <td>${country.subregion}</td>
            <td>${country.currency[0]} <br> ( ${country.currency[1]} )</td>
            <td>${country.language.join(',<br>')}</td>
        `;
        row.innerHTML = html;
        tableBody.appendChild(row);
    })
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

// Create the select menu from what region there are around the world
const regionDropdownMenu = (arr) => {
    let regions = [];
    arr.forEach((country) => {
      if(!regions.includes(country.region)){
        regions.push(country.region)
      }
    });
    //return regions;

    continentSelect.innerHTML = '';
    let firstOpt = document.createElement('option');
    firstOpt.innerHTML = 'Continent';
    continentSelect.appendChild(firstOpt);
    regions.forEach((region) => {
       let option = document.createElement('option');
       option.innerHTML = region; 
       option.value = region;
       continentSelect.appendChild(option); 
    })
}

const selectedRegion = () => {
    // To sort the countries by selected region
    let selectedOpt = continentSelect.options[continentSelect.selectedIndex].value;
    //console.log(selectedOpt);
    
    let selectedRegion = countriesInfo.filter((country) => {
        if (selectedOpt == 'Continent') {
            return countriesInfo;
        }
        return country.region == selectedOpt;
    })
    createBoxOfInfo(selectedRegion);
    return selectedRegion;
}

// Search function which takes input.value to match the results
const searchCountry = () => {
    let inputValue = searchInput.value.toLowerCase();
    let selectedRegionInfo = selectedRegion();                  // So, user can search info from selected region.

    if (inputValue.length == 1) {
        let firstChar = selectedRegionInfo.filter((country) => {
            return country.name.toLowerCase()[0] == inputValue;     
        })
        createBoxOfInfo(firstChar);
    } else if (inputValue.length > 1) {
        let includingWord = selectedRegionInfo.filter((country) => {
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
        createBoxOfInfo(selectedRegionInfo);
    }    
    // searchInput.value = '';    ----> because in this case, we don't have to clear the input value, when users type in, it won't clear automatically everytime
        //console.log(firstChar);
}

// Country Name sort function
const countryNameAscen = () => {
    let selectedRegionInfo = selectedRegion();
    let sortCountryName = selectedRegionInfo.sort((a, b) => 
        //a.name == b.name ? 0 : a.name < b.name ? -1 : 1
        a.name.localeCompare(b.name)
    );
    createBoxOfInfo(sortCountryName);
    //test.classList.remove('fa-sort-up');        // delete all the classes in the element
    //test.classList.add('fa-sort-down');
    sortName.removeEventListener('click', countryNameAscen);
    sortName.addEventListener('click', countryNameDescen);
    return sortCountryName;
}

const countryNameDescen = () => {
    let selectedRegionInfo = selectedRegion();
    let sortCountryName = selectedRegionInfo.sort((a, b) => 
        //a.name == b.name ? 0 : a.name > b.name ? -1 : 1
        b.name.localeCompare(a.name)
    );
    createBoxOfInfo(sortCountryName);
    //test.classList.remove('fa-sort-down');
    //test.classList.add('fa-sort-up');
    sortName.removeEventListener('click', countryNameDescen);
    sortName.addEventListener('click', countryNameAscen);
    return sortCountryName;
}

// Capital Name sort function
const capitalAscen = () => {
    let selectedRegionInfo = selectedRegion();
    let sortCapitalName = selectedRegionInfo.sort((a, b) => 
        a.capital.localeCompare(b.capital)
    );
    createBoxOfInfo(sortCapitalName);
    sortCap.removeEventListener('click', capitalAscen);
    sortCap.addEventListener('click', capitalDescen);
    return sortCapitalName;
}

const capitalDescen = () => {
    let selectedRegionInfo = selectedRegion();
    let sortCapitalName = selectedRegionInfo.sort((a, b) => 
        b.capital.localeCompare(a.capital)
    );
    createBoxOfInfo(sortCapitalName);
    sortCap.removeEventListener('click', capitalDescen);
    sortCap.addEventListener('click', capitalAscen);
    return sortCapitalName;
}

/* const countryNameDescen = (property) => {
    let selectedRegionInfo = selectedRegion();
    let sortCountryName = selectedRegionInfo.sort((a, b) => {
        if (property == 'name') {
            a.name == b.name ? 0 : a.name > b.name ? -1 : 1
        } else {
            a.capital == b.capital ? 0 : a.capital > b.capital ? -1 : 1
        }
    });
    createBoxOfInfo(sortCountryName);
    return sortCountryName;
} */

// Population sort function
const sortPopulationDescen = () => {
    let selectedRegionInfo = selectedRegion();           // return countries which in that region which is selected
        //console.log(selectedRegionInfo);
    
    let sortPop = selectedRegionInfo.sort((a, b) => b.population - a.population)
    createBoxOfInfo(sortPop);
    return sortPop;
}

const sortPopulationAscen = () => {
    let selectedRegionInfo = selectedRegion();  
    let sortPop = selectedRegionInfo.sort((a, b) => a.population - b.population)
    createBoxOfInfo(sortPop);
    return sortPop;
}

// =================================== Event listeners ===================================
let clickCount1 = 0;
searchInput.addEventListener('input', searchCountry);
searchButton.addEventListener('click', searchCountry);
sortName.addEventListener('click', countryNameAscen);
sortCap.addEventListener('click', capitalAscen);
sortPop.addEventListener('click', () => {
    //let clickCount = 0;    ---- problem: 'clickCount' has to be in global scope
    if ( clickCount1%2 == 0 ) {
        sortPopulationDescen();
    } else {
        sortPopulationAscen();
    }
        //console.log(clickCount1);
    clickCount1++;
});
continentSelect.addEventListener('click', selectedRegion);

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

/*  --- sort character 
        array.sort(function(a, b){
            var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
            if (nameA < nameB) //sort string ascending
            return -1;
            if (nameA > nameB)
            return 1;
            return 0; //default return value (no sorting)
        });

        countriesInfo.sort((a, b) => a.name !== b.name ? a.name > b.name ? -1 : 1 : 0);

        user.sort(function(a, b){
            return a.firstname == b.firstname ? 0 : a.firstname < b.firstname ? -1 : 1;
        }) */
