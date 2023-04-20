import { Link } from "react-router-dom";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useState, useEffect } from "react";
import "./Admin.css";

const token = localStorage.getItem("token");

async function getUsers() {
  try {
    const response = await fetch(
      "https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/users/getUsers?OFFSET=0&LIMIT=100",
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

async function deleteUser(id, username, email, companyId) {
  try {
    const response = await fetch(`http://localhost:9000/users/deleteUser`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_name: username,
        email: email,
        company_id: companyId,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data;
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
  const [checkedRoles, setCheckedRoles] = useState({
    administrator: true,
    manager: true,
    maintainance: true,
  });
  const [page, setPage] = useState(0);
  const usersPerPage = 10;
  const startIndex = page * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
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

  const handleDeleteUser = async (id, username, email, companyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        await deleteUser(id, username, email, companyId);
        const updatedUsers = users.filter((user) => user.user_id !== id);
        setUsers(updatedUsers);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        (checkedRoles.administrator && user.role === "administrator") ||
        (checkedRoles.manager && user.role === "manager") ||
        (checkedRoles.maintainance && user.role === "maintainance")
    )
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedUsers = filteredUsers.sort((user1, user2) => {
    const roleOrder = ["administrator", "manager", "maintainance"];
    return roleOrder.indexOf(user1.role) - roleOrder.indexOf(user2.role);
  });

  const displayedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <div className="listContainer">
      <input
        className="searchUser"
        type="text"
        placeholder="Search a user..."
        value={searchTerm}
        onChange={handleSearchBar}
      />
      <div className="checkBoxContainer">
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: "#173f5f",
                  "&.Mui-checked": {
                    color: "#173f5f",
                  },
                }}
                checked={checkedRoles.administrator}
                onChange={(event) =>
                  setCheckedRoles({
                    ...checkedRoles,
                    administrator: event.target.checked,
                  })
                }
              />
            }
            label="Administrator"
            sx={{ color: "black", marginBottom: "0.5rem" }}
            className="formControlLabel"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: "#173f5f",
                  "&.Mui-checked": {
                    color: "#173f5f",
                  },
                }}
                checked={checkedRoles.manager}
                onChange={(event) =>
                  setCheckedRoles({
                    ...checkedRoles,
                    manager: event.target.checked,
                  })
                }
              />
            }
            label="Manager"
            sx={{ color: "black", marginBottom: "0.5rem" }}
            className="formControlLabel"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: "#173f5f",
                  "&.Mui-checked": {
                    color: "#173f5f",
                  },
                }}
                checked={checkedRoles.maintainance}
                onChange={(event) =>
                  setCheckedRoles({
                    ...checkedRoles,
                    maintainance: event.target.checked,
                  })
                }
              />
            }
            label="Maintenance"
            sx={{ color: "black", marginBottom: "0.5rem" }}
            className="formControlLabel"
          />
        </FormGroup>
      </div>

      <List
        className="list"
        sx={{
          width: "100%",
          maxWidth: 715,
          bgcolor: "background.paper",
          position: "relative",
          overflowY: "scroll",
          maxHeight: 561,
          minHeight: 561,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <li>
          <ul>
            <ListSubheader
              sx={{
                bgcolor: "#173f5f",
                fontWeight: "bold",
                color: "white",
                fontSize: "16px",
                position: "relative",
              }}
              className="listSubHeader"
            >
              {"Users"}
            </ListSubheader>
            {displayedUsers.length === 0 ? ( //Checks if the user does not exist
              <ListItemText
                primary={"User not Exist"}
                className="listItemText"
              />
            ) : (
              displayedUsers.map((filteredUser) => (
                <ListItem
                  key={`user-${filteredUser.user_id}`}
                  sx={{
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  {isEditable ? (
                    <Link
                      to={`/admin/editUser/${filteredUser.user_id}`}
                      key={filteredUser.user_id}
                    >
                      <ListItemText
                        primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                        className="listItemText"
                        sx={{
                          textAlign: "center",
                          display: "block",
                        }}
                      />
                    </Link>
                  ) : isRemoving ? (
                    <ListItemText
                      primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                      className="listItemText"
                      sx={{ textAlign: "center" }}
                      onClick={() => {
                        handleDeleteUser(
                          filteredUser.user_id,
                          filteredUser.user_name,
                          filteredUser.email,
                          filteredUser.company_id
                        );
                      }}
                    />
                  ) : (
                    <ListItemText
                      primary={`${filteredUser.first_name} ${filteredUser.last_name}`}
                      className="listItemText"
                      sx={{ textAlign: "center" }}
                    />
                  )}
                </ListItem>
              ))
            )}
          </ul>
        </li>
        <div className="btnPages">
          {page > 0 && (
            <ArrowLeftIcon
              onClick={handlePrev}
              className="btnPrevious"
            ></ArrowLeftIcon>
          )}
          {endIndex < sortedUsers.length && (
            <ArrowRightIcon
              onClick={handleNext}
              className="btnNext"
            ></ArrowRightIcon>
          )}
        </div>
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
