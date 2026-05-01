import Card from "../../components/ui/Card";
import useAuth from "../../hooks/useAuth";
import { courses } from "../../data/mockData";

const enrolledCourses = courses.slice(0, 3);

export default function StudentDashboard() {
  const { grades } = useAuth();
  const studentGrades = grades.filter((grade) => grade.studentId === "user-3");
  const averageGrade = studentGrades.length
    ? Math.round(
        studentGrades.reduce((sum, grade) => sum + grade.score, 0) /
          studentGrades.length
      )
    : 0;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Миний хичээл", value: String(enrolledCourses.length) },
          { label: "Дундаж дүн", value: `${averageGrade}%` },
          { label: "Авсан дүн", value: String(studentGrades.length) },
        ].map((item) => (
          <Card
            key={item.label}
            hover={false}
            className="rounded-[22px] border border-[#2E2D45] bg-[#181824] p-5"
          >
            <div className="text-sm text-[#8D8AAF]">{item.label}</div>
            <div className="mt-3 text-3xl font-semibold text-[#ECEAF6]">
              {item.value}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card
          hover={false}
          className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
        >
          <h2 className="text-lg font-semibold text-[#ECEAF6]">
            Миний хичээлүүд
          </h2>
          <div className="mt-4 space-y-3">
            {enrolledCourses.map((course) => (
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
                      {course.teacher}
                    </div>
                  </div>
                  <span className="rounded-full bg-[#2A2840] px-3 py-1 text-xs text-[#C6C1F1]">
                    {course.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          hover={false}
          className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
        >
          <h2 className="text-lg font-semibold text-[#ECEAF6]">Миний дүн</h2>
          <div className="mt-4 space-y-3 text-sm text-[#A7A4C2]">
            {studentGrades.map((grade) => (
              <div
                key={grade.id}
                className="flex items-center justify-between rounded-[18px] border border-[#2E2D45] bg-[#202031] px-4 py-4"
              >
                <div>
                  <div className="font-medium text-[#ECEAF6]">
                    {grade.courseTitle}
                  </div>
                  <div className="mt-1 text-xs text-[#8D8AAF]">
                    {grade.teacher}
                  </div>
                </div>
                <span className="rounded-full bg-[#2A2840] px-3 py-1 text-xs text-[#C6C1F1]">
                  {grade.score}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
