import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 py-8">
      <div className="flex justify-center">
        <Link
          href="/mentions-legales"
          className="text-gray-600 hover:text-gray-900 text-sm"
        >
          Mentions légales
        </Link>
      </div>
      <div className="text-center text-gray-500 text-xs mt-4">
        <p>&copy; {new Date().getFullYear()} Livres Entre Amis. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
