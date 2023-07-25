import { useEffect } from "react";
import SaleTable from "./SaleTable";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function Client() {
  const { token, isClient, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isClient();
  }, [])

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (auth.status !== "Accepted") {
      navigate("/");
    }
  }, [auth])

  return (
    <>
      <SaleTable />
    </>
  );
}
