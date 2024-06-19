const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFormToken = async (JWT: string) => {
  try {
    const response = await fetch(`${API_URL}/token/getFormToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data.formToken;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("Error al traer el token");
  }
};

export const generateFormToken = async (JWT: string, email: string) => {
  try {
    const response = await fetch(`${API_URL}/token/generateToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.ok) {
      return data.formToken;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("Error al generar el token");
  }
};

export const deleteFormToken = async (JWT: string, email: string) => {
  try {
    const response = await fetch(`${API_URL}/token/deleteToken`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("Error al eliminar el token");
  }
};
