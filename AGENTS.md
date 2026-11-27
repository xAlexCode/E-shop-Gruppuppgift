<!-- BEGIN:nextjs-agent-rules -->

# Constraints

The stakeholder fixed these requirements. Don't ask about them, and don't change them. Plan everything else with the group: the product, not deadlines or how the work is assessed.

## Stack
- Next.js 16.4.6 (`npx create-next-app@16.4.6 <name> --yes`), App Router, TypeScript, Tailwind CSS
- Supabase: Postgres for the data, Supabase Auth for the login
- The server reads and writes the database with `postgres` (postgres.js) in `lib/db.ts`. Everything that writes, and everything a Client Component needs from the server, goes through a Route Handler in `app/api/`. No Server Actions, so the API stays visible and testable
- Every file starts as a Server Component, and pages read the database directly through `lib/db.ts`. Add `"use client"` only to the small component that needs hooks, events or the browser, like `ReviewForm.tsx`, never to a whole page: the rest of the page stays on the server, with no extra `fetch` or `useEffect`

## Security
- Every secret key is server only and never `NEXT_PUBLIC_`. `.env` is never committed, and the agent never reads it: a leaked key opens the whole database
- Row level security is on for every table, with no policies, so the browser can't reach the tables directly
- Every query uses `` sql`... ${value}` ``, never a string built with `+`, which would let anyone change the query
- Every admin page and admin route checks the login itself, because a layout alone doesn't protect what's under it
- Only if an admin creates or deletes accounts: Supabase's Admin API, with the secret key `SUPABASE_SECRET_KEY`, used only in `lib/supabase/admin.ts`, and that file only imported by Route Handlers. The key can read and change everything, so it's never `NEXT_PUBLIC_` and never in a Client Component

## Level
- Write code a student who has finished Etapp 1 can explain line by line. Handle the errors the PRD lists and nothing more. If an edge case seems important, ask instead of building it

## Scope
- Each user story needs one error case, not every status code
- Plan stage 1 only. Put ideas for stage 2 and an admin panel under Out of scope. They get their own grilling later, which adds to the same PRD, ER and tickets

## Verify
- Every ticket is verified twice: an integration test (Vitest 3, run against `npm run dev`), and by hand in the browser. A test that has never failed proves nothing, so break the code once and see it fail
- The test goes through what the ticket built: its Route Handler when it has one, otherwise its page, fetched by URL and checked for the status and what it shows. Never add code, like an extra Route Handler, only so there is something to test
- Vitest doesn't read `.env` by itself: `vitest.config.ts` loads it with `loadEnv` from `vite`, so no extra library is needed and no key is written in a test
- The tests use the same database as the app, so they only touch rows they made themselves: named `test-…`, created in the test, and removed in `afterAll`. A test never changes or deletes the shop's own data, and never empties a table. To test a delete, the test first creates the row it deletes
- One customer account is made by hand in Supabase (*Authentication → Users → Add user*, with *Auto Confirm User*), with its email and password in `.env` as `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`. Tests that need a login use it. A test that registers a new account names it `test-…@example.com`, and removes it in `afterAll` with `` sql`delete from auth.users where email = ${email}` ``, so no secret key is needed

## Look
- The design is in `docs/design/`: a graphic profile, and mockups of the pages where the group made them. Match the look. What the app does comes from the PRD: where the design leaves something out or differs, the PRD wins, and the developer decides the details while building the ticket

## Working on a ticket
- Plan the ticket first, and wait for an OK before you write code, so the owner can check the scope
- Only change the files the ticket needs. Ask before changing a file another role owns, so nobody overwrites a teammate's work
- No new libraries without asking: each one is more to set up and review
- When you're done, paste the output of `npm test`, `npm run build` and `npm run lint`, and say how to check the ticket by hand

## The plan
The plan has the same shape whichever tool writes it, even when a skill suggests another one. It stays inside the scope above.

The plan is made in three steps, each started by the user: the interview (`grill-me`), the spec (`to-spec`: `docs/PRD.md` and `docs/ER.md`), and the tickets (`to-tickets`: `docs/tickets/`). Never write a file from a later step before the user starts it. When the interview is done, sum up the decisions and stop.

**`docs/PRD.md`**: what we build, for whom and why.

```
# PRD: <app name>
## The product        two or three sentences
## Users              a table: who, and what they can do
## Pages              a table: URL, what it shows, who can see it
## User stories       grouped by the role that builds them
### <Role> (<prefix>)
**<prefix>1. <title>**
As a <who>, I want <what>, so that <why>.
- [ ] <acceptance criterion>
## The API            a table: method, route, what it takes, who may call it, the status codes
## Touchpoints        a table: what, who builds it, who uses it, the agreement
## Testing            which criteria the integration tests check
## Out of scope       ideas for later
## Open questions     what was never decided
```

- A story's id is a short prefix for the role that builds it, and a number: O1, P2. Use the role's first letter, and let the group approve it in the summary of the grilling. Only when two roles share a first letter, like Products and Payments, ask the group for a longer prefix, so a prompt or a test name points at one story only
- A story for an admin page belongs to the role whose data it manages
- Each acceptance criterion can be checked in a minute: a URL, a click, or an API call and its status code. No file paths or code, except the routes and function names in the touchpoints

**`docs/ER.md`**: the tables as a Mermaid `erDiagram`, with each column's name and type. Under it, one line per rule the diagram doesn't show: unique, a check, what happens on delete.

**`docs/tickets/`**: one file per role, named after the role, `docs/tickets/<role>.md`, plus `docs/tickets/00-day-1.md` for ticket 01.

```
## <NN>: <title>
**Owner:** <role>   **User stories:** <ids>   **Blocked by:** <numbers>, or "nothing"

### What to build
The behaviour, from the user's side. Not a list of files.

### Acceptance criteria
- [ ] <from the PRD>

### Done when
- [ ] Every criterion passes, checked by hand, and the tests and the build pass
```

- Each ticket is a vertical slice: a narrow path through the database, the API, the page and its tests that works on its own. Usually one per user story, but merge two stories that build the same page or route, and split a ticket whose plan takes more than two minutes to read
- A part another role waits for, like a touchpoint, is its own small, early ticket
- Ticket 01 is for everyone, on day 1: the tables and test data in `db/setup.sql`, `lib/db.ts`, `.env.example`, Vitest with one test, and the layout
- Every ticket has one owner. *Blocked by* lists only what really has to be done first. Numbers run across all files, blockers first

<!-- END:nextjs-agent-rules -->
