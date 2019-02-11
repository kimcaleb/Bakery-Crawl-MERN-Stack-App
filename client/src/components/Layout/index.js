import React from "react";
import Header from "./Header";

export default({ children, currentUser }) => (
    <div>
      <Header currentUser={currentUser} />
      <main>
        { children }
      </main>
    </div>
  )