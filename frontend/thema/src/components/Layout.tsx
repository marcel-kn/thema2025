import React from "react";
import { useState } from "react";
import MainHeader from "./MainHeader";
import BookingsView from "./bookingsView/BookingsView";
import ProductionsView from "./productionsView/ProductionsView";

export type View = "bookings" | "productions" | "calendar" | "ensembles";

function Layout(): React.ReactElement {
  const [currentView, setCurrentView] = useState<View>("bookings");

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <MainHeader onMenuClick={setCurrentView} />
      {currentView === "bookings" && <BookingsView />}
      {currentView === "productions" && <ProductionsView />}
      {currentView === "calendar" && <div>Here will be a calendar view</div>}
      {currentView === "ensembles" && (
        <div>Here will be a view of ensembles</div>
      )}
    </div>
  );
}

export default Layout;
