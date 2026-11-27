import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl">Korka Upp.</p>
          <p className="mt-4 text-sm">För vinets skull. För stunderna tillsammans.</p>
          <p className="mt-4 text-xs">Ett skolprojekt. Endast för dig över 20 år.</p>
        </div>

        <div>
          <p className="font-medium">Upptäck</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/viner">Alla viner</Link></li>
            <li><Link href="/viner?typ=rott">Rött</Link></li>
            <li><Link href="/viner?typ=vitt">Vitt</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-medium">Mitt Korka Upp</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/konto">Mitt konto</Link></li>
            <li><Link href="/varukorg">Din varukorg</Link></li>
            <li className="text-xs">Drick med omtanke.</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl justify-between border-t border-muted px-4 py-4 text-xs sm:px-6">
        <p>© 2026 Korka Upp</p>
        <p>Svenska · SEK</p>
      </div>
    </footer>
  );
}
