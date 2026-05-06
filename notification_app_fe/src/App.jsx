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
  Container,
  Box,
} from "@mui/material";

import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [limit, setLimit] = useState(10);
  const [viewed, setViewed] = useState([]);
  const [page, setPage] = useState(1);

  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdW5kYXJhcGFuZGkucC4yMDIzLmFpZHNAcml0Y2hlbm5haS5lZHUuaW4iLCJleHAiOjE3NzgwNTA5NzUsImlhdCI6MTc3ODA1MDA3NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjRjY2QyNDE1LTFiNTYtNDhkMS1iNGQzLWQwODQ2ZGQwYWQ2ZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InN1bmRhcmEgcGFuZGkgcCIsInN1YiI6ImZjNTYyZWI1LTI0OTMtNDZlOS05ZDZiLTM4MjM3ZDAxNDkwYyJ9LCJlbWFpbCI6InN1bmRhcmFwYW5kaS5wLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsIm5hbWUiOiJzdW5kYXJhIHBhbmRpIHAiLCJyb2xsTm8iOiIyMTE3MjMwMDcwMTU5IiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiZmM1NjJlYjUtMjQ5My00NmU5LTlkNmItMzgyMzdkMDE0OTBjIiwiY2xpZW50U2VjcmV0Ijoid0J4RkNRUlVWVkR3YVZoaiJ9.PeSudxAKnf_pSJQq_Ipk7uYTulFpLdSYx761soWFn0I";

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

      setNotifications(response.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  let filteredNotifications = notifications;

  if (typeFilter !== "All") {
    filteredNotifications = notifications.filter(
      (item) => item.Type === typeFilter
    );
  }

  const sortedNotifications = filteredNotifications.sort((a, b) => {
    const diff = weights[b.Type] - weights[a.Type];

    if (diff !== 0) return diff;

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const topNotifications = sortedNotifications.slice(0, limit);

   return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          Priority Notifications
        </Typography>

        <Grid container spacing={2} marginBottom={4}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>
                Filter Type
              </InputLabel>

              <Select
                value={typeFilter}
                label="Filter Type"
                onChange={(e) =>
                  setTypeFilter(e.target.value)
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
              label="Top Notifications"
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
                onClick={() =>
                  markAsViewed(item.ID)
                }
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  boxShadow: 2,
                  backgroundColor: viewed.includes(item.ID)
                    ? "#eeeeee"
                    : "#ffffff",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    gutterBottom
                  >
                    {item.Type}
                  </Typography>

                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    {item.Message}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {new Date(
                      item.Timestamp
                    ).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;