let btn = document.body.querySelector('button')



const buttonAction = function() {
   if(navigator.geolocation) {
    detectLocalization() 
   } else {
    btn.innerText = "Your browser not support"
   }
}
const detectLocalization = function() {
    btn.innerText = "Allow to detect location"
    navigator.geolocation.getCurrentPosition(onSuccess,onError)
}
function onSuccess(position) {
    btn.innerText = "Detecting your location...."
    let { latitude, longitude } = position.coords; 

    callingAPI(latitude,longitude)
}
function callingAPI(latitude, longitude) {
let API_KEY = ''
let API_LINK = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`

    try {
        fetch(API_LINK).then(response=> response.json()).then(result=>{

            let allDetails = result.results[0].components
            let {county,postcode,country} = allDetails
            showLocalization(county,postcode,country)
            console.table(allDetails)
        })
    } catch(err) {
        btn.innerText = "Something went wrong"
    }
}
const showLocalization = function(county,postcode,country) {
    btn.innerText = `${county} ${postcode},${country}`
}


function onError(error) {
    if(error.code == 1) { // if user denied the request
        btn.innerText = "You denied the request"
    }
    else if(error.code == 2) { // location not available
        btn.innerText = "location not available"
    } else {
        btn.innerText = "Something went wrong"
    }
    btn.setAttribute('disable','true') // if user denied the request disable the mouse 
}


btn.addEventListener('click',buttonAction)