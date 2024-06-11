export type UserData = {
  name: string;
  _id: string;
  lastName: string;
  email: string;
  userType: "free" | "standard" | "business";
  requestCount: number;
  lastRequest: Date;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  userData: UserData | null;
  logout: () => void;
  getUserData: () => Promise<void>;
  updateUser: (userData: UserData) => Promise<void>;
  deleteUser: () => Promise<void>;
  formToken: string | null;
  setFormToken: React.Dispatch<React.SetStateAction<string | null>>;
  getFormToken: () => Promise<void>;
  generateFormToken: (email: string) => Promise<void>;
  deleteFormToken: () => Promise<void>;
};
