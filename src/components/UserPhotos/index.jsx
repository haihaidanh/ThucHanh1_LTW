import React, { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Box,
  TextField,
  Button
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";
import axiosClient from "../../axios/axios";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [comment, setComment] = useState("");
  const serverUrl = "http://localhost:8081/images/";

  const getPhotos = async () => {
    try {
      const data = await axiosClient.get(`/api/photo/photosOfUser/${userId}`);
      const sortedPhotos = data.data.map((photo) => ({
        ...photo,
        comments: photo.comments.sort((a, b) => new Date(b.date_time) - new Date(a.date_time))
      }));
      setPhotos(sortedPhotos);
    } catch (e) { console.log(e); }
  };

  useEffect(() => {
    getPhotos();
  }, [photos.length]);

  const handleAddComment = async (photoId, comment) => {
    try {
      const response = await axiosClient.post(`/commentsOfPhoto/${photoId}`, { comment });
      getPhotos();
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const handleCommentsClick = (photoId, e) => {
    e.preventDefault();
    handleAddComment(photoId, comment);
  }

  return (

    < div >
      {
        photos.map((photo) => (
          <Card key={photo._id} style={{ marginBottom: 20 }}>

            <CardMedia
              component="img"
              image={`${serverUrl}${photo.file_name}`}
              alt="user photo"
            />


            <CardContent>

              <Typography variant="body2" color="text.secondary">
                {formatDate(photo.date_time)}
              </Typography>

              <Divider style={{ margin: "10px 0" }} />


              <Box component="form" onSubmit={(e) => { handleCommentsClick(photo._id, e) }} sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="comment"
                  placeholder="Add a comments..."
                  name="comment"
                  autoComplete="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ height: "50px", px: 7, my: "auto" }}
                >
                  Add
                </Button>
              </Box>



              {photo.comments && photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginBottom: 10 }}>


                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.last_name}
                    </Link>
                    : {comment.comment}
                  </Typography>


                  <Typography variant="caption" color="text.secondary">
                    {formatDate(comment.date_time)}
                  </Typography>

                  <Divider style={{ marginTop: 8 }} />
                </div>
              ))}

            </CardContent>
          </Card>
        ))
      }
    </div >
  );
}

export default UserPhotos;