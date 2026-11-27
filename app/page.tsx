import Link from "next/link";

// Tillfällig startsida. P bygger den riktiga startsidan i ticket 08.
export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="font-serif text-5xl sm:text-6xl">
        Gott vin.
        <br />
        Fina ögonblick.
      </h1>
      <Link href="/viner" className="mt-8 inline-block underline">
        Utforska alla viner
      </Link>
    </section>
  );
}
