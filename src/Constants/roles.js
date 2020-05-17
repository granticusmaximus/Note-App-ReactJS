// permission-based authorization
const condition = (authUser) => authUser.permissions.canEditAccount;

export default condition;
