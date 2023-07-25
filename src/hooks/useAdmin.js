import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSaleList, editClient, editSale, setClientList } from "../store/slices/Admin";

const useAdmin = () => {
  const dispatch = useDispatch();
  const saleList = useSelector(state => state.reducers.admin.saleList);
  const clientList = useSelector(state => state.reducers.admin.clientList);
  const BASE_URL = process.env.REACT_APP_SERVER_URI;

  const getSaleList = () => {
    let url = BASE_URL + "admin/sale/all";
    axios.get(url).then(res => {
      dispatch(setSaleList(res.data));
    }).catch(err => {
      console.log(err);
    })
  };

  const getSearch = (data) => {
    let url = BASE_URL + `admin/sale/search`;
    axios.post(url, data).then(res => {
      console.log(res.data);
      dispatch(setSaleList(res.data));
    }).catch(err => {
      console.log(err);
    })
  };

  const updateSale = (data) => {
    let url = BASE_URL + "admin/sale/edit";
    return new Promise((resolve)=>{
      axios.post(url, data).then(res => {
        dispatch(editSale(res.data));
        resolve(true);
      }).catch(err => {
        console.log(err);
        resolve(false);
      })      
    })
  }

  const getClientList = () => {
    let url = BASE_URL + "admin/client/all";
    axios.get(url).then(res => {
      dispatch(setClientList(res.data));
    }).catch(err => {
      console.log(err);
    })
  };

  const updateClient = (data) => {
    let url = BASE_URL + "admin/client/status";
    axios.post(url, data).then(res => {
      dispatch(editClient(res.data));
    }).catch(err => {
      console.log(err);
    })
  }

  return {
    getSaleList,
    updateClient,
    getSearch,
    updateSale,
    getClientList,
    saleList,
    clientList
  }
}

export default useAdmin;