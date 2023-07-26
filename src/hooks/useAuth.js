import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reset, setAuth } from "../store/slices/Auth";
import { resetToken, setToken } from "../store/slices/AuthToken";

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.persists.token.token);
  const auth = useSelector(state => state.reducers.auth.auth);
  const BASE_URL = process.env.REACT_APP_SERVER_URI;

  const isClient = () => {
    let url = BASE_URL + "client/authenticate";
    return new Promise((resolve) => {
      axios.get(url, {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        }
      }).then(res => {
        if (res.data) {
          dispatch(setAuth(res.data));
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(err => {
        console.log(err);
      })
    })
  };

  const login = (email, password) => {
    let url = BASE_URL + "client/login";
    return new Promise((resolve)=>{
      axios.post(url, { email, password }).then(res => {
        console.log(res)
        dispatch(setAuth(res.data.client));
        dispatch(setToken(res.data.token));
        resolve("Action Success!");
      }).catch(err => {
        resolve(err.response.data.response);
      })
    })
  };

  const register = (data) => {
    let url = BASE_URL + "client/register";
    return new Promise((resolve) => {
      axios.post(url, data).then(res => {
        dispatch(setAuth(res.data.newClient));
        dispatch(setToken(res.data.token));
        resolve("Action Success!");
      }).catch(err => {
        resolve(err.response.data);
      })
    })
  };

  const logout = () => {
    dispatch(resetToken());
    dispatch(reset());
  }

  return {
    login,
    register,
    logout,
    isClient,
    token,
    auth
    // isAuth,
    // message
  }
}

export default useAuth;