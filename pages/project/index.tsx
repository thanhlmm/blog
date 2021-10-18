import Head from "next/head";
import Image from "next/image";

const NOTION_PROJECTS_ID =
  process.env.NOTION_PROJECTS_ID || "9901f946476843c98b1d47a730297c7f";
interface Project {
  id: string;
  description: string;
  name: string;
  image: {
    name: string;
    url: string;
  }[];
  url?: string;
  github?: string;
}

export const getAllProjects = async (): Promise<Project[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_PROJECTS_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  // Get all posts again
  const projects = await getAllProjects();

  return {
    props: {
      projects,
    },
    revalidate: 60 * 5,
  };
}

const ProjectPage = ({ projects }: { projects: Project[] }) => {
  return (
    <div>
      <Head>
        <title>💡 Projects</title>
      </Head>
      <div className="px-4 mt-4 mb-2 text-xl text-center md:mt-8 md:mb-4 md:px-8">
        "I do some pet projects in the free time. It helps me learn new tech and
        experiment on building.
        <br />
        Stay tuned, the list is getting longer 🤪"
        <div className="mt-4">
          <Image
            src="/me.jpeg"
            alt="me"
            className="rounded-md"
            width="60"
            height="60"
          />
        </div>
      </div>
      <div className="relative pt-16 pb-32 overflow-hidden bg-white">
        {projects.map((prj) => {
          if (true) {
            return (
              <div className="relative mb-20">
                <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                  <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                    <div>
                      {/* <div>
                      <span className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-md">
                        <InboxIcon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div> */}
                      <div className="mt-6">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                          {prj.name}
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                          {prj.description}
                        </p>
                        <div className="mt-6 space-x-4">
                          {prj.url && (
                            <a
                              href={prj.url}
                              target="_blank"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Take a look
                            </a>
                          )}

                          {prj.github && (
                            <a href={prj.github} target="_blank">
                              <img
                                src="/assets/github.svg"
                                className="inline-block w-8 h-8"
                                alt="Github"
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="pt-6 mt-8 border-t border-gray-200">
                    <blockquote>
                      <div>
                        <p className="text-base text-gray-500">
                          &ldquo;Cras velit quis eros eget rhoncus lacus
                          ultrices sed diam. Sit orci risus aenean curabitur
                          donec aliquet. Mi venenatis in euismod ut.&rdquo;
                        </p>
                      </div>
                      <footer className="mt-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="w-6 h-6 rounded-full"
                              src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                              alt=""
                            />
                          </div>
                          <div className="text-base font-medium text-gray-700">
                            Marcia Hill, Digital Marketing Manager
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div> */}
                  </div>
                  <div className="mt-12 sm:mt-16 lg:mt-0">
                    <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                      <img
                        className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                        src={prj.image?.[0].url}
                        alt="Inbox user interface"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div className="mt-24 mb-10">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                  <div>
                    {/* <div>
                    <span className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-md">
                      <SparklesIcon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div> */}
                    <div className="mt-6">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {prj.name}
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        {prj.description}
                      </p>
                      <div className="mt-6 space-x-4">
                        {prj.url && (
                          <a
                            href={prj.url}
                            target="_blank"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Take a look
                          </a>
                        )}
                        {prj.github && (
                          <a href={prj.github} target="_blank">
                            <img
                              src="/assets/github.svg"
                              className="inline-block w-8 h-8 text-gray-600"
                              alt="Github"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                  <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img
                      className="w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={prj.image?.[0].url}
                      alt="Customer profile user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPage;
