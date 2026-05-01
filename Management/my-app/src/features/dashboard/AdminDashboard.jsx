import Card from "../../components/ui/Card";
import useAuth from "../../hooks/useAuth";
import { courses, users } from "../../data/mockData";

const stats = [
  { id: "students", label: "Нийт сурагч", value: "1,280" },
  { id: "teachers", label: "Багш", value: "86" },
  { id: "courses", label: "Хичээл", value: String(courses.length) },
  { id: "attendance", label: "Дундаж ирц", value: "94%" },
];

export default function AdminDashboard() {
  const { grades } = useAuth();

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.id}
            hover={false}
            className="rounded-[22px] border border-[#2E2D45] bg-[#181824] p-5"
          >
            <div className="text-sm text-[#8D8AAF]">{stat.label}</div>
            <div className="mt-3 text-3xl font-semibold text-[#ECEAF6]">
              {stat.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <Card
          hover={false}
          className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#ECEAF6]">
              Идэвхтэй хичээлүүд
            </h2>
            <span className="text-sm text-[#8D8AAF]">Энэ 7 хоног</span>
          </div>

          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-[18px] border border-[#2E2D45] bg-[#202031] px-4 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-[#ECEAF6]">
                      {course.title}
                    </div>
                    <div className="mt-1 text-sm text-[#8D8AAF]">
                      {course.teacher} • {course.schedule}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#8D8AAF]">Явц</div>
                    <div className="font-medium text-white">
                      {course.progress}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          hover={false}
          className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
        >
          <h2 className="text-lg font-semibold text-[#ECEAF6]">
            Сүүлийн хэрэглэгчид
          </h2>
          <div className="mt-4 space-y-3">
            {users.slice(0, 4).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-[18px] border border-[#2E2D45] bg-[#202031] px-4 py-3"
              >
                <div>
                  <div className="font-medium text-[#ECEAF6]">{user.name}</div>
                  <div className="text-sm text-[#8D8AAF]">{user.role}</div>
                </div>
                <span className="rounded-full bg-[#2E2B46] px-3 py-1 text-xs text-[#B6B2D8]">
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          hover={false}
          className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
        >
          <h2 className="text-lg font-semibold text-[#ECEAF6]">
            Сүүлийн дүнгүүд
          </h2>
          <div className="mt-4 space-y-3">
            {grades.slice(0, 5).map((grade) => (
              <div
                key={grade.id}
                className="rounded-[18px] border border-[#2E2D45] bg-[#202031] px-4 py-3"
              >
                <div className="font-medium text-[#ECEAF6]">
                  {grade.studentName}
                </div>
                <div className="mt-1 text-sm text-[#8D8AAF]">
                  {grade.courseTitle}
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-[#8D8AAF]">{grade.teacher}</span>
                  <span className="rounded-full bg-[#2A2840] px-3 py-1 text-xs text-[#C6C1F1]">
                    {grade.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
