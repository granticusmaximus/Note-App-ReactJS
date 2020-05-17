// permission-based authorization
const condition = (authUser) => authUser.permissions.canEditAccount;

export default condition;

export const ADMIN = "ADMIN";

export const USER = "USER";
