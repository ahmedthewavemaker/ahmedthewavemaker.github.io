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
        .then(repsponseJson => console.log(repsponseJson))
}



//function for the listening of the submission event of city/state
function watchForm() {
    $('#js-form').submit(e => {
        e.preventDefault();
        let input = $('#city-state').val();
        getLink(input);
        
    })


}

$(watchForm)