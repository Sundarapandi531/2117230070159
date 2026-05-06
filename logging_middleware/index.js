const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdW5kYXJhcGFuZGkucC4yMDIzLmFpZHNAcml0Y2hlbm5haS5lZHUuaW4iLCJleHAiOjE3NzgwNDQyOTQsImlhdCI6MTc3ODA0MzM5NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijg2MjhhMjQ5LTNlODUtNGJlNC1hODZhLTA0YjY5YTNiYzdjYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InN1bmRhcmEgcGFuZGkgcCIsInN1YiI6ImZjNTYyZWI1LTI0OTMtNDZlOS05ZDZiLTM4MjM3ZDAxNDkwYyJ9LCJlbWFpbCI6InN1bmRhcmFwYW5kaS5wLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsIm5hbWUiOiJzdW5kYXJhIHBhbmRpIHAiLCJyb2xsTm8iOiIyMTE3MjMwMDcwMTU5IiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiZmM1NjJlYjUtMjQ5My00NmU5LTlkNmItMzgyMzdkMDE0OTBjIiwiY2xpZW50U2VjcmV0Ijoid0J4RkNRUlVWVkR3YVZoaiJ9.AHoyDoj-ABEbIrSadeNkCj8OMWPEbMoe5n_9boE153Y";

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

module.exports = Log;