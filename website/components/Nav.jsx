import config from "../config.json";
import Image from "next/image";
import logo from "../public/logo.jpg";
import Link from "next/link";

const NavItem = (props) => {
  return (
    <Link href={props.href ? props.href : "/"}>
      <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
        {props.children}
      </div>
    </Link>
  );
};

const Nav = () => {
  return (
    <aside class="h-full w-16 flex flex-col space-y-10 items-center justify-center relative text-white">
      <NavItem href="/profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          />
        </svg>
      </NavItem>

      <NavItem href="/chat">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      </NavItem>

      <NavItem href="/video">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          className="h-6 w-6"
          viewBox="0 0 76 76"
          stroke="transparent"
          fill="currentColor"
        >
          <g id="_x37_7_Essential_Icons_72_">
            <path
              id="Video_Camera"
              d="M72.9,14.4L56,25.3V22c0-4.4-3.6-8-8-8H8c-4.4,0-8,3.6-8,8v32c0,4.4,3.6,8,8,8h40c4.4,0,8-3.6,8-8v-3.3   l16.9,10.9c1.9,1,3.1-0.7,3.1-1.7V16C76,15,74.9,13.2,72.9,14.4z M52,54c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V22c0-2.2,1.8-4,4-4h40   c2.2,0,4,1.8,4,4V54z M72,56.3L56,46V30l16-10.3V56.3z"
            />
          </g>
        </svg>
      </NavItem>

      <NavItem>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </NavItem>

      <NavItem>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </NavItem>
    </aside>
  );
};

export default Nav;
