const { DOMParser } = require('xmldom');

// Gets news from given url and filters what is shown from the xml file.
function getNews(url) {
    fetch(url).then(resp => {return resp.text();}).then(xmlText => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlText, 'text/xml');

           
            var newsElements = xmlDoc.getElementsByTagName('NewsArticle');
            if (newsElements.length > 0) {
                for (var i = 0; i < newsElements.length; i++) {
                    var newsItem = newsElements[i];
                    var title = newsItem.getElementsByTagName('Title')[0].textContent.trim();
                    var publishDate = newsItem.getElementsByTagName('PublishDate')[0].textContent.trim();
                    var article = newsItem.getElementsByTagName('HTMLLead')[0].textContent.trim();

                    console.log(`Title: ${title} \n Publish Date: ${publishDate} \n Article: ${article}`);
                }
            } else {
                console.error('No "NewsArticle" elements found in the XML.');
            }
        })
}

//Url used to getting news from finnkino. 
//getNews('https://www.finnkino.fi/xml/News/');
module.exports = {getNews};