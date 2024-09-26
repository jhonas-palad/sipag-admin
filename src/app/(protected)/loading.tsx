import React from "react";
const loading = () => {
  return (
    <div className="grid h-[calc(100vh-7rem)] w-full place-items-center">
      <span className="inline-block h-8 w-8 animate-spin border-green-600 rounded-full border-4 border-b-transparent"></span>
    </div>
  );
};

export default loading;
