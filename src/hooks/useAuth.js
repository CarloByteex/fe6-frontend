import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reset, setAuth } from "../store/slices/Auth";
import { resetToken, setToken } from "../store/slices/AuthToken";

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.persists.token.token);
  const auth = useSelector(state => state.reducers.auth.auth);
  const BASE_URL = process.env.REACT_APP_SERVER_URI;

  const isAdmin = () => {
    let url = BASE_URL + "admin/authenticate";
    return new Promise((resolve) => {
      axios.get(url, {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.name) {
          dispatch(setAuth({data: res.data, isAdmin: true, status: ""}));
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(err => {
        resolve(false)
      })
    })
  };

  const isClient = () => {
    let url = BASE_URL + "client/authenticate";
    return new Promise((resolve) => {
      axios.get(url, {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        }
      }).then(res => {
        if (res.data) {
          dispatch(setAuth({data: res.data, isAdmin: false, status: res.data.status}));
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(err => {
        console.log(err);
      })
    })
  };

  const clientLogin = (email, password) => {
    let url = BASE_URL + "client/login";
    return new Promise((resolve)=>{
      axios.post(url, { email, password }).then(res => {
        console.log(res)
        dispatch(setAuth({data: res.data.client, isAdmin: false, status: res.data.client.status}));
        dispatch(setToken(res.data.token));
        resolve(true);
      }).catch(err => {
        resolve(false);
        console.log(err);
      })
    })
  };

  const clientRegister = (data) => {
    let url = BASE_URL + "client/register";
    return new Promise((resolve) => {
      axios.post(url, data).then(res => {
        resolve(true);
      }).catch(err => {
        console.log(err);
        resolve(false);
      })
    })
  };

  const adminLogin = (name, password) => {
    let url = BASE_URL + "admin/login";
    return new Promise((resolve)=>{
      axios.post(url, { name, password }).then(res => {
        dispatch(setAuth({data: res.data.adminUser, isAdmin: true, status: ""}));
        dispatch(setToken(res.data.token));
        resolve(true);
      }).catch(err => {
        console.log(err);
        resolve(false);
      })
    })
  };

  const logout = () => {
    dispatch(resetToken());
    dispatch(reset());
  }

  return {
    clientLogin,
    clientRegister,
    adminLogin,
    logout,
    isAdmin,
    isClient,
    token,
    auth
    // isAuth,
    // message
  }
}

export default useAuth;