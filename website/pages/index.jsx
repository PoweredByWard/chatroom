import config from "../config.json";

export default function Home() {
  return (
    <>
      <a
        href="/chat"
        className="bg-blue-400 rounded-md shadow-lg px-4 py-2 mr-5 cursor-pointer text-lg font-semibold"
      >
        Chat
      </a>
      <a
        href="/video"
        className="bg-red-400 rounded-md shadow-lg px-4 py-2 ml-5 cursor-pointer text-lg font-semibold"
      >
        Video
      </a>
    </>
  );
}
