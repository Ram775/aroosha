// src/components/ui/ListHeader.jsx
import React from "react";

const ListHeader = ({ children }) => {
  return (
    <>
      {React.Children.map(children, (child) => (
        <div className="min-w-0 truncate font-semibold">{child}</div>
      ))}
    </>
  );
};

export default ListHeader;