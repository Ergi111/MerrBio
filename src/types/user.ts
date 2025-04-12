export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  role: UserRoleEnum;
  fullName: string;
}

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
  FARMER = "FARMER",
}
