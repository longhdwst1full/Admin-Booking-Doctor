import env from "./env";


let TOKEN: any = '';
const TOKEN_KEY = env.tokenKey;
export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const setAuthData = (authData: any) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(authData || {}));
  TOKEN = authData.token;
};

export const getAuthLocalData = () => {
  if (typeof window !== 'undefined') {
    const authData = parseTokenString(
      localStorage.getItem(TOKEN_KEY) || '',
    ) as any;
    return authData;
  }
};

export const removeAuthLocalData = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = `${window.location.origin}/` as string;
};

export const getToken = () => {
  return TOKEN;
};

export const parseTokenString = (str: string) => {
  if (isJsonString(str)) {
    const authObject: any = JSON.parse(str);
    return authObject;
  }
  return null;
};

// export const tokenChecker = (authData: any | null) => {
//   if (!authData || !authData.token || authData.expiresAt < moment().unix())
//     return false;
//   return true;
// };
