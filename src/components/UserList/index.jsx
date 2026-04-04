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

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchModel('/user/list');
        setUsers(data);
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
                primary={`${item.first_name} ${item.last_name}`}
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
