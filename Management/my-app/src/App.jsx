import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import useAuth from "./hooks/useAuth";
import AdminDashboard from "./features/dashboard/AdminDashboard";
import TeacherDashboard from "./features/dashboard/TeacherDashboard";
import StudentDashboard from "./features/dashboard/StudentDashboard";
import Courses from "./features/courses/Courses";
import CourseDetail from "./features/courses/CourseDetail";
import Users from "./features/admin/Users";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { AuthProvider } from "./features/auth/authContext";
import { courses } from "./data/mockData";

function AuthScreen() {
  const {
    mode,
    isAuthenticated,
    currentView,
    openView,
    openCourse,
    selectedCourseId,
    logout,
    selectedRole,
  } = useAuth();

  if (!isAuthenticated) {
    return mode === "register" ? <Register /> : <Login />;
  }

  const roleConfig = {
    admin: {
      roleLabel: "Админ",
      menuItems: [
        { id: "dashboard", icon: "📊", label: "Dashboard" },
        { id: "courses", icon: "📚", label: "Courses" },
        { id: "users", icon: "👥", label: "Users" },
      ],
      dashboard: <AdminDashboard />,
      subtitle: "Системийн ерөнхий удирдлага, хэрэглэгч ба хичээлийн хяналт",
    },
    teacher: {
      roleLabel: "Багш",
      menuItems: [
        { id: "dashboard", icon: "🧑‍🏫", label: "Teacher Dashboard" },
        { id: "courses", icon: "📚", label: "My Courses" },
      ],
      dashboard: <TeacherDashboard />,
      subtitle: "Өөрийн хичээл, сурагчид болон даалгаврын товч мэдээлэл",
    },
    student: {
      roleLabel: "Сурагч",
      menuItems: [
        { id: "dashboard", icon: "🎓", label: "Student Dashboard" },
        { id: "courses", icon: "📘", label: "My Subjects" },
      ],
      dashboard: <StudentDashboard />,
      subtitle: "Хувийн хичээл, явц ба өдөр тутмын хуваарь",
    },
  };

  const activeRoleConfig = roleConfig[selectedRole] ?? roleConfig.teacher;
  const menuItems = activeRoleConfig.menuItems;

  const selectedCourse = courses.find((course) => course.id === selectedCourseId);

  const contentByView = {
    dashboard: activeRoleConfig.dashboard,
    courses: <Courses onOpenCourse={openCourse} />,
    courseDetail: (
      <CourseDetail
        course={selectedCourse}
        onBack={() => openView("courses")}
      />
    ),
    users: selectedRole === "admin" ? <Users /> : activeRoleConfig.dashboard,
  };

  const titleByView = {
    dashboard: `${activeRoleConfig.roleLabel} Dashboard`,
    courses: "Courses",
    courseDetail: selectedCourse?.title ?? "Course Detail",
    users: "Users",
  };

  return (
    <div className="min-h-screen bg-[#11111B] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          title={`МонСургууль ${activeRoleConfig.roleLabel}`}
          items={menuItems}
          activeItem={currentView === "courseDetail" ? "courses" : currentView}
          onItemClick={(item) => openView(item.id)}
          footer={
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-2xl border border-[#343454] px-4 py-3 text-left text-sm text-[#A7A4C2] transition hover:bg-[#232234] hover:text-white"
            >
              Гарах
            </button>
          }
          className="min-h-auto max-w-full lg:min-h-screen lg:max-w-[280px]"
        />

        <main className="flex-1 p-4 sm:p-6">
          <Header
            title={titleByView[currentView]}
            subtitle={activeRoleConfig.subtitle}
          />
          <div className="mt-5">{contentByView[currentView]}</div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthScreen />
    </AuthProvider>
  );
}

export default App;
