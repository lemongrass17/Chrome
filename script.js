let imagesFromFlickr = [];
let imagesFromPage = [];

function showPopup() {
    let popUpImage = document.createElement('img');
    popUpImage.src = chrome.runtime.getURL('img/gingerPopup.png');
    popUpImage.classList.add('gingerPopup');
    document.body.append(popUpImage);
}

function jsonpToJson(jsonp) {
    if (jsonp !== null && jsonp.length > 0) {
        return JSON.parse(jsonp.replace(/^[^(]*\(/, '').replace(/\);?$/, ''));
    }
    return null;
}

function getImgUrl(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
}

function sendRequest() {
    const apiUrl = 'https://api.flickr.com/services/rest/?';
    return $.ajax({
        url : apiUrl,
        type : 'GET',
        dataType : 'text',
        data : {
            method : 'flickr.photos.search',
            format : 'json',
            api_key : '34c737fdc64936e6f309e73c6551a974',
            text : 'Candace Kucsulain',
            media : 'photos',
            page : '1',
            per_page : '500'
        }
    });
}

$(window).on('load', () => {
    sendRequest().done((response) => {
        showPopup();
        imagesFromFlickr = jsonpToJson(response).photos.photo;
        let newImagesFromPage = [];
        let imgWidth;
        let imgHeight;
        setInterval(() => {
            newImagesFromPage = document.querySelectorAll('img:not(.gingerPopup');
            if (newImagesFromPage.length > imagesFromPage.length) {
                imagesFromPage = newImagesFromPage;
                $.each(imagesFromPage, (index, image) => {
                    imgWidth = image.clientWidth;
                    imgHeight = image.clientHeight;
                    image.src = getImgUrl(imagesFromFlickr[index]);
                    image.width = imgWidth;
                    image.height = imgHeight;
                }); 
            }
        }, 5000);
    });
});
