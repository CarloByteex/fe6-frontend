import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSaleList, editSale, createSale } from "../store/slices/Client";

const useClient = () => {
  const dispatch = useDispatch();
  const saleList = useSelector(state => state.reducers.client.saleList);
  const BASE_URL = process.env.REACT_APP_SERVER_URI;

  const getSaleList = (id) => {
    let url = BASE_URL + `client/${id}/sale/all`;
    axios.get(url).then(res => {
      console.log(res)
      dispatch(setSaleList(res.data));
    }).catch(err => {
      console.log(err);
    })
  };

  const updateSale = (data) => {
    let url = BASE_URL + "client/sale/edit";
    return new Promise((resolve)=>{
      axios.post(url, data).then(res => {
        dispatch(editSale(res.data));
        resolve(true);
      }).catch(err => {
        console.log(err);
        resolve(false)
      })
    })
  }

  const addSale = (data) => {
    let url = BASE_URL + "client/sale/create";
    return new Promise((resolve)=>{
      axios.post(url, data).then(res => {
        dispatch(createSale(res.data));
        resolve(true);
      }).catch(err => {
        resolve(false);
        console.log(err);
      })
    })
  }

  return {
    getSaleList,
    addSale,
    updateSale,
    saleList,
  }
}

export default useClient;