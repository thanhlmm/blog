import Head from "next/head";
import Image from "next/image";

const MePage = () => {
  return (
    <div className="max-w-5xl p-2 mx-auto mt-4 space-y-8">
      <Head>
        <title>🤷‍♂️ Me</title>
        <meta
          name="description"
          content="A boy dreams to create value for others via software product 😴"
        />
      </Head>
      {/* IDENTITY */}
      <div className="px-4 mt-4 mb-2 text-xl text-center md:mt-8 md:mb-4 md:px-8">
        "A boy dreams to create value for others via software products 😴"
        <br />
        <div className="mt-4">
          <Image
            src="/me.jpeg"
            alt="me"
            className="rounded-md"
            width="60"
            height="60"
          />
          <div className="text-lg font-medium">Thanh Le</div>
        </div>
      </div>

      {/* MY VALUE METRICS */}
      <div>
        <h1 className="mb-2 text-2xl text-gray-700 dark:text-white">
          What I value and believe
        </h1>
        <div className="px-3 pl-2 mx-auto md:pl-10">
          <ul className="space-y-2">
            <li>
              <strong>Professional ethics/Naive</strong> - I believe it makes me
              happy on the journey without any regret
            </li>
            <li>
              <strong>Value</strong> - I prefer value it created instead of its
              flashy
            </li>
            <li>
              <strong>Freedom</strong> - I think all the way road to freedom. So
              I want to have freedom and everyone around me can feel its value
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h1 className="mb-2 text-2xl text-gray-700 dark:text-white">Facts</h1>
        <div className="pl-2 space-y-4 md:pl-10">
          <div>
            <p className="underline ">Why do I try to put lots of emojis?</p>
            <p className="">It makes me look funny 🤪</p>
          </div>

          <div>
            <p className="underline ">My hobbies?</p>
            <p className="">
              Running 🏃‍♂️, trekking 🧗‍♂️, Dota 2, lost in my thought while riding
              🚴‍♂️
            </p>
          </div>

          <div>
            <p className="underline ">My thought on technical?</p>
            <p className="">It depends on which angle do you want to hear 😪</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="mb-2 text-2xl text-gray-700 dark:text-white">
          Connect with me
        </h1>
        <div className="pl-2 space-x-4 md:pl-10">
          <a
            className="text-indigo-600"
            href="https://github.com/thanhlmm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="text-indigo-600"
            href="https://twitter.com/thanhledev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            className="text-indigo-600"
            href="mailto:mihthanh27@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>

          <a
            className="text-indigo-600"
            href="https://app.cal.com/thanhle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meet me
          </a>
        </div>
      </div>

      <div>
        <iframe
          src="https://tally.so/embed/wgWJOw?hideTitle=1&alignLeft=1&transparentBackground=1"
          className="w-full max-w-full border-none"
          height="500"
          frameBorder="0"
          title="ThanhLe.blog feedbacks"
        ></iframe>
        {/* <iframe
          allowTransparency
          allowFullScreen
          allow="geolocation; microphone; camera"
          src="https://my.forms.app/form/6188ce488c8fa556a16e2129"
          frameBorder="0"
          className="w-full max-w-full border-none"
          style={{ height: 800 }}
        ></iframe> */}
      </div>
    </div>
  );
};

export default MePage;
