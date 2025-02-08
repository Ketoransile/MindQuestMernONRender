import React from "react";
const InterestCard = ({ subjectName, subjectIcon: SubjectIcon }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-between bg-purple-700 rounded-xl p-4 self-start hover:bg-purple-500">
      <SubjectIcon className="text-2xl text-white" />
      <h1 className="text-lg text-white text-center">{subjectName}</h1>
    </div>
  );
};

export default InterestCard;
