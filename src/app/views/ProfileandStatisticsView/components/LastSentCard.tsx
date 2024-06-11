import React from "react";

const LastSentCard = ({ lastEmailDate }: any) => {
  return (
    <div className="h-full grid sm:grid-cols-2">
      <div className="flex flex-col justify-between relative z-10 space-y-12 lg:space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">
            Your Last Email sent in:
          </h2>
          <p className="dark:text-gray-300 text-lg text-gray-700">
            {lastEmailDate}
          </p>
        </div>
      </div>
      <div className="mt-6 relative sm:-mr-[--card-padding] sm:-my-8 before:absolute before:w-px before:inset-0 before:mx-auto before:bg-gray-200 dark:before:bg-gray-800">
        <div className="relative space-y-6 py-6 flex flex-col justify-center h-full">
          <div className="flex items-center justify-end gap-2 w-[calc(50%+0.875rem)] relative">
            <span className="h-fit text-xs block px-2 py-1 shadow-sm border rounded-md dark:bg-gray-800 dark:border-white/5 dark:text-white">
              Your Web
            </span>
            <div className="size-7 ring-4 ring-white dark:ring-[--card-dark-bg]">
              <img
                className="rounded-full  border border-gray-950/5 dark:border-white/5 size-full"
                src="https://pbs.twimg.com/profile_images/1585976646468763648/OlbJkLL0_400x400.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-[calc(50%-1rem)] relative">
            <div className="size-8 ring-4 ring-white dark:ring-[--card-dark-bg]">
              <img
                className="rounded-full  border border-gray-950/5 dark:border-white/5 size-full"
                src="https://res.cloudinary.com/draig/image/upload/v1717633081/mailprex/iwzlpdbt3uclxt5mwll3.png"
                alt=""
              />
            </div>
            <span className="h-fit text-xs block px-2 py-1 shadow-sm border rounded-md dark:bg-gray-800 dark:border-white/5 dark:text-white">
              Mailprex
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 w-[calc(50%+0.875rem)] relative">
            <span className="h-fit text-xs block px-2 py-1 shadow-sm border rounded-md dark:bg-gray-800 dark:border-white/5 dark:text-white">
              Your email
            </span>
            <div className="size-7 ring-4 ring-white dark:ring-[--card-dark-bg]">
              <img
                className="rounded-full  border border-gray-950/5 dark:border-white/5 size-full"
                src="https://pbs.twimg.com/profile_images/1585976646468763648/OlbJkLL0_400x400.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastSentCard;
