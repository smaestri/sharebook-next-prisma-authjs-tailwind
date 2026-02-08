import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";
import UserMenuPage from "../../app/user-menu/page";

export default async function Header() {

  return (<div className="flex items-center">
    <div className="flex-1">
      <div>
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="Livres entre amis"
            width={240}
            height={80}
            priority
            className="hidden sm:block"
          />
        </Link>
      </div>
    </div>
    <div className="flex-1">
      <div>
        <SearchInput />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex justify-center">
        <UserMenuPage />
      </div>
    </div>
  </div>
  )
}