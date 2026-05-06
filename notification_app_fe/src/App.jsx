import {
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

import API from "./services/api";

function App() {
  const [notifications, setNotifications] =
    useState([]);

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [limit, setLimit] = useState(10);
  const [viewed, setViewed] = useState([]);
  const [page, setPage] = useState(1);

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdW5kYXJhcGFuZGkucC4yMDIzLmFpZHNAcml0Y2hlbm5haS5lZHUuaW4iLCJleHAiOjE3NzgwNDgyMjYsImlhdCI6MTc3ODA0NzMyNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIyYjNmNTE1LTVjMTEtNDZjMy1hNDQxLTA1N2FkOGE2ZTI3OCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InN1bmRhcmEgcGFuZGkgcCIsInN1YiI6ImZjNTYyZWI1LTI0OTMtNDZlOS05ZDZiLTM4MjM3ZDAxNDkwYyJ9LCJlbWFpbCI6InN1bmRhcmFwYW5kaS5wLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsIm5hbWUiOiJzdW5kYXJhIHBhbmRpIHAiLCJyb2xsTm8iOiIyMTE3MjMwMDcwMTU5IiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiZmM1NjJlYjUtMjQ5My00NmU5LTlkNmItMzgyMzdkMDE0OTBjIiwiY2xpZW50U2VjcmV0Ijoid0J4RkNRUlVWVkR3YVZoaiJ9.vUmOWo3RAcxPFMFcZ4M6zwzyGGETYYsZSmj5FFUy86s";

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  useEffect(() => {
  fetchNotifications();
}, [limit, typeFilter, page]);
  const markAsViewed = (id) => {
  setViewed([...viewed, id]);
};
  const fetchNotifications = async () => {
    try {
      const response = await API.get(
  `/notifications?limit=${limit}&page=${page}&notification_type=${typeFilter}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN.trim()}`,
          },
        }
      );

      setNotifications(
        response.data.notifications
      );
    } catch (error) {
      console.log(error);
    }
  };

  let filteredNotifications =
    notifications;

  if (typeFilter !== "All") {
    filteredNotifications =
      notifications.filter(
        (item) =>
          item.Type === typeFilter
      );
  }

  const sortedNotifications =
    filteredNotifications.sort((a, b) => {
      const diff =
        weights[b.Type] -
        weights[a.Type];

      if (diff !== 0) {
        return diff;
      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

  const topNotifications =
    sortedNotifications.slice(0, limit);

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
      >
        Priority Notifications
      </Typography>

      <Grid
        container
        spacing={2}
        marginBottom={3}
      >
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>
              Filter Type
            </InputLabel>

            <Select
              value={typeFilter}
              label="Filter Type"
              onChange={(e) =>
                setTypeFilter(
                  e.target.value
                )
              }
            >
              <MenuItem value="All">
                All
              </MenuItem>

              <MenuItem value="Placement">
                Placement
              </MenuItem>

              <MenuItem value="Result">
                Result
              </MenuItem>

              <MenuItem value="Event">
                Event
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Top N Notifications"
            value={limit}
            onChange={(e) =>
              setLimit(e.target.value)
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {topNotifications.map((item) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={item.ID}
          >
            <Card
  onClick={() => markAsViewed(item.ID)}
  style={{
    backgroundColor:
      viewed.includes(item.ID)
        ? "#f5f5f5"
        : "#d1e7ff",
    cursor: "pointer",
  }}
>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  {item.Type}
                </Typography>

                <Typography
                  variant="body1"
                >
                  {item.Message}
                </Typography>

                <Typography
                  variant="body2"
                  marginTop={2}
                >
                  {item.Timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;