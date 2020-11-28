'use strict'

const clientId = "AXCPQVD13O0HH0XFPJHMILOP20NEQQ5KL4VT50OCUNSTNLLT";
const clientSecret = "0PYTJCICPFPARITIUQHRR2KOUW34DLQGVPA1JXWXI5R2EGSM";
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
            console.error(error)
        });
    }


function randomizeImage(){
    let lastIndex = 0;
    let theImage = document.getElementById('myimage');
				let imgDir = 'images/';
				let imgArray = new Array('croc.jpg','lion.jpg','elephant.jpg','gorilla.jpg','hippo.jpg', 'panda.jpg', 'rhino.jpg', 'tiger.jpg', 'zebra.jpg');
				let imgIndex = 0;
				
				if(imgArray.length > 1) {
					while(imgIndex == lastIndex) {
						imgIndex = Math.floor(Math.random() * imgArray.length);
					}
					lastIndex = imgIndex;
				
					let imgPath = imgDir + imgArray[imgIndex];
					
					theImage.src = imgPath;
					theImage.alt = imgArray[imgIndex];
				}
				else {
					return false;
				}
			}


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
            console.error(error)
        });
}

//displays the details of the results that link to other sites/displays
function displayDetails(responseJson){
    console.log(responseJson);
    
    $('#details').html(`
    ${responseJson.response.venue.name}<br>
    <a href="${responseJson.response.venue.canonicalUrl}">Learn More!</a><br>
    <a href="${responseJson.response.venue.url}">${responseJson.response.venue.url}</a>
    `)

}



//displays results of the search
function displayResults(responseJson) {
    console.log(responseJson);
    $('#results').empty();

    for (let i = 0; i < responseJson.response.venues.length; i++) {
        $('#results').append(`<li><h3><button onClick="getDetails('${responseJson.response.venues[i].id}')">
        ${responseJson.response.venues[i].name}</button></h3></li>`)
        console.log(responseJson.response.venues[i].url);
    }

    $('#js-display, #back-button').removeClass('hidden');
    $('#home, #js-form').addClass('hidden');

}

function homeButton() {
    $('#back-button').click(e => {
        e.preventDefault();

        $('#js-display, #back-button').addClass('hidden');
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