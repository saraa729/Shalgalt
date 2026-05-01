import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function CourseDetail({ course, onBack }) {
  if (!course) {
    return (
      <Card
        hover={false}
        className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-6"
      >
        <div className="text-[#ECEAF6]">Хичээлийн мэдээлэл олдсонгүй.</div>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-[#ECEAF6]">
            {course.title}
          </h2>
          <p className="mt-2 text-[#8D8AAF]">{course.description}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="rounded-[14px] border border-[#343454] px-4 py-3 text-white hover:bg-white/5"
        >
          Буцах
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Багш", value: course.teacher },
          { label: "Сурагч", value: String(course.students) },
          { label: "Даалгавар", value: String(course.assignments) },
          { label: "Явц", value: `${course.progress}%` },
        ].map((item) => (
          <Card
            key={item.label}
            hover={false}
            className="rounded-[22px] border border-[#2E2D45] bg-[#181824] p-5"
          >
            <div className="text-sm text-[#8D8AAF]">{item.label}</div>
            <div className="mt-3 text-xl font-semibold text-[#ECEAF6]">
              {item.value}
            </div>
          </Card>
        ))}
      </div>

      <Card
        hover={false}
        className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-6"
      >
        <h3 className="text-lg font-semibold text-[#ECEAF6]">
          Хичээлийн дэлгэрэнгүй
        </h3>
        <div className="mt-4 grid gap-3 text-[#A7A4C2] md:grid-cols-2">
          <div>Хуваарь: {course.schedule}</div>
          <div>Танхим: {course.room}</div>
          <div>Багш: {course.teacher}</div>
          <div>Явц: {course.progress}%</div>
        </div>
      </Card>
    </div>
  );
}
