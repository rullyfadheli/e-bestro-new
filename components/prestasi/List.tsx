import React, { JSX } from "react";
import ListHeader from "./ListHeader";
import ListContent from "./ListContent";

function List(): JSX.Element {
  return (
    <div className="md:col-span-2 col-span-1 w-full mr-2  overflow-x-auto">
      <ListHeader />
      <ListContent />
    </div>
  );
}

export default List;
