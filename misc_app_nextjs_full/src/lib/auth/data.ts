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
    loggedInUserDetails: UserData;
    rememberMe: boolean;
    rememberEmail: string | null;
    error: string | null;
}

interface ProviderData {
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string | null;
    photoURL: string;
  }
  
  interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  }
  
  export interface UserData {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    isAnonymous: boolean;
    photoURL: string;
    providerData: ProviderData[];
    stsTokenManager: StsTokenManager;
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
  }
  