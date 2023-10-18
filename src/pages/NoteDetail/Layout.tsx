import {
  Navigate,
  Outlet,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { Note } from "../../type"

type LayoutProps = {
  notes: Note[];
};
const Layout = ({ notes }: LayoutProps) => {
  const { id } = useParams();
  const found = notes.find((n) => n.id == id);

  if (found) {
    return <Outlet context={found} />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export function useNote(){
    return useOutletContext<Note>();
}

export default Layout