const { DOMParser } = require('xmldom');

// Gets news from given url and filters what is shown from the xml file.
async function getArticle(url, indexNum) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(resp => resp.text())
            .then(xmlText => {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                var newsElements = xmlDoc.getElementsByTagName('NewsArticle');
                if (newsElements.length > 0) {
                    if (indexNum !== undefined && indexNum >= 0 && indexNum < newsElements.length) {
                        var newsItem = newsElements[indexNum];
                        var title = newsItem.getElementsByTagName('Title')[0].textContent.trim();
                        var publishDate = newsItem.getElementsByTagName('PublishDate')[0].textContent.trim();
                        var article = newsItem.getElementsByTagName('HTMLLead')[0].textContent.trim();
                        console.log(`Title: ${title} \n Publish Date: ${publishDate} \n Article: ${article}`);
                        resolve({ title, publishDate, article });
                    } else {
                        for (var i = 0; i < newsElements.length; i++) {
                            var newsItem = newsElements[i];
                            var title = newsItem.getElementsByTagName('Title')[0].textContent.trim();
                            var publishDate = newsItem.getElementsByTagName('PublishDate')[0].textContent.trim();
                            var article = newsItem.getElementsByTagName('HTMLLead')[0].textContent.trim();
                            console.log(`Title: ${title} \n Publish Date: ${publishDate} \n Article: ${article}`);
                        }
                        reject(new Error('Index out of range.'));
                    }
                } 
            })
            .catch(reject);
    });
}

//Url used to getting news from finnkino. 
//getArticle('https://www.finnkino.fi/xml/News/', 9);
module.exports = {getArticle};