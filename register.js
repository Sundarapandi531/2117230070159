const axios = require("axios");

const body = {
  email: "sundarapandi.p.2023.aids@ritchennai.edu.in",
  name: "Sundara Pandi P",
  mobileNo: "8270865182",
  githubUsername: "Sundarapandi531",
  rollNo: "2117230070159",
  accessCode: "BTCDqT",
};

axios
  .post("http://20.207.122.201/evaluation-service/register", body)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });
