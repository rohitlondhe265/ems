"use client";

import { useState } from "react";

const CollapsibleComponent = ({ title, content }) => {
  const [isCollapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <div className="rounded-md bg-skin-on-fill px-3 py-1">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={handleToggle}
        >
          <h2 className="text-xl font-semibold">{title}</h2>
          <span>
            {isCollapsed ? 'Expand' : 'Collapse'}
          </span>
        </div>

        <div
          className={`mt-2 transition-all overflow-hidden ${
            isCollapsed ? 'h-0' : 'h-auto'
          }`}
        >
          <p className="text-muted">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleComponent;