'use strict'

const clientId = "MHUNL1WL0WB5LTESOLGTCOC0DJS0X1AXQC12I1KOQ3JLIDHU";
const clientSecret = "HUMXM211TTXEJDANWIFG1NT2RG1LDFSTVDRUB25TLWMJD30Z";
const baseUrl = "https://api.foursquare.com/v2/venues/search";


//organizes query paramters and formats them
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

//prepares final Url to be fetched and yeilds the response
function getLink(input) {
    const params = {
        near: input,
        client_id: clientId,
        client_secret: clientSecret,
        query: 'zoo',
        v: '20201120'
    };
    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            console.error('Something is wrong!');
            console.error(error);
            $('#details').append('Sorry, something went wrong, try again later.')
        });
    }



//Uses a second endpoint to prepare the details of our results to get displayed and makres the Url based on parameters

function getDetails(venueId){
    const params = {
        client_id: clientId,
        client_secret: clientSecret,
        v: '20201120'
    
    };
    const queryString = formatQueryParams(params)
    const url = `https://api.foursquare.com/v2/venues/${venueId}` + '?' + queryString;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayDetails(responseJson))
        .catch(error => {
            console.error('Something is wrong!');
            console.error(error);
            $('#details').html('Sorry, there are no zoos in your city.')
        });
}

//displays the details of the results that link to other sites/displays
function displayDetails(responseJson){
    console.log(responseJson);

    
    $('#details').html(`
    ${responseJson.response.venue.name}<br>
    <a href="${responseJson.response.venue.canonicalUrl}">Learn More!</a><br>
    <a href="${responseJson.response.venue.url}">${responseJson.response.venue.url}</a><br>    
    `)
    

}



//displays results of the search
function displayResults(responseJson) {
    console.log(responseJson);
    $('#results').empty();
    $('#details').empty();

    $('#js-display, #back-button, #details').removeClass('hidden');
    $('#home, #js-form').addClass('hidden');

    if(responseJson.meta.code===400){
        $('#results').append('Sorry, something went wrong.')
        return 
    }
    for (let i = 0; i < responseJson.response.venues.length; i++) {
        $('#results').append(`<li><h3><a href="#details"><button onClick="getDetails('${responseJson.response.venues[i].id}')" >
        ${responseJson.response.venues[i].name}</button></a></h3></li>`)
        console.log(responseJson.response.venues[i].url);
    }

   

}

//home button to take you back to the first page where you can enter a new city
function homeButton() {
    $('#back-button').click(e => {
        e.preventDefault();

        $('#js-display, #back-button, #details, nicelook').addClass('hidden');
        $('#home, #js-form').removeClass('hidden');
    })
  
}




//function for the listening of the submission event of city/state
function watchForm() {
    $('#js-form').submit(e => {
        e.preventDefault();
        let input = $('#city-state').val();
        e.target.reset();
        getLink(input);

    })
    homeButton();

}

$(watchForm)
