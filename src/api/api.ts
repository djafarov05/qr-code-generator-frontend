const API_BASE_URL = "http://localhost:5000";

export interface UserProfile {
  id: number;
  userName: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
}

export const deleteAccount = () =>
  fetch(`${API_BASE_URL}/api/users/delete`, {
    method: "DELETE",
    credentials: "include",
  }).then((r) => {
    if (!r.ok) throw new Error("Failed to delete account");
  });


export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }

    const data: UserProfile = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
};

export const loginUser = async (
  loginData: LoginData
): Promise<UserProfile> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.msg || "Login failed");
    }

    const data = await response.json();
    return data.user;
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const registerUser = async (
  regData: RegisterData
): Promise<UserProfile> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.msg || "Registration failed");
    }

    const data = await response.json();
    return data.user;
  } catch (error: any) {
    console.error("Error registering:", error.message);
    throw error;
  }
};

export const updateProfile = async (userData: {
  userName: string;
  email: string;
}): Promise<UserProfile> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile");
    }

    const data: { user: UserProfile } = await response.json();
    return data.user;
  } catch (error: any) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }
  } catch (error: any) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

export const sendQRCodeToEmail = async (payload: {
  email: string;
  content: string;
  color: string;
  size: number;
}): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/email/send-qr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send QR code email");
    }
  } catch (error: any) {
    console.error("Error sending QR code to email:", error.message);
    throw error;
  }
};
