# Feladat

A build és működés megvalósítása az alábbi támpontok segítségével.

A projekt root folderében a megfelelő [node verzió](#node-version) beállítása után, npm install paranccsal tedd fel a Vue.js 3 környezetet.

A grafikai terv a ["Design"](#design) bekezdés alatt található linken érhető el. Az elemek figmában történő inspecteléséhez (amennyiben nem rendelkezel figma accounttal, illetve nem is szeretnél regisztrálni), g-mail fiókkal való belépés szükséges. 
Első lépésben szeretnénk látni a mobile first szemléletbeli pixel pontos builded a vue.js framework segítségével. 
A build megvalósításához lehet használi library-t, de kérünk, törekedj a minél lightweightebb megoldásra (pl.: bootstrap, csak bizonyos komponenseinek a behúzása a teljes elérhető könyvtár helyett).

A termékkártyákon található adatok feltöltéséhez az ["API"](#api) bekezdés alatt található végpontot használd.

Ahhoz, hogy minél tisztább képet kapjunk a vanilla.js tudásodról, kérlek törekedj a natív javascript megoldásokra, kerülve a packagek, kiegészítők használatát.

<br>

## Funkcionalitás

A terveken található "more products" felirathoz, wishlist gombhoz, színválasztó swatch-hoz, mennyiségváltó inputhoz és "add to cart" gombhoz ebben a feladatban nem tartozik működésbeli követelmény.

### Category

A kategória szűrést a terveken is látható 4 állapotra szükséges megvalósítani.

### Filter

Itt szeretnénk, ha az új és akciós termékekre egyaránt elkészülne a szűrés funkció. A terveken nem látszik, de elegendő egy natív select az optionök megjelenítéséhez.

<br>

## Design

[Figma link](https://www.figma.com/file/GDhg551sqnWt2ppOzgVG0T/FE-Pr%C3%B3bafeladat?node-id=0%3A1)

## API

[MockAPI link](https://63500f5078563c1d82b7d0ab.mockapi.io/oander-frontend/products)


## Node version

A projektet minimum v16.18.0 node verzióval inicializáld.

<br><br>
