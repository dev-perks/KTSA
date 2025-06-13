export const refreshAccessToken = async () => {
  try {
    const response = await fetch("/api/auth/refresh-token", {
      method: "POST",
      credentials: "include", // ensures cookies (refresh token) are sent
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();

    if (data?.accessToken) {
      // Save to localStorage or in-memory state (based on your app)
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    }

    throw new Error("No access token returned");
  } catch (err) {
    console.error("Refresh token failed:", err);
    throw err;
  }
};
