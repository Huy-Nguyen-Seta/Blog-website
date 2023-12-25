import React, { ReactNode } from "react";
import SingleContent from "../SingleContent";
import SingleRelatedPosts from "../SingleRelatedPosts";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}

      {/* SINGLE MAIN CONTENT */}

    </div>
  );
};

export default layout;
