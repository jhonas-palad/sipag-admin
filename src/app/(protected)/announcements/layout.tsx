import React from "react";

const layout = ({
  children,
  create,
}: {
  children: React.ReactNode;
  create: React.ReactNode;
}) => {
  return (
    <div>
      {children}
      {create}
    </div>
  );
};

export default layout;
