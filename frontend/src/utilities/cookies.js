export const cookies = {
  add: function add(key, value, shelfDays) {
    let cookie = `${key}=${value}`;

    if (shelfDays) {
      let date = new Date();
      date.setDate(date.getDate() + shelfDays);
      cookie += `;expires=${date.toUTCString()}`;
    }

    document.cookie = cookie;
  },
  get: function get(key) {
    if (document.cookie)
      return `${document.cookie.split(`${key}=`)[1].split(";")[0]}`;
    else return "";
  },
  remove: function remove(keys) {
    keys.forEach((key) => {
      document.cookie = `${key}="";expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    });
  },
};
