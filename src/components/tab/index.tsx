import { useState } from "react";
import { Tab, Nav, List } from "./style";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <Tab>
      <Nav>
        <List className={activeTab === "tab1" ? "active" : ""} onClick={() => setActiveTab("tab1")}>Tab 1</List>
        <List className={activeTab === "tab2" ? "active" : ""} onClick={() => setActiveTab("tab2")}>Tab 2</List>
      </Nav>
      <div className="outlet">
      </div>
    </Tab>
  );
};
export default Tabs;