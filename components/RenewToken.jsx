"use client";
import config from "@/app/config";
import axios from "axios";

const RenewToken = () => {
  const response = new Object();
  const autoSignin = async () => {
    const formData = {
      userId: parseInt(config.uData("uId")),
    };
    await axios
      .post(config.apiServer + "/renewsignin", formData)
      .then((res) => {
        if (res.data.token !== undefined) {
          localStorage.setItem("tokenSignin", res.data.token);
          localStorage.setItem("uId", res.data.result.uId);
          localStorage.setItem("uName", res.data.result.uName);
          localStorage.setItem("uLevel", res.data.result.uLevel);
          localStorage.setItem("uPic", res.data.result.uImg);
          response.message = res.data.message;
        } else {
          response.message = res.data.message;
        }
      });
  };

  autoSignin();
  return response;
};
export default RenewToken;
