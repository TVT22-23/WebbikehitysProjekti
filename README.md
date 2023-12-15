# ShaggyShaggy-Movie Platform
Web-ohjelmoinnin sovellusprojekti, Ryhmä 23

## 1.	Johdanto

Projektiesittely käsittelee leffaharrastajille suunnatun web-sovelluksen kehittämistä. Projekti on toteutettu ”Web-ohjelmoinnin sovellusprojekti (15op)”-opintojaksolla Oulun ammattikorkeakoulussa osana toisen vuoden tieto- ja viestintätekniikan opintoja. Sovellus hyödyntää avoimen datan lähteitä, kuten TMDB:n (The Movie Database) ja Finnkinon tarjoamia rajapintoja. Sovellus tarjoaa käyttäjille monipuolisen ja kattavan alustan elokuvien tarkasteluun, arvosteluun ja leffatapahtumien seuraamiseen. Lisäksi käyttäjä pystyy luomaan omia ryhmiä tai liittymään olemassa oleviin ryhmiin ryhmänomistajan hyväksynnällä.

## 2.	Sovelluksen tarkoitus ja tavoitteet

Projektin päätavoitteena on luoda käyttäjäystävällinen verkkopalvelu, joka tarjoaa seuraavat keskeiset toiminnot:
-	käyttäjätilin luonti ja rekisteröinti
-	suodatettu haku
-	käyttäjän oman näkymän kustomointi ja jakaminen
-	elokuva-arvostelujen lisääminen ja selaaminen
-	ryhmien luonti ja hallinta
-	ryhmiin omien arvostelujen lisääminen
-	käyttäjän poistaminen
-	responsiivinen UI
-	elokuvien selaaminen
-	lempielokuvien tallennus omaan profiiliin

## 3.	Sovelluksen rakenne ja toiminnallisuudet

### 3.1. Tekninen rakenne

Sovelluksen toteutukseen valittiin React- ja Node.js-nimiset JavaScript-pohjaiset teknologiat, ja niillä rakennettin sovelluksen käyttöliittymä sekä backend-rakenne. Sovellus käyttää PostgreSQL-tietokantaa, joka on luotu Render-palvelussa. Framework on toteutettu käyttäen Express-teknologiaa. Visuaalinen ilme toteutettiin CSS:llä.


### 3.2. Avoimen datan lähteiden hyödyntäminen

Projektissa hyödynnetään seuraavia avoimen datan lähteitä:<br>

•	The Movie Database: sisältää suuren määrän elokuviin liittyvää avointa dataa TMDB:stä:
  - https://developer.themoviedb.org/reference/intro/getting-started
	
•	Finnkino API: tarjoaa tietoa uutisista ja eri elokuvateatterien esitysajoista ilman kirjautumista:
  - https://www.finnkino.fi/xml/

### 3.3. Käyttötapaukset ja toiminnallisuudet

Sovellus on tarkoitettu leffaharrastelijoille jakamaan elokuva-arvosteluja sekä löytämään uusia katsottavia elokuvia erilaisten ryhmien avulla. Käyttäjä voi liittyä olemassa oleviin ryhmiin, mikäli ryhmän omistaja hyväksyy liittymispyynnön tai käyttäjällä on mahdollisuus luoda oma ryhmä. Sovellus näyttää, jos tietty elokuva on tällä hetkellä suoratoistettavissa.

Käyttäjälle tärkeimmät toiminnallisuudet ovat oman tilin luominen ja sen kustomointi, elokuva-arvostelujen kirjoittaminen, ryhmäkanavilla arvostelujen ja uutisten jakaminen. 
Käyttäjä pystyy hakemaan elokuvia erilaisilla kriteereillä, kuten genre. 
Lisäksi sovelluksessa on responsiivinen käyttöliittymä, jonka pienin tuettava ikkunakoko on 600 pikseliä leveydeltä. 


## 4.	Projektin eteneminen ja toteutus

Ryhmä loi oman GitHub-organisaation, sinne säilytyspaikan, sekä Kanban-taulun auttamaan jäsentämään projektin etenemistä.

Alustettiin PostgreSQL-tietokanta sekä jaettiin ryhmäläisille omat tehtäväalueet. Ryhmä kokoontui yhteen ja määritteli koko projektin Kanban-tauluun, josta jokaiselle ryhmän jäsenelle asetettiin ensimmäiset tehtävät.

Ryhmä jakautui kahtia: toinen puoli ryhmästä aloitti käyttöliittymän suunnittelulla ja toinen toteutti REST-rajapinnan sovellukselle.
Projektipalavereja on järjestetty kerran viikossa sekä ylläpidetty kommunikointia päivittäin Discord-alustan kautta. Apua ja tukea on pyydetty sekä tarjottu matalalla kynnyksellä koko kehityksen ajan.

Tietokanta on toteutettu käyttäen Render-palvelua, ja tietokannan taulut on alustettu Visual Studio Coden (VSCode) puolella. VSCodessa Frontend-työryhmä on suunnitellut ja toteuttanut käyttöliittymän ja Backend-työryhmä puolestaan viimeistellyt tietokannan ja rajapinnan. Projektin edetessä jokainen ryhmän jäsen on kuitenkin kerryttänyt kokemusta Fullstack-roolissa.

Versionhallinnassa tuli ajoittain konflikteja, joita katsotiin ja ratkaistiin yhdessä. Samoin myös koodin kirjoittamisessa välillä huomattiin lievää sokeutta. Usein toinen silmäpari ja tehokas tauottaminen oli ratkaisu ongelmiin.


## 5.	Ohjelmistotestaus

Ohjelmistotestaus kohdistui REST-rajapintaan. Testit suoritettiin Mocha-, Chai- ja Supertest-kirjastoilla, sekä asynkronisilla funktioilla. Testaamisessa päädyttiin käyttämään ”beforeEach”- ja ”afterEach”-koukkuja (Hook), joilla varmistettiin esto testidatan talletuksesta tietokantaan asti. Testaamisessa oli haasteita, sillä jostakin syystä testidata löysi tiensä välillä tietokantaan asti. Tämä saatiin korjattua lisäämässä aikaa ennen aikakatkaisua.


## 6. Tekijät

- Parviainen Pekka
- Luhtasela Hannu
- Tuovinen Lauri
- Luhtala Eetu
- Alavilo Antti


## 7. Linkit

- Linkki palvelimelle: https://group23-webdevproj-shaggyshaggy.onrender.com/
- Linkki esittelyvideoon: https://www.youtube.com/watch?v=_W_ToXyTMug

