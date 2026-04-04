import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];

  const user = userId ? models.userModel(userId) : null;

  const isUserDetail = location.pathname.includes("/users/");
  const isUserPhotos = location.pathname.includes("/photos/");

  let rightContent = "";

  if (isUserPhotos && user) {
    rightContent = `Photos of ${user.first_name} ${user.last_name}`;
  } else if (isUserDetail && user) {
    rightContent = `${user.first_name} ${user.last_name}`;
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>

        <Typography variant="h5" color="inherit">
          Nguyen Hai
        </Typography>
        <Typography variant="h6" color="inherit">
          {rightContent}
        </Typography>

      </Toolbar>
    </AppBar>
  );
}

export default TopBar;