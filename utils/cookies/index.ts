import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const getAuthTokenFromCookies = (): string | null => {
    return getCookie('authToken') || null;
};

export const setAuthTokenInCookies = (authToken: string): void => {
    var currentDate = new Date();
    var sevenHoursLater = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);
    setCookie('authToken', authToken, {expires: sevenHoursLater});
};

export const removeAuthTokenFromCookies = (): void => {
    deleteCookie('authToken');
};