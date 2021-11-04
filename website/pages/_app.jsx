import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={session}>
      <div class="h-screen w-full bg-gray-800 relative flex overflow-hidden">
        <Nav />

        <div class="w-full h-full flex flex-col justify-between">
          <Header />

          <main class="max-w-full h-full p-4 pb-8 pr-8 flex relative overflow-y-hidden">
            <div class="h-full w-full  bg-gray-300 rounded-xl">
              <Component {...pageProps} />
            </div>
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
