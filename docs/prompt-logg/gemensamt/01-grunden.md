# 01: Grunden

**Ägare:** Alla/Alexandra   **Gren:** `01-grunden`   **Datum:** 2026-11-27

## Bakgrund
Lottie började bygga upp projektet på sin dator med Claude, men hennes dator krånglade, så vi bestämde oss för att Alexandra skulle göra om projektet med Claude på sin dator. Alexandra skapade ett projekt i Supabase och startade ticket 01.

## Prompter
1. "Okej då kan vi börja med ticket 01"
   - Svar/resultat: AI:n gjorde en plan för ticketen och väntade på vårt OK innan den skrev kod.
2. "ta bort puns table"
   - Svar/resultat: En gammal tabell `puns` (utan RLS) togs bort, så att bara våra sju tabeller finns kvar.
3. "Vi tänkte ha random hemsidor och länka till dessa då det är ett skolprojekt"
   - Svar/resultat: `next.config.ts` tillåter nu bilder från alla https-sajter (`hostname: "**"`).
4. "Bekräftade att jag uppdaterat setup … med nya bildadresser och även lagt in dem i supabase"
   - Svar/resultat: AI:n kontrollerade att filen och databasen har samma 40 adresser, tog bort ett `$0` i en länk och hittade en bild som svarade 403. Vi bytte den bilden.

## Vad vi byggde
- Sju tabeller i Supabase enligt `docs/ER.md`, med RLS påslaget och inga policies
- Testdata: 20 producenter och 40 viner av alla sju typerna, där 6 viner saknar årgång
- `lib/db.ts` som kopplar servern till databasen
- `.env.example` med alla miljövariabler utan värden
- Vitest med ett test som hämtar `/` och kontrollerar status 200, "Korka Upp" och typmenyn
- Layouten: topbanner, header med logga, sökfält, typmeny, Favoriter, Logga in, varukorgsikon och footer
- En tillfällig startsida (den riktiga byggs i ticket 08)

## Vad som gick bra
Vi la in mycket information från början, men den var inte tillräckligt specificerad. Därför fick vi väldigt många grill-me-frågor (runt 40), och vi ställde följdfrågor på många av dem. Det gjorde att kraven blev tydligare innan någon kod skrevs.

## Problem och hur vi löste dem
- `npm run dev` skrev över vår `AGENTS.md` → Gruppens regler flyttades utanför Next.js-blocket (`<!-- BEGIN/END:nextjs-agent-rules -->`), så att de inte skrivs över igen.
- En tabell `puns` låg kvar i databasen utan RLS → Vi tog bort den.
- En bildlänk slutade på `$0` → `$0` togs bort.
- En bild från raschvin.com svarade 403 → Vi bytte till en annan bild.
- Claude missuppfattade hur produktbilderna skulle hanteras, eftersom vi inte var tydliga med att vi ville använda URL:er. Vi fick diskutera en stund med Claude för att rätta till det, och nu kan vi använda vilken bild-URL som helst.

## Egna beslut
- Bilderna länkas från olika sajter på nätet i stället för att ligga i projektet. Det är inte optimalt, eftersom bildadresserna måste matas in manuellt i efterhand och länkar kan sluta fungera. Eftersom vi inte ska bygga någon adminpanel i nuläget fick det bli så för det här projektet.

## Kontroll
- [x] `npm test` går igenom
- [x] `npm run build` går igenom
- [x] `npm run lint` går igenom
- [x] Kontrollerat för hand i webbläsaren: <vad vi klickade på>
- [x] Testet sett misslyckas en gång: startsidan fick kasta ett fel, och testet svarade "expected 500 to be 200"