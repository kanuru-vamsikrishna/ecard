import axios from "../config/axios";
import Swal from "sweetalert2";

export const startRegister = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/user/register", formData)
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          redirect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const startSetUser = () => {
  return (dispatch) => {
    axios
      .get("/user/account", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const user = response.data;
        if (response.data.status === 200) {
          console.log(response.data, "account");
          dispatch(setUser(user.response));
        }
      })
      .catch((err) => {
        console.log(err, "user error");
      });
  };
};

export const startLogin = (formData, redirect) => {
  console.log("hello");
  return (dispatch) => {
    axios
      .post("/user/login", formData)
      .then((response) => {
        console.log(response.data, "res");
        if (response.data.hasOwnProperty("error")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went Wrong",
          });
        } else {
          localStorage.setItem("authToken", response.data.token);
          console.log("else");
          axios
            .get("/user/account", {
              headers: {
                "x-auth": localStorage.getItem("authToken"),
                // isLoading: false,
              },
            })
            .then((response) => {
              const user = response.data.response;
              if (response.data.status === 200) {
                console.log(response.data, "account");
                dispatch(setUser(user));
                Swal.fire({
                  icon: "success",
                  title: "Login",
                  text: "Logged in Successfully",
                });
                redirect();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};

export const startLogOut = () => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      // console.log(result.isConfirmed);
      if (result.isConfirmed) {
        axios
          .delete("/user/logout", {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            // console.log(response)
            if (response.data.notice) {
              localStorage.removeItem("authToken");
              dispatch(removeUser());
              // redirect();
              window.location.href = "/user/login";
              Swal.fire({
                icon: "success",
                title: "Logout",
                text: response.data.notice,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};
