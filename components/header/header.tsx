import Link from "next/link";
import SearchInput from "./search-input";
import UserMenuPage from "./user-menu-page";

export default async function Header() {

  return (<div className="flex items-center">
    <div className="flex-1">
      <div>
        <Link href="/">
          <p className="hidden sm:block font-bold text-inherit">Sharebook</p>
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