import React from "react";
import MainHeader from "./MainHeader";
import BookingsView from "./bookingsView/BookingsView";

type LayoutProps = {
  children: React.ReactNode
}

function Layout(): React.ReactElement {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <MainHeader />
      <BookingsView />
    </div>
  );
};

export default Layout;