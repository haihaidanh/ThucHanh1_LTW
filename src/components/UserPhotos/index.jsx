import React, { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const data = await fetchModel(`/photosOfUser/${userId}`);
        setPhotos(data);
      } catch (e) {
        console.log(e);
      }
    };
    getPhotos();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (

    < div >
      {
        photos.map((photo) => (
          <Card key={photo._id} style={{ marginBottom: 20 }}>


            <CardMedia
              component="img"
              image={`/images/${photo.file_name}`}
              alt="user photo"
            />

            <CardContent>

              <Typography variant="body2" color="text.secondary">
                {formatDate(photo.date_time)}
              </Typography>

              <Divider style={{ margin: "10px 0" }} />


              {photo.comments && photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginBottom: 10 }}>


                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
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