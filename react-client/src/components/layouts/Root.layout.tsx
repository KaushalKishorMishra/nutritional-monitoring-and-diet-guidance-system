import React, { PropsWithChildren } from "react";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default RootLayout;
