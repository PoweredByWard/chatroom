import { signIn, signOut, useSession } from "next-auth/client";
import { BlueButton } from "./utils/buttons";

const Header = () => {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <header class="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
      {session && (
        <div class="flex flex-shrink-0 items-center space-x-4 text-white">
          <div class="flex flex-col items-end ">
            <div class="text-md font-medium ">John Butcher</div>
            <div class="text-sm font-regular">Student</div>
          </div>

          <div class="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400">
            <img
              className="rounded-full"
              src="https://mk0anatomieunes58h83.kinstacdn.com/wp-content/themes/cera/assets/images/avatars/user-avatar.png"
            ></img>
          </div>
        </div>
      )}
      {!session && !loading && (
        <div className="" onClick={() => signIn("discord")}>
          <BlueButton>log in</BlueButton>
        </div>
      )}
    </header>
  );
};

export default Header;
