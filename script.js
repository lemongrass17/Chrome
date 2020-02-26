var allImagesOnPage = document.getElementsByTagName('img');

function getCoolImages() {
$.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=34c737fdc64936e6f309e73c6551a974&text=Candace%20Kucsulain&callback=?',
    success: function(data) {
    	let response = data.replace('jsonFlickrApi(', '');
    	response = response.substring(0, response.length - 1);
    	response = JSON.parse(response);
        $.each(response.photos.photo, (index, value) => {
			allImagesOnPage[index].src = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '.jpg';
			if (index + 1 === allImagesOnPage.length) {
				return false;
			}
		});
    },
    error: function(error) {
    	alert('Some shit happend');
    }
});
}

if (allImagesOnPage.length > 0) {
	getCoolImages();
} else {
	alert('No pictures');
}