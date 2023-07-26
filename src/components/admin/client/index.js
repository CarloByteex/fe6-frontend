import { useEffect } from "react";
import ClientTable from "./ClientTable";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function ClientReport() {
  const {token} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/');
    }
  },[token]);

  return (
    <>
      <ClientTable />
    </>
  );
}
