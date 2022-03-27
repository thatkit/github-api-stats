export const getCookie = key => {
    if (!Boolean(document.cookie)) return null;

    return document
        .cookie
        .split('; ')
        .find(row => row.startsWith(`${key}=`))
        .split('=')[1];
}

export const setCookie = (key, value) => {
    document.cookie = `${key}=${value}`;
    return null;
}