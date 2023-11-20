import Cookies from 'js-cookie';

export const getAuthTokenFromCookies = (): string | null => {
    return Cookies.get('authToken') || null;
};

export const setAuthTokenInCookies = (authToken: string): void => {
    Cookies.set('authToken', authToken, { expires: 7 });
};

export const removeAuthTokenFromCookies = (): void => {
    Cookies.remove('authToken');
};