import { api } from "./api";

const roleLabels = {
  admin: "Админ",
  teacher: "Багш",
  student: "Сурагч",
};

export const authService = {
  async login({ email, password, roleKey }) {
    const users = await api.get(
      `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
        password
      )}&roleKey=${encodeURIComponent(roleKey)}`
    );

    if (!users.length) {
      throw new Error("Имэйл, нууц үг эсвэл эрх буруу байна.");
    }

    return users[0];
  },

  async register({ fullName, email, password, roleKey }) {
    const existingUsers = await api.get(
      `/users?email=${encodeURIComponent(email)}`
    );

    if (existingUsers.length) {
      throw new Error("Энэ имэйлээр бүртгэл аль хэдийн үүссэн байна.");
    }

    return api.post("/users", {
      name: fullName,
      email,
      password,
      roleKey,
      role: roleLabels[roleKey] ?? "Сурагч",
      status: "Идэвхтэй",
    });
  },
};
