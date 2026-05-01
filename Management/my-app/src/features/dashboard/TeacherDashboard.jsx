import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import useAuth from "../../hooks/useAuth";
import { courses, users } from "../../data/mockData";

const teacherCourses = courses.slice(0, 2);
const students = users.filter((user) => user.role === "Сурагч");

export default function TeacherDashboard() {
  const { addGrade, grades } = useAuth();
  const [form, setForm] = useState({
    courseId: teacherCourses[0]?.id ?? "",
    studentId: students[0]?.id ?? "",
    score: "",
  });
  const [feedback, setFeedback] = useState("");
  const scoreInputRef = useRef(null);

  const teacherGradeCount = useMemo(
    () =>
      grades.filter((grade) =>
        teacherCourses.some((course) => course.id === grade.courseId)
      ).length,
    [grades]
  );

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setFeedback("");
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [feedback]);

  const updateFormField = useCallback((field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const course = courses.find((item) => item.id === form.courseId);
      const student = students.find((item) => item.id === form.studentId);

      if (!course || !student || !form.score) {
        scoreInputRef.current?.focus();
        return;
      }

      addGrade({
        studentId: student.id,
        studentName: student.name,
        courseId: course.id,
        courseTitle: course.title,
        score: Number(form.score),
        teacher: course.teacher,
      });

      setForm((current) => ({
        ...current,
        score: "",
      }));
      setFeedback("Дүн амжилттай хадгалагдлаа");
      scoreInputRef.current?.focus();
    },
    [addGrade, form]
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Зааж буй хичээл", value: String(teacherCourses.length) },
          { label: "Нийт сурагч", value: "59" },
          { label: "Оруулсан дүн", value: String(teacherGradeCount) },
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

      <Card
        hover={false}
        className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#ECEAF6]">
            Миний хичээлүүд
          </h2>
          <span className="text-sm text-[#8D8AAF]">Багшийн самбар</span>
        </div>

        <div className="space-y-3">
          {teacherCourses.map((course) => (
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
                    {course.schedule} • {course.room}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#8D8AAF]">Сурагч</div>
                  <div className="font-medium text-white">
                    {course.students}
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
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#ECEAF6]">Дүн нэмэх</h2>
          <span className="text-sm text-[#8D8AAF]">
            Оруулсан дүн шууд админ, сурагч дээр харагдана
          </span>
        </div>
        {feedback ? (
          <div className="mb-4 rounded-[14px] border border-[#3D365F] bg-[#222034] px-4 py-3 text-sm text-[#C6C1F1]">
            {feedback}
          </div>
        ) : null}

        <form className="grid gap-4 lg:grid-cols-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1 text-sm text-gray-400">
            Хичээл
            <select
              value={form.courseId}
              onChange={(event) => updateFormField("courseId", event.target.value)}
              className="h-[58px] rounded-[14px] border border-[#343454] bg-[#232234] px-4 text-[16px] text-[#ECEAF6] outline-none"
            >
              {teacherCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-400">
            Сурагч
            <select
              value={form.studentId}
              onChange={(event) => updateFormField("studentId", event.target.value)}
              className="h-[58px] rounded-[14px] border border-[#343454] bg-[#232234] px-4 text-[16px] text-[#ECEAF6] outline-none"
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>

          <Input
            label="ДҮН"
            type="number"
            min="0"
            max="100"
            ref={scoreInputRef}
            value={form.score}
            onChange={(event) => updateFormField("score", event.target.value)}
            className="h-[58px] rounded-[14px] border border-[#343454] bg-[#232234] px-4 text-[16px] text-[#ECEAF6]"
          />

          <Button
            type="submit"
            className="mt-[22px] h-[58px] rounded-[14px] bg-gradient-to-r from-[#7A68EE] to-[#836FF7] text-[16px] text-white hover:opacity-100 hover:brightness-105"
          >
            Дүн хадгалах
          </Button>
        </form>
      </Card>
    </div>
  );
}
