export const setCookie = (name: string, token: string, expiresIn: number) => {
  const deadTokenDate = new Date(Date.now() + expiresIn * 1000).toUTCString();
  document.cookie = `${name}=${token}; expires=${deadTokenDate}`;
};

export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function delCookie(name: string) {
  document.cookie = `${name}=; max-age=-1`;
}
