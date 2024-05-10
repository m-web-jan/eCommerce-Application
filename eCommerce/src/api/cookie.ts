export function setCookie(name: string, value: string, seconds: number): void {
  const date = new Date();
  date.setTime(date.getTime() + (seconds * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name: string): string | null {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name + "=") === 0) {
          return cookie.substring(name.length + 1, cookie.length);
      }
  }
  return null;
}
