export interface IUser {
  id: string;
  email: string;
  role: UserRoleEnum;
}

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
  FARMER = "FARMER",
}
