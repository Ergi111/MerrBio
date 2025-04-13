import { useEffect } from "react";
import { Navbar } from "../../components/NavBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/useAuth";
import { getRoleFlags } from "../../utils/getRoleFlags";
import { routerPaths } from "../../constants/routerPaths";
import { useNavigate } from "react-router";
import { useGetUsers } from "../../services/useGetUsers";

export const AdminLayout = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isAdmin } = getRoleFlags(currentUser?.role);
  useEffect(() => {
    if (!isAdmin) {
      navigate(routerPaths.default);
    }
  }, [currentUser, isAdmin, navigate]);
  const { users } = useGetUsers(currentUser?.id);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50 p-10">
        <Table className="border rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>{t("Name")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("role")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div>
                    <span>{user.fullName}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
