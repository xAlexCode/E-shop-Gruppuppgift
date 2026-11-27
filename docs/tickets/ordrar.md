# Ordrar (O)

## 03: Har kunden köpt vinet?
**Owner:** Ordrar   **User stories:** –   **Blocked by:** 01

### What to build
Touchpointen `hasPurchased(userId, productId)`, som P behöver i 09 för att bara låta kunder som köpt ett vin recensera det. Den svarar `true` om kunden har en order med vinet och `false` annars. Den har varken route eller sida, så testet anropar den direkt med en testorder.

### Acceptance criteria
- [ ] `hasPurchased()` svarar `true` för en kund med en order som innehåller vinet
- [ ] En gästorder med samma e-post räknas inte
- [ ] Felfall: `hasPurchased()` svarar `false` för ett vin kunden inte köpt

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 11: Varukorgen
**Owner:** Ordrar   **User stories:** O1   **Blocked by:** 04, 07

### What to build
En besökare kan lägga viner i varukorgen från korten (en flaska) och från produktsidan (valt antal 1–12), se antalet flaskor i headern, och ändra eller ta bort rader på `/varukorg`. Korgen sparas i webbläsaren och finns kvar efter omladdning. `/varukorg` hämtar aktuella namn och priser från servern. O lägger in knappen i `ProductCard` (avtalat i touchpoints) och ger P en `AddToCartButton` att placera på produktsidan. Varukorgssidan följer mockupen, men sammanfattningen visar frakten 59 kr i stället för texten om fri frakt.

### Acceptance criteria
- [ ] Produktsidan har ett antal-fält (1–12) och "Lägg i varukorg"; korten har "Lägg i varukorg" för en flaska
- [ ] Ligger vinet redan i korgen ökar antalet, aldrig över 12
- [ ] Headern visar antal flaskor i korgen, även efter att sidan laddats om
- [ ] `/varukorg` visar bild, namn, årgång, styckpris, antal med +/−, Ta bort, radsumma, frakt 59 kr och total
- [ ] `GET /api/products?ids=…` med kända id:n svarar `200` med namn, pris, årgång och bild
- [ ] En tom korg visar "Din varukorg är tom" och en länk till `/viner`
- [ ] Felfall: `GET /api/products?ids=…` med ett okänt id svarar `400`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 12: Åldersfrågan
**Owner:** Ordrar   **User stories:** O5   **Blocked by:** 01

### What to build
Vid första besöket täcker en ruta sidan och frågar om besökaren har fyllt 20. Ja sparas i en cookie i 30 dagar så att frågan inte kommer tillbaka; Nej visar ett meddelande och sparar ingenting. Servern läser cookien, så den som redan svarat Ja aldrig ser rutan blinka till.

### Acceptance criteria
- [ ] Vid första besöket täcker en ruta sidan: "Du måste ha fyllt 20 år för att handla vin. Har du fyllt 20?" med Ja och Nej
- [ ] Ja stänger rutan och sparar cookien `age_ok` i 30 dagar; efter omladdning visas inte rutan
- [ ] En sida som hämtas med cookien `age_ok=1` innehåller inte frågan
- [ ] Felfall: Nej visar "Du behöver vara 20 år för att besöka sidan." och sparar ingen cookie, så frågan kommer tillbaka vid omladdning

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 13: Kassan
**Owner:** Ordrar   **User stories:** O2   **Blocked by:** 02, 11

### What to build
En besökare beställer varukorgen på `/kassa`, som gäst eller inloggad. Formuläret har tre avsnitt i mockupens stil (Dina uppgifter, Leverans, Betalning), 20-årsrutan och "Lägg beställning", och "Din beställning" visar sammanfattningen. Servern kontrollerar allt, räknar ut totalen med priserna i databasen plus 59 kr i frakt, och sparar ordern med status mottagen. Efter köpet töms korgen och kunden skickas till bekräftelsesidan. Fel visas i formuläret.

### Acceptance criteria
- [ ] `/kassa` visar Dina uppgifter (namn, e-post, gatuadress, postnummer, ort), Leverans ("Hemleverans, 59 kr") och Betalning (Kort, Faktura, Swish), plus 20-årsrutan och "Lägg beställning"
- [ ] En gäst ser "Fortsätt som gäst" och "Logga in"; en inloggad kund ser dem inte, och namn och e-post är ifyllda
- [ ] `POST /api/orders` med giltig korg och giltiga fält svarar `201` med orderns id, och totalen är varornas summa plus 59 kr
- [ ] En inloggad kunds order kopplas till kontot
- [ ] Efter köpet töms varukorgen och kunden skickas till `/order/[uuid]`
- [ ] Med tom varukorg visar `/kassa` "Din varukorg är tom" och en länk till `/viner`
- [ ] Felfall: `POST /api/orders` utan ikryssad 20-årsruta svarar `400`, och formuläret visar felet

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 14: Orderbekräftelsen
**Owner:** Ordrar   **User stories:** O3   **Blocked by:** 02, 13

### What to build
Efter köpet ser kunden sin order på `/order/[uuid]`. En gästorder kan öppnas av alla med länken och uppmanar gästen att skapa ett konto nästa gång. En kontoorder visas bara för den inloggade ägaren; för alla andra finns sidan inte.

### Acceptance criteria
- [ ] `/order/[uuid]` visar ordernummer (t.ex. #1042), datum, viner, antal, styckpris, frakt, total, betalsätt och leveransadress
- [ ] En gästorder visas för alla med länken, och visar "Skapa ett konto nästa gång, så sparas dina ordrar och favoriter." med en länk till `/registrera`
- [ ] En kontoorder visas för den inloggade ägaren
- [ ] Felfall: en kontoorder som öppnas utan att vara inloggad som ägaren svarar `404`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 15: Orderhistorik
**Owner:** Ordrar   **User stories:** O4   **Blocked by:** 02, 05

### What to build
En inloggad kund ser sina ordrar på `/konto/ordrar`, med kontomenyn från 05, och kan öppna varje order. Gästordrar med samma e-post visas inte. Sidan kontrollerar själv inloggningen.

### Acceptance criteria
- [ ] `/konto/ordrar` visar kundens ordrar med datum, ordernummer, antal flaskor och total, nyast först
- [ ] Ett klick på en order öppnar `/order/[uuid]`
- [ ] Gästordrar med samma e-post visas inte
- [ ] Utan ordrar visar sidan "Du har inga ordrar än" och en länk till `/viner`
- [ ] Felfall: en utloggad besökare skickas till `/logga-in`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass
