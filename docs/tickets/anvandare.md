# Användare (A)

## 02: Logga in och ut
**Owner:** Användare   **User stories:** A1   **Blocked by:** 01

### What to build
En kund kan logga in med e-post och lösenord på `/logga-in` och logga ut igen. Headern visar "Mitt konto" för en inloggad kund och "Logga in" annars. Ticketen bygger också touchpointen `getUser()`, som returnerar den inloggade kunden (`{ id, email, name }`) eller `null`, och som P och O använder på alla sidor och routes som kräver inloggning. Sidan följer mockupen, utan "Glömt lösenord?", och informationsrutan säger "Det här är ett skolprojekt. Använd inte ett lösenord du har på andra sidor."

### Acceptance criteria
- [ ] `/logga-in` har e-post, lösenord, "Logga in" och länken "Ny här? Skapa ett konto"
- [ ] `POST /api/auth/login` med rätt uppgifter svarar `200`, och kunden skickas till `/konto`
- [ ] Inloggad visar headern "Mitt konto"; utloggad visar den "Logga in"
- [ ] `POST /api/auth/logout` svarar `200`, och headern visar "Logga in" igen
- [ ] Felfall: `POST /api/auth/login` med fel lösenord svarar `401`, och sidan visar "Fel mejl eller lösenord"

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 05: Min profil
**Owner:** Användare   **User stories:** A3   **Blocked by:** 02

### What to build
En inloggad kund ser sin profil på `/konto`: namn, e-post och när kontot skapades, och kan logga ut därifrån. Ticketen bygger också touchpointen kontomenyn, med länkar till Mitt konto, Mina ordrar, Mina favoriter och Mina recensioner, som P och O lägger på sina kontosidor. Sidan kontrollerar själv inloggningen.

### Acceptance criteria
- [ ] `/konto` visar namn, e-post och "Medlem sedan <datum>"
- [ ] Kontomenyn länkar till `/konto`, `/konto/ordrar`, `/favoriter` och `/konto/recensioner`
- [ ] "Logga ut" loggar ut kunden och skickar till `/`
- [ ] Felfall: en utloggad besökare som öppnar `/konto` skickas till `/logga-in`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 16: Skapa konto
**Owner:** Användare   **User stories:** A2   **Blocked by:** 02

### What to build
En besökare kan skapa ett konto på `/registrera` med namn, e-post och lösenord, och är inloggad direkt efteråt, utan mejlbekräftelse. Namnet sparas i kundens profil. Sidan följer mockupen, utan "Glömt lösenord?", med fältet "Lösenord" och knappen "Skapa konto".

### Acceptance criteria
- [ ] `/registrera` har namn, e-post, lösenord (minst 6 tecken), "Skapa konto" och länken "Har du redan ett konto? Logga in"
- [ ] `POST /api/auth/register` med nya uppgifter svarar `201`; kunden är inloggad och skickas till `/konto`
- [ ] Namnet visas på `/konto`
- [ ] Felfall: ett mejl som redan finns svarar `400`, och sidan visar ett felmeddelande

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 17: Spara favoriter
**Owner:** Användare   **User stories:** A4   **Blocked by:** 02, 04, 07

### What to build
En inloggad kund kan klicka på hjärtat på ett vinkort eller på produktsidan för att spara vinet som favorit, och klicka igen för att ta bort det. Hjärtat är ifyllt för viner som redan är favoriter. En utloggad besökare som klickar skickas till `/logga-in`. A lägger in hjärtat i `ProductCard` (avtalat i touchpoints) och ger P en `FavoriteButton` att placera på produktsidan.

### Acceptance criteria
- [ ] Hjärtat finns på korten och på produktsidan
- [ ] `POST /api/favorites` svarar `201`, och hjärtat blir ifyllt; efter omladdning är det fortfarande ifyllt
- [ ] Att spara samma vin två gånger ger ändå bara en favorit
- [ ] `DELETE /api/favorites/[productId]` svarar `200`, och hjärtat blir tomt
- [ ] En utloggad besökare som klickar på hjärtat skickas till `/logga-in`
- [ ] Felfall: `POST /api/favorites` utan inloggning svarar `401`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass

## 18: Mina favoriter
**Owner:** Användare   **User stories:** A5   **Blocked by:** 17

### What to build
En inloggad kund ser sina favoritviner som kort på `/favoriter`, dit headerns "Favoriter" leder, och kan ta bort dem med hjärtat. Utan favoriter visar sidan mockupens tomma läge. Sidan kontrollerar själv inloggningen.

### Acceptance criteria
- [ ] `/favoriter` visar kundens favoritviner som kort; headerns "Favoriter" leder hit
- [ ] Ett klick på hjärtat tar bort vinet från sidan
- [ ] En utloggad besökare skickas till `/logga-in`
- [ ] Felfall: utan favoriter visar sidan "Dina framtida favoriter väntar. Tryck på hjärtat vid ett vin för att spara det här." och knappen "Hitta en favorit" till `/viner`

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass
