import { cookies } from "./cookies";

async function checkResponse(response) {
  let text = await response.text();
  try {
    let json = JSON.parse(text);
    return json;
  } catch (error) {
    return text;
  }
}

export const ajax = {
  get: function get(endPoint, addJWT = false) {
    return new Promise(function (resolve, reject) {
      let headers = {
        mode: "cors",
      };

      if (addJWT) headers.authorization = `Bearer ${cookies.get("j")}`;

      fetch(`/api/${endPoint}`, {
        method: "GET",
        headers: headers,
      }).then((response) => {
        if (response.ok) checkResponse(response).then((res) => resolve(res));
        else checkResponse(response).then((res) => reject(res));
      });
    });
  },
  post: function post(endPoint, contentType, body, addJWT = false) {
    return new Promise(function (resolve, reject) {
      let headers = {
        mode: "cors",
      };

      if (contentType === "json") headers["Content-Type"] = "application/json";
      if (addJWT) headers.authorization = `Bearer ${cookies.get("j")}`;

      return fetch(`https://localhost:7035/api/${endPoint}`, {
        method: "POST",
        headers: headers,
        body: body,
      }).then((response) => {
        if (response.ok) checkResponse(response).then((res) => resolve(res));
        else checkResponse(response).then((res) => reject(res));
      });
    });
  },
};
