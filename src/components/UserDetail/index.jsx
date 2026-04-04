import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchModel(`/user/${userId}`);

        setUser(response);
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, [userId]);

  // loading hoặc không có user
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>

      <Typography>Location: {user.location}</Typography>
      <Typography>Occupation: {user.occupation}</Typography>
      <Typography>Description: {user.description}</Typography>

      <br />

      <Link to={`/photos/${user._id}`}>
        View Photos
      </Link>
    </div>
  );
}

export default UserDetail;