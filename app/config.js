const config = {
  // apiServer: "http://192.168.2.51:5000/inote", // ip และ port server
  apiServer: "https://api.allservice.in.th/inote",
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
  uData: (req) => {
    let res = undefined;
    if (req == "uId") {
      res = localStorage.getItem("uId");
    } else if (req == "uName") {
      res = localStorage.getItem("uName");
    } else if (req == "uLevel") {
      res = localStorage.getItem("uLevel");
    } else if (req == "uPic") {
      res = localStorage.getItem("uPic");
    }
    return res;
  },
  headerAuth: () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenSignin"),
      },
    };
  },
};

module.exports = config;
