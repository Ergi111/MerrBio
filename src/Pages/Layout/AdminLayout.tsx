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
import { useGetUsers } from "../../services/useGetUsers";

export const AdminLayout = () => {
  const { t } = useLanguage();
  const currentUserId = "someUserId";
  const { users } = useGetUsers(currentUserId);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50 p-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
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
