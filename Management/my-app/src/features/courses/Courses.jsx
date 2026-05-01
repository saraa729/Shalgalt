import { useCallback } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { courses } from "../../data/mockData";
import useCourses from "../../hooks/useCourses";

export default function Courses({ onOpenCourse }) {
  const {
    query,
    selectedTeacher,
    teachers,
    filteredCourses,
    setQuery,
    setTeacher,
    resetFilters,
  } = useCourses(courses);

  const handleOpenCourse = useCallback(
    (courseId) => {
      onOpenCourse?.(courseId);
    },
    [onOpenCourse]
  );

  return (
    <div className="space-y-4">
      <Card
        hover={false}
        className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
      >
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.9fr_auto]">
          <label className="flex flex-col gap-1 text-sm text-gray-400">
            Хайх
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Хичээлийн нэрээр хайх"
              className="h-[50px] rounded-[14px] border border-[#343454] bg-[#232234] px-4 text-[15px] text-[#ECEAF6] outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-400">
            Багш
            <select
              value={selectedTeacher}
              onChange={(event) => setTeacher(event.target.value)}
              className="h-[50px] rounded-[14px] border border-[#343454] bg-[#232234] px-4 text-[15px] text-[#ECEAF6] outline-none"
            >
              {teachers.map((teacher) => (
                <option key={teacher} value={teacher}>
                  {teacher === "all" ? "Бүх багш" : teacher}
                </option>
              ))}
            </select>
          </label>

          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            className="mt-[22px] h-[50px] rounded-[14px] border-[#343454] px-4 text-[15px]"
          >
            Цэвэрлэх
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
        <Card
          key={course.id}
          hover={false}
          className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[#ECEAF6]">
                {course.title}
              </h2>
              <p className="mt-2 text-sm text-[#8D8AAF]">{course.description}</p>
            </div>
            <span className="rounded-full bg-[#2A2840] px-3 py-1 text-xs text-[#C6C1F1]">
              {course.progress}%
            </span>
          </div>

          <div className="mt-5 space-y-2 text-sm text-[#A7A4C2]">
            <div>Багш: {course.teacher}</div>
            <div>Хуваарь: {course.schedule}</div>
            <div>Танхим: {course.room}</div>
            <div>Сурагч: {course.students}</div>
          </div>

          <Button
            type="button"
            onClick={() => handleOpenCourse(course.id)}
            className="mt-5 h-[46px] w-full rounded-[14px] bg-gradient-to-r from-[#7A68EE] to-[#836FF7] text-[16px] text-white hover:opacity-100 hover:brightness-105"
          >
            Дэлгэрэнгүй
          </Button>
        </Card>
      ))}
      </div>
    </div>
  );
}
