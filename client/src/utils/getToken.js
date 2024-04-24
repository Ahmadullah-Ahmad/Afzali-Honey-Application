export function getToken(key) {
  const jwt = `Bearer ${localStorage.getItem(key)}`;
  return jwt;
}
