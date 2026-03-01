import React from "react";
import "./ProfilePage.scss";
import Nav from "./Nav";
import Sidebar from "../../posts/component/Sidebar";

const ProfilePage = () => {
  return (
    <main className="profile-page">
      <Nav />
      <div className="profile-page-body">
        <Sidebar/>
      </div>
    </main>
  );
};

export default ProfilePage;