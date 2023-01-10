import navBarPaths from "utils/constants/navBarPaths";

export const withoutAuthRoutes: Array<string> = [
    '/',
    navBarPaths.login,
    navBarPaths.signUp,
    navBarPaths.recoverPassword,
    navBarPaths.newPassword,
];
