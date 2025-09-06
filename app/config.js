const config = {
  apiServer: "http://localhost:5000", // ip และ port server
  token: "controlsofttokensecret",
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
