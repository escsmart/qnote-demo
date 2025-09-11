const config = {
  apiServer: "http://192.168.2.51:5000/inote", // ip และ port server
  // apiServer: "https://api.allservice.in.th/inote",
  token: "inotetokensecret",
  rowPerPage: 17,
  headers: () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Cookie: "PHPSESSID=0cknfav3b8e7tbmj4q6fukef81",
      },
    };
  },
  headerAuth: () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
  },
};

module.exports = config;
