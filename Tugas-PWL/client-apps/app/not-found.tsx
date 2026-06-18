import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: 30 }}>
      <h1>
        404
      </h1>

      <p>
        Halaman tidak ditemukan.
      </p>

      <br />

      <Link href="/">
        Kembali ke Home
      </Link>
    </div>
  );
}