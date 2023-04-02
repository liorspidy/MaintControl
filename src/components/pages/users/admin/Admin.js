import { Link } from "react-router-dom";
import "./Admin.css";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";

const token = localStorage.getItem("token");

async function getUsers() {
  try {
    const response = await fetch(
      "http://localhost:9000/users/getUsers?OFFSET=0&LIMIT=3",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data.answer;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const Admin = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isSectionOpen, setIsSectionOpen] = useState(
    ["administrator", "manager", "maintenance"].map(() => true)
  );

  const toggleSection = (index) => {
    const newIsSectionOpen = [...isSectionOpen];
    newIsSectionOpen[index] = !newIsSectionOpen[index];
    setIsSectionOpen(newIsSectionOpen);
  };

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearchBar = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIsEditable = () => {
    if (!isRemoving) {
      setIsEditable(!isEditable);
    }
  };

  const handleIsRemoving = () => {
    if (!isEditable) {
      setIsRemoving(!isRemoving);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="listContainer">
      <input
        className="searchUser"
        type="text"
        placeholder="Search a user..."
        value={searchTerm}
        onChange={handleSearchBar}
      />
      <List
        sx={{
          width: "100%",
          maxWidth: 700,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 500,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {["administrator", "manager", "maintainance"].map(
          (sectionId, index) => (
            <li key={`section-${sectionId}`}>
              <ul>
                <ListSubheader
                  className="listSubHeader"
                  onClick={() => toggleSection(index)}
                >{`${sectionId}`}</ListSubheader>
                {filteredUsers
                  .filter((user) => user.role === sectionId)
                  .map(
                    (filteredUser) =>
                      isSectionOpen[index] && (
                        <ListItem key={`user-${filteredUser.user_id}`}>
                          {isEditable ? (
                            <Link
                              to={`/editUser/${filteredUser.user_id}`}
                              key={filteredUser.user_id}
                            >
                              <ListItemText
                                primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                                className="listItemText"
                              />
                            </Link>
                          ) : //adding the DEL function
                          isRemoving ? (
                            <ListItemText
                              primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                              className="listItemText"
                            />
                          ) : (
                            <ListItemText
                              primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                              className="listItemText"
                            />
                          )}
                        </ListItem>
                      )
                  )}
              </ul>
            </li>
          )
        )}
      </List>
      <div className="usersButtons">
        <Link to="addUser">
          <div className="userBtn">
            <AddIcon className="addIcon" />
          </div>
        </Link>
        <div className="userBtn" onClick={handleIsEditable}>
          {isEditable && <EditIcon className="editIconEditOn" />}
          {!isEditable && <EditIcon className="editIconEditOff" />}
        </div>
        <div className="userBtn" onClick={handleIsRemoving}>
          {isRemoving && <DeleteIcon className="deleteIconRemovingOn" />}
          {!isRemoving && <DeleteIcon className="deleteIconRemovingOff" />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
