import { UserRoleEnum } from "../types/user";

export const getRoleFlags = (role?: UserRoleEnum | null) => {
  return {
    isAdmin: role === UserRoleEnum.ADMIN,
    isUser: role === UserRoleEnum.USER,
    isFarmer: role === UserRoleEnum.FARMER,
  };
};
