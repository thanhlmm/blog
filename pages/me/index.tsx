import Head from "next/head";
import Image from "next/image";

const MePage = () => {
  return (
    <div className="max-w-5xl mx-auto mt-4 space-y-8 p-2">
        <Head>
        <title>🤷‍♂️ Me</title>
      </Head>
      {/* IDENTITY */}
      <div className="px-4 mt-4 mb-2 text-xl text-center md:mt-8 md:mb-4 md:px-8">
        "A boy dreams to create value for others via software product 😴"
        <br />
        <div className="mt-4">
          <Image
            src="/me.jpeg"
            alt="me"
            className="rounded-md"
            width="60"
            height="60"
          />
          <div className="font-medium text-lg">Thanh Le</div>
        </div>
      </div>

      {/* MY VALUE METRICS */}
      <div>
        <h1 className="text-2xl text-gray-700 mb-2">What do I value and believe?</h1>
        <div className="pl-2 mx-auto px-3 md:pl-10">
          <ul className="space-y-2">
            <li><strong>Professional ethics/Naive</strong> - I believe it makes me happy on the journey without any regret</li>
            <li><strong>Value</strong> - I prefer value it created instead of it flashy</li>
            <li><strong>Myself</strong> - In the end, the only thing you can control is yourself. I believe if I'm happy, people around gonna happy</li>
          </ul>
          </div>
        </div>

      <div>
        <h1 className="text-2xl text-gray-700 mb-2">Facts <span className="opacity-40">TODO: Add a quick form here</span></h1>
        <div className="pl-2 md:pl-10 space-y-4">
          <div>
            <p className=" underline">Why do I try to put lots of emojis?</p>
            <p className="">It makes me look funny 🤪</p>
          </div>

          <div>
            <p className=" underline">My hobbies?</p>
            <p className="">Running 🏃‍♂️, trekking 🧗‍♂️, Dota 2, lost in my thought while driving 🚴‍♂️</p>
          </div>

          <div>
            <p className=" underline">My thought on technical?</p>
            <p className="">It depends on which angle do you want to hear 😪</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl text-gray-700 mb-2">Connect with me</h1>
        <div className="space-x-4 pl-2 md:pl-10">
          <a className="text-indigo-600" href="https://github.com/thanhlmm" target="_blank" rel="noopener noreferrer">Github</a>
          <a className="text-indigo-600" href="https://twitter.com/cuthanh15" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a className="text-indigo-600" href="mailto:mihthanh27@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>
        </div>
      </div>
    </div>
  );
};

export default MePage;
