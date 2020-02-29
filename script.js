function jsonpToJson(jsonp) {
    if (jsonp !== null && jsonp.length > 0) {
        return JSON.parse(jsonp.replace(/^[^(]*\(/, '').replace(/\);?$/, ''))
    }
    return null;
}

function loadImages() {
    const apiUrl = 'https://api.flickr.com/services/rest/?';
    $.ajax({
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
        },
        success : (response) => {
            console.log(jsonpToJson(response));
        },
        error : (error) => {
            console.log(error);
        }
    });
}
