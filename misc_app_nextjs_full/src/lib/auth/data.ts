export interface LoginPayload {
    email: string;
    pswd: string;
    remeberMe?: boolean;
}

export interface User {
    expiresIn: string;
    [key: string]: string | number | boolean | null | undefined;
}

export interface ErrorResponse {
error: {
    code: number;
    message: string;
    errors: Array<{
        message: string;
        domain: string;
        reason: string;
    }>;
}
}

export interface AuthState {
    loading: boolean;
    loggedInUserDetails: any;
    rememberMe: boolean;
    rememberEmail: string | null;
    error: string | null;
}