import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "../themeSwitcher";

const user = {
  name: "Thanh Le",
  email: "mihthanh27@gmail.com",
  imageUrl: "/me.jpeg",
};
const navigation = [
  { name: "📝 Blog", href: "/" },
  { name: "📚 Reading list", href: "/reading-list" },
  { name: "💡 Projects", href: "/project" },
  { name: "🤷‍♂️ Me", href: "/me" },
];
// const userNavigation = [
//   { name: "Your Profile", href: "#" },
//   { name: "Settings", href: "#" },
//   { name: "Sign out", href: "#" },
// ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const handleChangeLang = (e: any, locale: string) => {
    e.preventDefault();
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-600"
    >
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-12">
              <div className="flex">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/">
                    <a>ThanhLe's blog</a>
                  </Link>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          router.pathname === item.href
                            ? "border-blue-500 text-gray-900 dark:text-white"
                            : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700",
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )}
                        aria-current={router.pathname.includes(item.href)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="pt-3 pb-2">
                  <ThemeSwitcher />
                </div>
                <div className="relative ml-3">
                  <div className="space-x-3">
                    <a
                      onClick={(e) => handleChangeLang(e, "en")}
                      href="/"
                      className={classNames(
                        "text-sm hover:border-gray-300 hover:text-gray-700",
                        locale === "en"
                          ? "text-gray-700 dark:text-white"
                          : "text-gray-500 dark:text-gray-300"
                      )}
                    >
                      English
                    </a>
                    <a
                      onClick={(e) => handleChangeLang(e, "vi")}
                      href="/vi"
                      className={classNames(
                        "text-sm hover:border-gray-300 hover:text-gray-700",
                        locale === "vi"
                          ? "text-gray-700 dark:text-white"
                          : "text-gray-500 dark:text-gray-300"
                      )}
                    >
                      Tiếng Việt
                    </a>
                  </div>
                </div>
                <div className="relative ml-3">
                  <div>
                    <Link href="/me">
                      <a className="flex items-center max-w-xs text-sm bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          src="/me.jpeg"
                          className="rounded-md"
                          alt="me"
                          width="32"
                          height="32"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-gray-700 dark:text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      router.pathname === item.href
                        ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-gray-700 dark:text-white"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700",
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )}
                    aria-current={router.pathname.includes(item.href)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <div className="flex items-center pt-2 pb-3 pl-3">
              <ThemeSwitcher /> <span className="ml-2">Dark mode</span>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-600">
              <div className="px-4 space-x-3">
                <a
                  onClick={(e) => handleChangeLang(e, "en")}
                  href="/"
                  className={classNames(
                    "hover:border-gray-300 hover:text-gray-700",
                    locale === "en"
                      ? "text-gray-700 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  English
                </a>
                <a
                  onClick={(e) => handleChangeLang(e, "vi")}
                  href="/vi"
                  className={classNames(
                    "hover:border-gray-300 hover:text-gray-700",
                    locale === "vi"
                      ? "text-gray-700 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  Tiếng Việt
                </a>
              </div>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/me.jpeg"
                    alt="me"
                    className="rounded-md"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
