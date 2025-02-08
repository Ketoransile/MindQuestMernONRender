import React, { useEffect, useState } from "react";
import useUsersStore from "../../store/useUsersStore.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card.jsx";

const UsersResult = () => {
  const { results } = useUsersStore();
  const [userResults, setUserResults] = useState(results); // Initialize with Zustand results

  // Update results when new ones are added
  useEffect(() => {
    setUserResults(results);
  }, [results]);

  return (
    <div className="p-10 min-h-screen bg-front">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl font-bold text-white">
          See Your Results Below
        </h1>
        <div className="grid grid-cols-5 gap-6">
          {userResults.length > 0 ? (
            userResults.map((result) => (
              <UsersResultCard key={result._id} result={result} />
            ))
          ) : (
            <p className="text-white">No results available</p>
          )}
        </div>
      </div>
    </div>
  );
};

const UsersResultCard = ({ result }) => {
  console.log("Result output from userrsult.jsx", result);
  return (
    <Card className="w-[250px]">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle>{result.quiz_id.title}</CardTitle>

        <CardDescription className="items-center break-words max-w-[200px]">
          {result.quiz_id.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">Total: 5 Questions</div>
          <div className="flex flex-col space-y-1.5">
            Your Result: {result.score}
          </div>
          <div className="flex flex-col space-y-1.5">
            Your Status: {result.status}
          </div>
          <div className="flex flex-col space-y-1.5">
            Date Taken: {new Date(result.date_taken).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Additional actions if needed */}
      </CardFooter>
    </Card>
  );
};

export default UsersResult;
