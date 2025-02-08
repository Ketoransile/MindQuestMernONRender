import React from "react";

const topPerformers = [
  {
    email: "mmerrgan0@ucoz.ru",
    username: "ldachs0",
    avatar: "/admin.jpg",
  },
  {
    email: "ejuszczak1@chicagotribune.com",
    username: "amckyrrelly1",
    avatar: "/admin.jpg",
  },
  {
    email: "farnould2@mysql.com",
    username: "atchaikovsky2",
    avatar: "/admin.jpg",
  },
  {
    email: "aoxherd3@merriam-webster.com",
    username: "ncudiff3",
    avatar: "/admin.jpg",
  },
  {
    email: "jpass4@cdbaby.com",
    username: "ogranham4",
    avatar: "/admin.jpg",
  },
  {
    email: "randriuzzi5@independent.co.uk",
    username: "stoderi5",
    avatar: "/admin.jpg",
  },
  {
    email: "dbrashier6@japanpost.jp",
    username: "clawty6",
    avatar: "/admin.jpg",
  },
  {
    email: "pcanape7@arizona.edu",
    username: "idoubleday7",
    avatar: "/admin.jpg",
  },
  {
    email: "sdedenham8@quantcast.com",
    username: "jbachman8",
    avatar: "/admin.jpg",
  },
  {
    email: "srenzini9@cocolog-nifty.com",
    username: "ktomasik9",
    avatar: "/admin.jpg",
  },
];

const TopPerformers = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <h1 className="text-2xl font-bold text-white text-start">
        Top Performers
      </h1>
      {topPerformers.map((topper) => (
        <div className="flex items-center gap-10" key={topper.email}>
          <img
            src={topper.avatar}
            alt="user-img"
            className="size-8 rounded-full"
          />
          <div className="flex flex-col justify-center">
            <span className="text-lg text-slate-400">{topper.username}</span>
            <span className="text-xs text-slate-600">{topper.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPerformers;
