export const getClientAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem("persist:root");
    if (!raw) return null;

    const root = JSON.parse(raw) as Record<string, unknown>;
    const authRaw = root.auth;
    if (typeof authRaw !== "string") return null;

    const auth = JSON.parse(authRaw) as { session?: { token?: string } | null };
    const token = auth.session?.token;

    return typeof token === "string" && token.length > 0 ? token : null;
  } catch {
    return null;
  }
};

export const getClientAuthHeaders = (): Record<string, string> => {
  const token = getClientAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
