# PRD: Korka Upp

## The product

Korka Upp är en svensk webbshop för vin, för privatpersoner från nybörjare till intresserade. Kunden hittar ett vin bland ungefär 40 viner med filter, sökning och en tydlig smakprofil, lägger det i varukorgen och beställer, med eller utan konto. Med ett konto sparar kunden favoriter, ser sina ordrar och recenserar viner hen har köpt.

## Users

| Vem | Vad de kan göra |
|---|---|
| Besökare (gäst) | Svara på åldersfrågan, se och filtrera viner, söka, öppna ett vin, lägga i varukorgen, beställa som gäst och se sin orderbekräftelse via länken |
| Inloggad kund | Allt som en gäst kan, plus: se sin profil, sin orderhistorik, sina favoriter och sina recensioner, spara favoriter, och recensera viner hen har köpt |

## Pages

| URL | Vad den visar | Vem kan se den |
|---|---|---|
| (alla sidor) | Age gate tills besökaren har svarat Ja; header med logga, sökfält, typmeny, Favoriter, Logga in / Mitt konto och varukorgen med antal flaskor; footer | Alla |
| `/` | Hero med sökfält, de sju typerna som cirklar, de fyra nyaste vinerna, två samlingskort | Alla |
| `/viner` | Alla viner som kort, med filter (vintyp, land, druva, pris), sortering, sökning, antal träffar, chips och "Rensa" | Alla |
| `/viner/[slug]` | Ett vin: bild, land och region, namn, producent, årgång, beskrivning, druva, volym, alkohol, pris, smakstaplar, matpassning, antal + Lägg i varukorg, hjärta, snittbetyg och recensioner | Alla |
| `/varukorg` | Varukorgens rader med +/−, Ta bort, radsumma, frakt 59 kr och total | Alla |
| `/kassa` | Formulär: Dina uppgifter, Leverans, Betalning, 20-årsrutan; sammanfattningen "Din beställning" | Alla |
| `/order/[uuid]` | Orderbekräftelse: ordernummer, viner, antal, frakt, total, betalsätt, adress; för gäster en uppmaning att skapa konto | Gästorder: alla med länken. Kontoorder: bara ägaren |
| `/registrera` | Skapa konto: namn, e-post, lösenord | Alla |
| `/logga-in` | Logga in: e-post, lösenord | Alla |
| `/konto` | Namn, e-post, medlem sedan, kontomeny, Logga ut | Inloggad |
| `/konto/ordrar` | Kundens ordrar: datum, ordernummer, antal flaskor, total | Inloggad |
| `/konto/recensioner` | Kundens recensioner: vin, betyg, text, datum | Inloggad |
| `/favoriter` | Kundens favoritviner som kort | Inloggad |

## User stories

### Produkter (P)

**P1. Se alla viner**
As a besökare, I want to se alla viner som kort, so that jag får en överblick över sortimentet.
- [ ] `/viner` visar alla viner i testdatan som kort med bild, land, typ, årgång, namn, producent och pris
- [ ] Ett klick på ett kort öppnar `/viner/[slug]` för det vinet
- [ ] Listan är sorterad på namn A–Ö
- [ ] Felfall: ett vin utan årgång visar "Utan årgång" på kortet

**P2. Filtrera, sortera och söka bland vinerna**
As a besökare, I want to filtrera på vintyp, land, druva och pris, sortera och söka, so that jag snabbt hittar ett vin som passar mig.
- [ ] `/viner?typ=rott` visar bara röda viner, och rubriken blir "Rött"
- [ ] `/viner?land=frankrike&pris=150-250` visar bara franska viner för 150–250 kr
- [ ] Prisintervallen är under 100, 100–150, 150–250, 250–500 och 500+
- [ ] `/viner?druva=…` visar bara viner med den druvan
- [ ] `/viner?sort=pris-asc` och `sort=pris-desc` sorterar på pris; utan `sort` sorteras på namn A–Ö
- [ ] `/viner?q=rioja` visar viner där namn, producent, druva eller matpassning innehåller "rioja"
- [ ] Sidan visar antal träffar, ett chip per aktivt filter (ett klick tar bort just det filtret) och länken "Rensa" till `/viner`
- [ ] Felfall: filter utan träffar visar "Inga viner matchar dina filter" och en länk som rensar filtren

**P3. Se ett vin**
As a besökare, I want to öppna ett vin och se allt om det, so that jag kan bestämma mig.
- [ ] `/viner/[slug]` visar land och region, namn, producent, årgång, beskrivning, druva, volym, alkoholhalt, pris och matpassning
- [ ] Fyllighet, sötma, strävhet och fruktsyra visas som staplar med fem steg, en per ifyllt värde
- [ ] Fält utan värde visas inte
- [ ] Sidans titel i fliken är "<vinets namn> <årgång> | Korka Upp"
- [ ] Sidan visar snittbetyget med en decimal och antalet recensioner, eller inget betyg om vinet saknar recensioner
- [ ] Felfall: `/viner/finns-inte` svarar `404`

**P4. Startsidan**
As a besökare, I want en startsida som visar vägar in i sortimentet, so that jag vet var jag ska börja.
- [ ] `/` visar hero med sökfält; en sökning på "rioja" leder till `/viner?q=rioja`
- [ ] De sju typerna visas som cirklar som länkar till `/viner?typ=…`
- [ ] De fyra senast tillagda vinerna visas som kort, och "Se alla viner" leder till `/viner`
- [ ] Kortet "Stora röda. Små priser." leder till `/viner?typ=rott&pris=100-150`
- [ ] Kortet "Goda viner. Glödande kvällar." leder till `/viner?q=grill`
- [ ] Felfall: en samlingslänk utan träffar visar "Inga viner matchar dina filter" på `/viner`

**P5. Recensera ett vin jag har köpt**
As a inloggad kund, I want to betygsätta och recensera ett vin jag har köpt, so that andra får hjälp att välja.
- [ ] En kund som köpt vinet ser ett formulär på produktsidan med betyg 1–5 och en valfri text (max 1 000 tecken)
- [ ] `POST /api/reviews` med giltigt betyg svarar `201`, och recensionen syns direkt på produktsidan med förnamn och datum, nyast först
- [ ] En utloggad besökare ser "Logga in för att skriva ett omdöme" och en knapp till `/logga-in`
- [ ] En inloggad kund som inte köpt vinet ser "Köp vinet för att kunna recensera det."
- [ ] Felfall: `POST /api/reviews` för ett vin kunden inte köpt svarar `403`
- [ ] Felfall: en andra recension av samma vin svarar `409`

**P6. Mina recensioner**
As a inloggad kund, I want to se alla mina recensioner, so that jag minns vad jag tyckte.
- [ ] `/konto/recensioner` visar kundens recensioner med vinets namn (länk till vinet), betyg, text och datum, nyast först
- [ ] Utan recensioner visar sidan "Du har inte recenserat något vin än"
- [ ] Felfall: en utloggad besökare skickas till `/logga-in`

### Ordrar (O)

**O1. Varukorgen**
As a besökare, I want to lägga viner i en varukorg och ändra den, so that jag kan samla allt jag vill köpa.
- [ ] Produktsidan har ett antal-fält (1–12) och "Lägg i varukorg"; korten har "Lägg i varukorg" för en flaska
- [ ] Ligger vinet redan i korgen ökar antalet, aldrig över 12
- [ ] Headern visar antal flaskor i korgen, även efter att sidan laddats om
- [ ] `/varukorg` visar bild, namn, årgång, styckpris, antal med +/−, Ta bort, radsumma, frakt 59 kr och total
- [ ] `GET /api/products?ids=…` med kända id:n svarar `200` med namn, pris, årgång och bild
- [ ] En tom korg visar "Din varukorg är tom" och en länk till `/viner`
- [ ] Felfall: `GET /api/products?ids=…` med ett okänt id svarar `400`

**O2. Kassan**
As a besökare, I want to beställa med eller utan konto, so that jag får mitt vin.
- [ ] `/kassa` visar avsnitten Dina uppgifter (namn, e-post, gatuadress, postnummer, ort), Leverans ("Hemleverans, 59 kr") och Betalning (Kort, Faktura, Swish), plus 20-årsrutan och "Lägg beställning"
- [ ] En gäst ser "Fortsätt som gäst" och "Logga in"; en inloggad kund ser dem inte, och namn och e-post är ifyllda
- [ ] `POST /api/orders` med giltig korg och giltiga fält svarar `201` med orderns id, och totalen är varornas summa plus 59 kr, uträknad med priserna i databasen
- [ ] En inloggad kunds order kopplas till kontot
- [ ] Efter köpet töms varukorgen och kunden skickas till `/order/[uuid]`
- [ ] Med tom varukorg visar `/kassa` "Din varukorg är tom" och en länk till `/viner`
- [ ] Felfall: `POST /api/orders` utan ikryssad 20-årsruta svarar `400`, och formuläret visar felet

**O3. Orderbekräftelsen**
As a kund, I want to se en bekräftelse på min order, so that jag vet att den gått igenom.
- [ ] `/order/[uuid]` visar ordernummer (t.ex. #1042), datum, viner, antal, styckpris, frakt, total, betalsätt och leveransadress
- [ ] En gästorder visas för alla med länken, och visar "Skapa ett konto nästa gång, så sparas dina ordrar och favoriter." med en länk till `/registrera`
- [ ] En kontoorder visas för den inloggade ägaren
- [ ] Felfall: en kontoorder som öppnas utan att vara inloggad som ägaren svarar `404`

**O4. Orderhistorik**
As a inloggad kund, I want to se mina tidigare ordrar, so that jag minns vad jag köpt.
- [ ] `/konto/ordrar` visar kundens ordrar med datum, ordernummer, antal flaskor och total, nyast först
- [ ] Ett klick på en order öppnar `/order/[uuid]`
- [ ] Gästordrar med samma e-post visas inte
- [ ] Utan ordrar visar sidan "Du har inga ordrar än" och en länk till `/viner`
- [ ] Felfall: en utloggad besökare skickas till `/logga-in`

**O5. Åldersfrågan**
As a butiken, I want to fråga besökaren om hen har fyllt 20, so that vi inte säljer vin till minderåriga.
- [ ] Vid första besöket täcker en ruta sidan: "Du måste ha fyllt 20 år för att handla vin. Har du fyllt 20?" med Ja och Nej
- [ ] Ja stänger rutan och sparar cookien `age_ok` i 30 dagar; efter omladdning visas inte rutan
- [ ] En sida som hämtas med cookien `age_ok=1` innehåller inte frågan
- [ ] Felfall: Nej visar "Du behöver vara 20 år för att besöka sidan." och sparar ingen cookie, så frågan kommer tillbaka vid omladdning

### Användare (A)

**A1. Logga in och ut**
As a kund, I want to logga in och ut, so that jag kommer åt mitt konto.
- [ ] `/logga-in` har e-post, lösenord, "Logga in" och länken "Ny här? Skapa ett konto"
- [ ] `POST /api/auth/login` med rätt uppgifter svarar `200`, och kunden skickas till `/konto`
- [ ] Inloggad visar headern "Mitt konto"; utloggad visar den "Logga in"
- [ ] "Logga ut" på `/konto` anropar `POST /api/auth/logout`, som svarar `200`, och headern visar "Logga in" igen
- [ ] Felfall: `POST /api/auth/login` med fel lösenord svarar `401`, och sidan visar "Fel mejl eller lösenord"

**A2. Skapa konto**
As a besökare, I want to skapa ett konto, so that mina ordrar och favoriter sparas.
- [ ] `/registrera` har namn, e-post, lösenord (minst 6 tecken), "Skapa konto" och länken "Har du redan ett konto? Logga in"
- [ ] `POST /api/auth/register` med nya uppgifter svarar `201`; kunden är inloggad direkt och skickas till `/konto`
- [ ] Namnet visas på `/konto`
- [ ] Felfall: ett mejl som redan finns svarar `400`, och sidan visar ett felmeddelande

**A3. Min profil**
As a inloggad kund, I want to se min profil, so that jag vet vilket konto jag är inloggad på.
- [ ] `/konto` visar namn, e-post och "Medlem sedan <datum>"
- [ ] Kontomenyn länkar till Mina ordrar, Mina favoriter och Mina recensioner, och finns på alla kontosidor
- [ ] Felfall: en utloggad besökare skickas till `/logga-in`

**A4. Spara favoriter**
As a inloggad kund, I want to spara viner som favoriter med ett hjärta, so that jag hittar dem igen.
- [ ] Hjärtat finns på korten och på produktsidan
- [ ] `POST /api/favorites` med ett vin svarar `201`, och hjärtat blir ifyllt; efter omladdning är det fortfarande ifyllt
- [ ] Att spara samma vin två gånger ger ändå bara en favorit
- [ ] `DELETE /api/favorites/[productId]` svarar `200`, och hjärtat blir tomt
- [ ] En utloggad besökare som klickar på hjärtat skickas till `/logga-in`
- [ ] Felfall: `POST /api/favorites` utan inloggning svarar `401`

**A5. Mina favoriter**
As a inloggad kund, I want to se alla mina favoriter, so that jag kan köpa dem igen.
- [ ] `/favoriter` visar kundens favoritviner som kort; headerns "Favoriter" leder hit
- [ ] Ett klick på hjärtat tar bort vinet från sidan
- [ ] Felfall: utan favoriter visar sidan "Dina framtida favoriter väntar. Tryck på hjärtat vid ett vin för att spara det här." och knappen "Hitta en favorit" till `/viner`
- [ ] En utloggad besökare skickas till `/logga-in`

## The API

| Method | Route | Tar | Vem får anropa | Statuskoder |
|---|---|---|---|---|
| GET | `/api/products?ids=1,2` | kommaseparerade produkt-id:n | Alla | `200` namn, pris, årgång, bild, slug per id · `400` okänt eller ogiltigt id |
| POST | `/api/orders` | `{ items: [{ productId, quantity }], name, email, street, postalCode, city, paymentMethod: "kort" \| "faktura" \| "swish", ageConfirmed }` | Alla (inloggad kund får `user_id` på ordern) | `201` `{ id }` · `400` tom korg, okänt vin, antal utanför 1–12, saknat fält, postnummer som inte är 5 siffror, ogiltigt betalsätt eller `ageConfirmed` inte `true` |
| POST | `/api/reviews` | `{ productId, rating, text? }` | Inloggad kund som köpt vinet | `201` · `400` betyg utanför 1–5 eller text över 1 000 tecken · `401` ej inloggad · `403` har inte köpt vinet · `409` har redan recenserat vinet |
| POST | `/api/auth/register` | `{ name, email, password }` | Alla | `201` inloggad · `400` saknat fält, lösenord under 6 tecken eller mejl som redan finns |
| POST | `/api/auth/login` | `{ email, password }` | Alla | `200` inloggad · `401` fel mejl eller lösenord |
| POST | `/api/auth/logout` | – | Alla | `200` |
| POST | `/api/favorites` | `{ productId }` | Inloggad kund | `201` (även om vinet redan var favorit) · `401` ej inloggad |
| DELETE | `/api/favorites/[productId]` | – | Inloggad kund | `200` · `401` ej inloggad |

Servern räknar alltid ut priser och total själv; klienten skickar aldrig pris.

## Touchpoints

| Vad | Vem bygger | Vem använder | Överenskommelse |
|---|---|---|---|
| Header och footer i layouten | Alla (ticket 01) | A, O | Ticket 01 bygger headern med plats för inloggningslänken och varukorgsräknaren. A byter länken mellan "Logga in" och "Mitt konto" i A1. O lägger in räknaren i O1 |
| `getUser()` | A | P, O, A | Returnerar `{ id, email, name }` för den inloggade kunden, eller `null`. Används i varje sida och route som kräver inloggning |
| `hasPurchased(userId, productId)` | O | P | Returnerar `true` om kunden har en order med vinet, annars `false`. P5 använder den för formuläret och för `403` |
| `ProductCard` | P | A, O, P | Tar ett vin och visar bild, land, typ, årgång eller "Utan årgång", namn, producent och pris. A lägger in `FavoriteButton` och O lägger in `AddToCartButton` i kortet i sina tickets; det är avtalat här |
| `AddToCartButton` | O | P | Tar ett vin och ett valfritt antal. P placerar den på produktsidan med antal-fältet |
| `FavoriteButton` | A | P | Tar `productId` och om vinet redan är favorit. P placerar den på produktsidan |
| Kontomenyn | A | P, O | Länkar till `/konto`, `/konto/ordrar`, `/favoriter` och `/konto/recensioner`. P lägger den på `/konto/recensioner` och O på `/konto/ordrar` |
| Varukorgen i `localStorage` | O | O | Nyckeln `cart` med `[{ productId, quantity }]`. Bara O läser och skriver den |

## Testing

Integrationstesterna körs med Vitest mot `npm run dev`. Varje test går genom det som ticketen byggde: dess Route Handler när den har en, annars dess sida, hämtad via URL och kontrollerad på status och innehåll. `hasPurchased()` har varken route eller sida och anropas direkt i testet. Testerna skapar egna rader som heter `test-…` och tar bort dem i `afterAll`. Tester som kräver inloggning använder `TEST_USER_EMAIL` och `TEST_USER_PASSWORD`, och loggar in via `POST /api/auth/login`.

| Story | Vad testet kontrollerar |
|---|---|
| P1 | `/viner` svarar `200` och innehåller ett känt vin; ett vin utan årgång visar "Utan årgång" |
| P2 | `/viner?typ=rott` innehåller ett rött och inget vitt vin; `?q=…` hittar ett vin på producent; filter utan träffar visar "Inga viner matchar dina filter" |
| P3 | `/viner/[slug]` för ett känt vin svarar `200` och visar namn och pris; en okänd slug svarar `404` |
| P4 | `/` svarar `200` och innehåller länkarna till `/viner?typ=rott&pris=100-150` och `/viner?q=grill` |
| P5 | `POST /api/reviews` svarar `201` efter en testorder med vinet, `403` utan köp, och `409` vid en andra recension |
| P6 | `/konto/recensioner` utan inloggning skickar till `/logga-in`; inloggad visar en testrecension |
| O1 | `GET /api/products?ids=…` svarar `200` med rätt pris; ett okänt id svarar `400` |
| O2 | `POST /api/orders` svarar `201` och totalen är summan plus 59 kr; utan 20-årsrutan svarar den `400` |
| O3 | `/order/[uuid]` för en testorder som gäst svarar `200` och visar ordernumret; en kontoorder utan inloggning svarar `404` |
| O4 | `/konto/ordrar` utan inloggning skickar till `/logga-in`; inloggad visar en testorder |
| O5 | `/` utan cookie innehåller åldersfrågan; med `age_ok=1` innehåller den inte frågan |
| `hasPurchased()` | `true` för en testorder med vinet, `false` för ett vin kunden inte köpt |
| A1 | `POST /api/auth/login` svarar `200` med testkontot och `401` med fel lösenord |
| A2 | `POST /api/auth/register` svarar `201` för `test-…@example.com` och `400` för samma mejl en gång till |
| A3 | `/konto` utan inloggning skickar till `/logga-in`; inloggad visar testkontots mejl |
| A4 | `POST /api/favorites` svarar `201` inloggad och `401` utan inloggning; `DELETE` svarar `200` |
| A5 | `/favoriter` inloggad utan favoriter visar "Dina framtida favoriter väntar."; med en testfavorit visar den vinet |

Varje ticket kontrolleras också för hand i webbläsaren, och varje test ska ha setts misslyckas en gång.

## Out of scope

- Adminpanel för viner, producenter, lager och moderering
- Lagersaldo: ett `stock`-fält, "Slut i lager" och `409` vid för få flaskor (första idén för steg 2)
- Riktig betalning (t.ex. Stripe), flera leveranssätt och fri frakt
- Bekräftelsemejl, mejlbekräftelse vid registrering, glömt lösenord, inloggning med Google eller BankID, åldersverifiering med BankID
- Gästordrar som kopplas till ett konto som skapas senare
- Sparade adresser och att ändra profilen
- Att ändra eller ta bort recensioner, moderering, betyg på produktkorten och sortering på betyg
- En varukorg som följer med mellan enheter
- Fler filter: region, årgång, fyllighet, sötma, strävhet, fruktsyra och "passar till"
- Flera druvor per vin och taggar för smakkaraktär och tillfälle
- Sökförslag medan man skriver
- Sortering "Nyast först", sidan "Nyheter" och märket "Vår favorit"
- Kassa i flera steg
- Landningssidor per land och druva, en tabell för samlingar, och sidindelning
- B2B och restauranger

## Open questions

- Inga. (Bilderna på vinerna är beslutade: `image_url` är en extern webbadress till en fri bild, från en eller ett par sajter som tillåts i Next.js bildinställningar. De kan senare laddas ner till `public/` utan att något annat ändras.)
