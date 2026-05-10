import './App.css';

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import { LogIn } from "./components/LogIn";
import { Register } from "./components/Register";

const App = (props) => {

  const [user, setUser] = useState(
    localStorage.getItem("name")
      ? { last_name: localStorage.getItem("name") }
      : null
  );

  const onLogin = (user) => {
    localStorage.setItem("name", user.last_name);
    console.log(user.accessToken);
    localStorage.setItem("accessToken", user.accessToken);
    setUser(user);
  }

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              handleLogout={handleLogout}
              handleAddPhoto={() => { }}
              user={user}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          {user ? (
            <>
              <Grid item sm={3}>
                <Paper className="main-grid-item">
                  <UserList />
                </Paper>
              </Grid>
              <Grid item sm={9}>
                <Paper className="main-grid-item">
                  <Routes>
                    <Route
                      path="/users/:userId"
                      element={<UserDetail />}
                    />
                    <Route
                      path="/photos/:userId"
                      element={<UserPhotos />}
                    />
                    <Route path="/users" element={<UserList />} />

                  </Routes>
                </Paper>
              </Grid>
            </>
          ) : (
            <Paper className="main-grid-item" style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Routes>
                <Route path="/login" element={<LogIn onLogin={onLogin} />} />
                <Route path='/register' element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </Paper>
          )}
        </Grid>
      </div>
    </Router>
  );
}

export default App;
