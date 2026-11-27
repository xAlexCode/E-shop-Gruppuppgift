import Link from "next/link";
import { WINE_TYPES } from "@/lib/wine-types";

// Headern som syns på alla sidor. Allt här är vanliga länkar och ett
// GET-formulär, så den behöver ingen JavaScript.
// A byter "Logga in" mot "Mitt konto" i ticket 02, O lägger in antal flaskor i ticket 11.
export default function Header() {
  return (
    <header className="border-b border-line">
      <p className="bg-wine px-4 py-2 text-center text-xs text-white sm:text-sm">
        Noggrant utvalda viner. Stora och små ögonblick.
        <span className="mx-3">|</span>
        Fast frakt 59 kr
      </p>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="font-serif text-3xl tracking-tight">
          Korka Upp<span className="text-wine">.</span>
        </Link>

        <form
          action="/viner"
          method="get"
          className="order-last flex w-full items-center gap-2 border-b border-line py-2 md:order-none md:mx-auto md:w-80"
        >
          <SearchIcon />
          <input
            type="search"
            name="q"
            placeholder="Sök vin, druva eller producent"
            aria-label="Sök vin, druva eller producent"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </form>

        <nav className="ml-auto flex items-center gap-5 text-sm md:ml-0">
          <Link href="/favoriter" className="flex items-center gap-2">
            <HeartIcon />
            <span className="hidden sm:inline">Favoriter</span>
          </Link>
          <Link href="/logga-in" className="flex items-center gap-2">
            <UserIcon />
            <span className="hidden sm:inline">Logga in</span>
          </Link>
          <Link href="/varukorg" className="flex items-center gap-1" aria-label="Varukorg">
            <BagIcon />
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-wine px-1 text-xs text-white">
              0
            </span>
          </Link>
        </nav>
      </div>

      {/* Typmenyn scrollar i sidled på mobil i stället för att brytas */}
      <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto whitespace-nowrap border-t border-line px-4 py-3 text-sm sm:px-6">
        <Link href="/viner" className="font-medium">
          Alla viner
        </Link>
        {WINE_TYPES.map((type) => (
          <Link key={type.value} href={`/viner?typ=${type.value}`}>
            {type.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
