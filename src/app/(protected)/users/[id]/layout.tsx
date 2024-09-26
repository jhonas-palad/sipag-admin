import React from "react";

type UserIdLayoutProps = {
  user_details: React.ReactNode;
  claim_history: React.ReactNode;
  children: React.ReactNode;
};
const layout = ({
  user_details,
  claim_history,
  children,
}: UserIdLayoutProps) => {
  return (
    <>
      {children}
      {user_details}
      {claim_history}
    </>
  );
};

export default layout;
