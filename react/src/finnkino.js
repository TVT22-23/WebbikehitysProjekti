const { DOMParser } = require('xmldom');

// Gets news from the given URL and filters what is shown from the XML file.
async function getArticle(url, indexNum) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(resp => resp.text())
            .then(xmlText => {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                var newsElements = xmlDoc.getElementsByTagName('NewsArticle');
                if (newsElements.length > 0) {
                    if (indexNum !== undefined && indexNum >= 0) {
                        var newsItem = newsElements[indexNum];
                        var title = newsItem.getElementsByTagName('Title')[0].textContent.trim();
                        var publishDate = newsItem.getElementsByTagName('PublishDate')[0].textContent.trim();
                        var article = newsItem.getElementsByTagName('HTMLLead')[0].textContent.trim();
                        var articleUrl = newsItem.getElementsByTagName('ArticleURL')[0].textContent.trim();
                        var imageURL = newsItem.getElementsByTagName('ImageURL')[0].textContent.trim();
                        resolve({ title, publishDate, article, articleUrl, imageURL });
                       
                    } else if (indexNum === undefined) {
                        var promises = [];

                        for (var i = 0; i < newsElements.length; i++) {
                            var newsItem = newsElements[i];
                            var title = newsItem.getElementsByTagName('Title')[0].textContent.trim();
                            var publishDate = newsItem.getElementsByTagName('PublishDate')[0].textContent.trim();
                            var article = newsItem.getElementsByTagName('HTMLLead')[0].textContent.trim();
                            var articleUrl = newsItem.getElementsByTagName('ArticleURL')[0].textContent.trim();
                            var imageURL = newsItem.getElementsByTagName('ImageURL')[0].textContent.trim();

                            promises.push(
                                new Promise((resolveArticle, rejectArticle) => {
                                    resolveArticle({ title, publishDate, article, articleUrl, imageURL});
                                
                                })
                            );
                        }
                        Promise.all(promises).then(dataArray => resolve(dataArray)).catch(reject);
                    }
                }
            })
    });
}

// Url used to get news from Finnkino.
getArticle('https://www.finnkino.fi/xml/News');
module.exports = { getArticle };