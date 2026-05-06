const axios = require("axios");

const body = {
  email: "sundarapandi.p.2023.aids@ritchennai.edu.in",
  name: "sundara pandi p",
  rollNo: "2117230070159",
  accessCode: "BTCDqT",

  clientID: "fc562eb5-2493-46e9-9d6b-38237d01490c",
  clientSecret: "wBxFCQRUVVDwaVhj"
};

axios
  .post(
    "http://20.207.122.201/evaluation-service/auth",
    body
  )
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });