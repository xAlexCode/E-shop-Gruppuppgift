# Produkter (P)

## 04: Se alla viner
**Owner:** Produkter   **User stories:** P1   **Blocked by:** 01

### What to build
En besökare ser alla viner som kort på `/viner`, sorterade på namn, och kan klicka sig vidare till ett vin. Ticketen bygger touchpointen `ProductCard`: bild, land, typ, årgång (eller "Utan årgång"), namn, producent och pris, i mockupens stil. A och O lägger senare in sina knappar i kortet (avtalat i touchpoints). På mobil har griden en kolumn, på dator tre till fyra.

### Acceptance criteria
- [ ] `/viner` visar alla viner som kort med bild, land, typ, årgång, namn, producent och pris
- [ ] Ett klick på ett kort öppnar `/viner/[slug]` för det vinet
- [ ] Listan är sorterad på namn A–Ö
- [ ] Felfall: ett vin utan årgång visar "Utan årgång" på kortet

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 06: Filtrera, sortera och söka
**Owner:** Produkter   **User stories:** P2   **Blocked by:** 04

### What to build
En besökare kan smalna av listan på `/viner` med vintyp, land, druva och pris, sortera den och söka. Allt ligger i URL:en, så en filtrerad lista går att dela som länk och fungerar utan JavaScript. Sidan visar antal träffar, chips för aktiva filter och "Rensa". På mobil fälls filterpanelen ihop under rubriken "Filter".

### Acceptance criteria
- [ ] `/viner?typ=rott` visar bara röda viner, och rubriken blir "Rött"
- [ ] `/viner?land=frankrike&pris=150-250` visar bara franska viner för 150–250 kr
- [ ] Prisintervallen är under 100, 100–150, 150–250, 250–500 och 500+
- [ ] `/viner?druva=…` visar bara viner med den druvan
- [ ] `/viner?sort=pris-asc` och `sort=pris-desc` sorterar på pris; utan `sort` sorteras på namn A–Ö
- [ ] `/viner?q=rioja` visar viner där namn, producent, druva eller matpassning innehåller "rioja"
- [ ] Sidan visar antal träffar, ett chip per aktivt filter (ett klick tar bort just det filtret) och länken "Rensa" till `/viner`
- [ ] Felfall: filter utan träffar visar "Inga viner matchar dina filter" och en länk som rensar filtren

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 07: Produktsidan
**Owner:** Produkter   **User stories:** P3   **Blocked by:** 01

### What to build
En besökare öppnar ett vin på `/viner/[slug]` och ser allt om det, i mockupens stil: land och region, namn, producent och årgång, beskrivning, druva, volym och alkoholhalt, pris, smakstaplar och matpassning. Fält utan värde döljs. Sidan visar snittbetyg och antal recensioner, och har en titel i fliken för sökmotorer. O lägger in "Lägg i varukorg" i 11, A lägger in hjärtat i 17 och recensionerna kommer i 09.

### Acceptance criteria
- [ ] `/viner/[slug]` visar land och region, namn, producent, årgång, beskrivning, druva, volym, alkoholhalt, pris och matpassning
- [ ] Fyllighet, sötma, strävhet och fruktsyra visas som staplar med fem steg, en per ifyllt värde
- [ ] Fält utan värde visas inte
- [ ] Sidans titel i fliken är "<vinets namn> <årgång> | Korka Upp"
- [ ] Sidan visar snittbetyget med en decimal och antalet recensioner, eller inget betyg om vinet saknar recensioner
- [ ] Felfall: `/viner/finns-inte` svarar `404`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 08: Startsidan
**Owner:** Produkter   **User stories:** P4   **Blocked by:** 04

### What to build
En besökare möts av startsidan från mockupen: hero med sökfält och "Utforska alla viner", de sju typerna som cirklar, de fyra senast tillagda vinerna som kort, de två samlingskorten och avsnittet "En god historia i varje flaska". Texterna om fri frakt tas bort.

### Acceptance criteria
- [ ] `/` visar hero med sökfält; en sökning på "rioja" leder till `/viner?q=rioja`
- [ ] De sju typerna visas som cirklar som länkar till `/viner?typ=…`
- [ ] De fyra senast tillagda vinerna visas som kort, och "Se alla viner" leder till `/viner`
- [ ] Kortet "Stora röda. Små priser." leder till `/viner?typ=rott&pris=100-150`
- [ ] Kortet "Goda viner. Glödande kvällar." leder till `/viner?q=grill`
- [ ] Felfall: en samlingslänk utan träffar visar "Inga viner matchar dina filter" på `/viner`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 09: Recensera ett vin
**Owner:** Produkter   **User stories:** P5   **Blocked by:** 02, 03, 07

### What to build
En inloggad kund som har köpt ett vin kan ge det ett betyg 1–5 och en valfri text på produktsidan, och recensionen syns direkt under "Omdömen". Andra ser en förklaring i stället för formuläret: utloggade uppmanas logga in, och inloggade som inte köpt vinet får veta att de behöver köpa det först. Servern kontrollerar köpet med `hasPurchased()` och att kunden inte redan recenserat vinet.

### Acceptance criteria
- [ ] En kund som köpt vinet ser ett formulär med betyg 1–5 och en valfri text (max 1 000 tecken)
- [ ] `POST /api/reviews` med giltigt betyg svarar `201`, och recensionen syns direkt på produktsidan med förnamn och datum, nyast först
- [ ] En utloggad besökare ser "Logga in för att skriva ett omdöme" och en knapp till `/logga-in`
- [ ] En inloggad kund som inte köpt vinet ser "Köp vinet för att kunna recensera det."
- [ ] Felfall: `POST /api/reviews` för ett vin kunden inte köpt svarar `403`
- [ ] Felfall: en andra recension av samma vin svarar `409`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 10: Mina recensioner
**Owner:** Produkter   **User stories:** P6   **Blocked by:** 02, 05

### What to build
En inloggad kund ser alla sina recensioner på `/konto/recensioner`, med kontomenyn från 05. Sidan kontrollerar själv inloggningen.

### Acceptance criteria
- [ ] `/konto/recensioner` visar kundens recensioner med vinets namn (länk till vinet), betyg, text och datum, nyast först
- [ ] Utan recensioner visar sidan "Du har inte recenserat något vin än"
- [ ] Felfall: en utloggad besökare skickas till `/logga-in`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass
