/*jshint esversion: 6 */
//rendering the map to the page
//code is derived and edited from google maps platform
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: {
            lat: 53.386809,
            lng: -6.265408
        }
    });

    // create label with string for the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // create an array which contains objects where the coffee shops located.
    const locations = [{
            lat: 53.394660,
            lng: -6.245100
        },
        {
            lat: 53.403470,
            lng: -6.343720
        },
        {
            lat: 53.354300,
            lng: -6.261570
        },       
    ];

    // create a new marker 
    const markers = locations.map((location, i) => {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
        });
    });

    // add a marker clusterer
    new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}