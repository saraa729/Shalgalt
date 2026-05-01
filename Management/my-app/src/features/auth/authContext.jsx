import { createContext, useMemo, useState } from "react";
import { initialGrades } from "../../data/mockData";
import { authService } from "../../services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [mode, setMode] = useState("login");
  const [selectedRole, setSelectedRole] = useState("teacher");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [grades, setGrades] = useState(initialGrades);

  const login = async ({ email, password, roleKey }) => {
    const user = await authService.login({ email, password, roleKey });
    setCurrentUser(user);
    setSelectedRole(user.roleKey);
    setIsAuthenticated(true);
    setCurrentView("dashboard");
    return user;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setMode("login");
    setCurrentView("dashboard");
    setSelectedCourseId(null);
  };

  const register = async ({ fullName, email, password, roleKey }) => {
    const user = await authService.register({
      fullName,
      email,
      password,
      roleKey,
    });

    setCurrentUser(user);
    setSelectedRole(user.roleKey);
    setIsAuthenticated(true);
    setCurrentView("dashboard");
    return user;
  };

  const openView = (view) => {
    setCurrentView(view);
  };

  const openCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentView("courseDetail");
  };

  const addGrade = (grade) => {
    setGrades((current) => [
      {
        id: `grade-${current.length + 1}`,
        ...grade,
      },
      ...current,
    ]);
  };

  const value = useMemo(
    () => ({
      mode,
      setMode,
      selectedRole,
      setSelectedRole,
      isAuthenticated,
      currentUser,
      currentView,
      selectedCourseId,
      login,
      register,
      logout,
      openView,
      openCourse,
      grades,
      addGrade,
    }),
    [
      mode,
      selectedRole,
      isAuthenticated,
      currentUser,
      currentView,
      selectedCourseId,
      grades,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
