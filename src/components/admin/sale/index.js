import { useEffect } from "react";
import SaleTable from "./SaleTable";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function SaleReport() {
  const {token, isAdmin} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    isAdmin();
  },[])

  useEffect(()=>{
    if(!token){
      navigate('/');
    }
  },[token]);

  return (
    <>
      <SaleTable />
    </>
  );
}
