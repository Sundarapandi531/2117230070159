const axios = require("axios");

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdW5kYXJhcGFuZGkucC4yMDIzLmFpZHNAcml0Y2hlbm5haS5lZHUuaW4iLCJleHAiOjE3NzgwNDgyMjYsImlhdCI6MTc3ODA0NzMyNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIyYjNmNTE1LTVjMTEtNDZjMy1hNDQxLTA1N2FkOGE2ZTI3OCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InN1bmRhcmEgcGFuZGkgcCIsInN1YiI6ImZjNTYyZWI1LTI0OTMtNDZlOS05ZDZiLTM4MjM3ZDAxNDkwYyJ9LCJlbWFpbCI6InN1bmRhcmFwYW5kaS5wLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsIm5hbWUiOiJzdW5kYXJhIHBhbmRpIHAiLCJyb2xsTm8iOiIyMTE3MjMwMDcwMTU5IiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiZmM1NjJlYjUtMjQ5My00NmU5LTlkNmItMzgyMzdkMDE0OTBjIiwiY2xpZW50U2VjcmV0Ijoid0J4RkNRUlVWVkR3YVZoaiJ9.vUmOWo3RAcxPFMFcZ4M6zwzyGGETYYsZSmj5FFUy86s";

const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getPriorityNotifications() {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const notifications =
      response.data.notifications;

    const sortedNotifications =
      notifications.sort((a, b) => {
        const weightDifference =
          TYPE_WEIGHT[b.Type] -
          TYPE_WEIGHT[a.Type];

        if (weightDifference !== 0) {
          return weightDifference;
        }

        return (
          new Date(b.Timestamp) -
          new Date(a.Timestamp)
        );
      });

    const top10 =
      sortedNotifications.slice(0, 10);

    console.log(
      "\nTOP 10 PRIORITY NOTIFICATIONS\n"
    );

    top10.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.Type}`
      );
      console.log(
        `Message: ${item.Message}`
      );
      console.log(
        `Time: ${item.Timestamp}`
      );
      console.log("----------------");
    });
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
}

getPriorityNotifications();