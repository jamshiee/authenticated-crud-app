import { Navigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function PrivateRoute({ children }) {
const {token} = useStore((state)=>state)
  return token ? (children) : (<Navigate to="/signin" replace={true} />);
}
