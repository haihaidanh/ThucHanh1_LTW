import React, { useState, useEffect, useRef } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { useNavigate } from "react-router-dom";


import "./styles.css";
import models from "../../modelData/models";
import axiosClient from "../../axios/axios";

function TopBar({ user, handleLogout, handleAddPhoto }) {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const userId = pathParts[2];
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosClient.get(`/api/user/user/${userId}`);
      } catch (e) {
        console.log(e);
      }
    };

    if (userId) {
      getUser();
    }
  }, [userId]);

  const onFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("uploadedphoto", file);

    try {
      const response = await axiosClient.post("/api/photo/photos/new", formData);

      if (response.status === 200) {
        alert("Upload thành công!");
      } else {
        alert("Upload thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi upload:", error);
    }
  };

  // Hàm kích hoạt click vào input file ẩn
  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };

  const isUserDetail = location.pathname.includes("/users/");
  const isUserPhotos = location.pathname.includes("/photos/");

  let rightContent = "";

  if (isUserPhotos && user) {
    rightContent = `Photos of ${user.last_name}`;
  } else if (isUserDetail && user) {
    rightContent = `${user.last_name}`;
  }

  return (
    <AppBar className="top-bar">
      {user ? (
        <div style={{ display: "flex", justifyContent: "start", gap: "16px", marginLeft: "16px" }}>
          <Typography variant="h6" color="inherit">
            Hi, {user.last_name}
          </Typography>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
          <Button onClick={handleAddPhotoClick} color="inherit">
            Add Photo
          </Button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={onFileSelect}
          />
        </div>
      ) : (
        <Button color="inherit" style={{ display: "flex", justifyContent: "start", marginLeft: "16px" }}>
          Please Login
        </Button>
      )}
    </AppBar>
  );
}

export default TopBar;