const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplashed API
const count = 5;
const query = 'old people';
const apiKey = 'NY8GQjeZy8TTYdmbnoeL-lsEuEJ_q4giqrbZukuVamQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=${query}`;

// heck if all images have loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; 
        count = 30;
    }
}

// Helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    // Run function for each object in photosArray
    photoArray.forEach((photo) => {
        // Create <a> to link to Unsplashed
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for Photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_descripton,
            title: photo.alt_descripton,
        });
        // Event listner, check when each is finished laoding 
        img.addEventListener('load', imageLoaded )
        // Put <img> inside <a>, the put both inside image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Get Photos form Unsplached API

async function getPhotos() {
    try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
    } catch (error) {
        // Cathch Error here
    }
 }

//  Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready= false;
        getPhotos();
    }
});

//  On load
getPhotos();