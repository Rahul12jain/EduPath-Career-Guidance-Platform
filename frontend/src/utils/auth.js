export function getTokenExpiration(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    return payload.exp * 1000;
  } catch {
    return 0;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
}
