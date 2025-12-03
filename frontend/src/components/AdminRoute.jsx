import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }) {
  const { user } = useUser();

  // لو ما حملنا المستخدم لسه (يكون null عند بداية التحميل)
  if (user === null) {
    return null; // أو لودر لو تبغى
  }

  // لو المستخدم مو Admin → رجّعه للصفحة الرئيسية
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // لو المستخدم Admin → اعرض المحتوى
  return children;
}
