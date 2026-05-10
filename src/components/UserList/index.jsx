import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axiosClient from "../../axios/axios";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList({ user }) {

  if (user) {

  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await axiosClient.get("/api/user/user/list");
        setUsers(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <>
            <ListItem
              button
              component={Link}
              to={`/users/${item._id}`}
            >
              <ListItemText
                primary={`${item.last_name}`}
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
}

export default UserList;
