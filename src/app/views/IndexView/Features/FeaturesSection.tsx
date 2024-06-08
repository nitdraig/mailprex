import React from "react";

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-br from-accent/80 via-primary/90 to-primary py-16 h-screen overflow-hidden">
      <div className="container m-auto px-6 space-y-8 text-accent md:px-12">
        <div>
          <span className="text-accent text-lg font-semibold">
            Main features
          </span>
          <h2 className="mt-4 text-2xl text-accent font-bold md:text-4xl">
            A technology-first approach to payments{" "}
            <br className="lg:block" hidden />
            and finance
          </h2>
        </div>
        <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8">
              <img
                src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/burger.png"
                className="w-10"
                width="512"
                height="512"
                alt="burger illustration"
              />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-primary">
                  First feature
                </h5>
                <p className="text-sm text-secondary">
                  Neque Dolor, fugiat non cum doloribus aperiam voluptates
                  nostrum.
                </p>
              </div>
              <a
                href="#"
                className="flex justify-between items-center group-hover:text-primary"
              >
                <span className="text-sm text-secondary">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  &RightArrow;
                </span>
              </a>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8">
              <img
                src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/trowel.png"
                className="w-10"
                width="512"
                height="512"
                alt="burger illustration"
              />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-primary">
                  Second feature
                </h5>
                <p className="text-sm text-secondary">
                  Neque Dolor, fugiat non cum doloribus aperiam voluptates
                  nostrum.
                </p>
              </div>
              <a
                href="#"
                className="flex justify-between items-center group-hover:text-primary"
              >
                <span className="text-sm text-secondary">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  &RightArrow;
                </span>
              </a>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8">
              <img
                src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/package-delivery.png"
                className="w-10"
                width="512"
                height="512"
                alt="burger illustration"
              />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-primary">
                  Third feature
                </h5>
                <p className="text-sm text-secondary">
                  Neque Dolor, fugiat non cum doloribus aperiam voluptates
                  nostrum.
                </p>
              </div>
              <a
                href="#"
                className="flex justify-between items-center group-hover:text-primary"
              >
                <span className="text-sm text-secondary">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  &RightArrow;
                </span>
              </a>
            </div>
          </div>
          <div className="relative group bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
            <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
              <img
                src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/metal.png"
                className="w-10"
                width="512"
                height="512"
                alt="burger illustration"
              />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-primary">
                  More features
                </h5>
                <p className="text-sm text-secondary">
                  Neque Dolor, fugiat non cum doloribus aperiam voluptates
                  nostrum.
                </p>
              </div>
              <a
                href="#"
                className="flex justify-between items-center group-hover:text-primary"
              >
                <span className="text-sm text-secondary">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  &RightArrow;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
