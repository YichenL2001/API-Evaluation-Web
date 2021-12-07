// Functions to help with user actions.
import ENV from "./../config.js";
const API_HOST = ENV.api_host;

export const checkSession = (app) => {
  const url = `${API_HOST}/users/check-session`;

  if (!ENV.use_frontend_test_user) {
    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json && json.currentUser) {
          app.setState({
            currentUser: json.currentUser,
            id: json.id,
            is_regUser: json.is_regUser,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    app.setState({ currentUser: ENV.user });
  }
};
export const pushAdmin = () => {
  const url = `${API_HOST}/api/admin`;

  const request = new Request(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  fetch(request);
};

export const register = (signupComp) => {
  const url = `${API_HOST}/api/users`;
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(signupComp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then(function (res) {
      if (res.status === 200) {
        const goodmessage = { body: "User Added!", type: "success" };
        signupComp.setState({
          message: goodmessage,
        });
      } else {
        const failmessage = {
          body: "Username already exists!",
          type: "failure",
        };
        signupComp.setState({
          message: failmessage,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
  // Create our request constructor with all the parameters we need
  const request = new Request(`${API_HOST}/users/login`, {
    method: "post",
    body: JSON.stringify(loginComp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json.currentUser !== undefined) {
        app.setState({
          currentUser: json.currentUser,
          id: json.id,
          is_regUser: json.is_regUser,
        });
      }
    })
    .catch((error) => {
      loginComp.setState({ message: "Username or Password incorrect!" });
    });
};
export const send_user_info = (newPerson, App, ProfilePage) => {
  const request = new Request(`${API_HOST}/api/users/${App.state.id}`, {
    method: "post",
    body: JSON.stringify(newPerson),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      ProfilePage.setState({ person: json });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const admin_send_user_info = (id, adminPage) => {
  const request = new Request(`${API_HOST}/api/users/${id}`, {
    method: "post",
    body: JSON.stringify(adminPage.state.user),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
//get all lib of a user id
export const get_user_fav_lib = (app, ProfilePage) => {
  const url = `${API_HOST}/api/users/libs/${app.state.id}`;
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      app.setState({ fav_posts: json });
    })
    .catch((error) => {
      console.log(error);
    });
};
//get a lib of a user id
export const delete_user_fav_lib = (app, delete_lib) => {
  const request = new Request(
    `${API_HOST}/api/users/libs/${app.state.id}/${delete_lib._id}`,
    {
      method: "delete",
    }
  );
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get_user_info = (app, ProfilePage) => {
  const request = new Request(`${API_HOST}/api/users/${app.state.id}`, {
    method: "get",
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      const new_person = {
        name: json.name,
        email: json.email,
        phone: json.phone,
        gender: json.gender,
        birthday: json.birthday,
        job: json.job,
        skills: json.skills,
        more: json.more,
      };
      ProfilePage.setState({ person: new_person });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const admin_get_user_info = (id, adminPage) => {
  const request = new Request(`${API_HOST}/api/users/${id}`, {
    method: "get",
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      const userObj = {
        name: json.name,
        email: json.email,
        phone: json.phone,
        gender: json.gender,
        birthday: json.birthday,
        job: json.job,
        skills: json.skills,
        more: json.more,
      };
      adminPage.setState({
        user: userObj,
      });
      adminPage.setTrue2();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get_profile_info = (StaticProfilePage) => {
  const request = new Request(
    `${API_HOST}/api/users/${StaticProfilePage.state.id}`,
    {
      method: "get",
    }
  );
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      const new_person = {
        name: json.name,
        email: json.email,
        phone: json.phone,
        gender: json.gender,
        birthday: json.birthday,
        job: json.job,
        skills: json.skills,
        more: json.more,
      };
      StaticProfilePage.setState({ person: new_person });
      StaticProfilePage.setState({ username: json.username });
    })
    .catch((error) => {
      StaticProfilePage.setState({ page_valid: false });
    });
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
  const value = field.value;
  const name = field.name;

  loginComp.setState({
    [name]: value,
  });
};

export const logout = (app) => {
  const url = `${API_HOST}/users/logout`;
  fetch(url)
    .then((res) => {
      app.setState({ currentUser: null, id: null, is_regUser: null });
    })
    .catch((error) => console.log(error));
};
//a function to update user profile info
//export const updateProfile = (ProfileComp, field) => {};
