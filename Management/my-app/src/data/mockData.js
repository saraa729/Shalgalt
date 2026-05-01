export const courses = [
  {
    id: "course-1",
    title: "Математик I",
    teacher: "Д. Болор",
    students: 32,
    progress: 78,
    schedule: "Даваа, Лхагва 09:00",
    room: "201 тоот",
    description: "Суурь алгебр, функц, график болон бодлогын дасгал.",
    assignments: 8,
  },
  {
    id: "course-2",
    title: "Физик",
    teacher: "Б. Энхтүвшин",
    students: 27,
    progress: 64,
    schedule: "Мягмар, Баасан 11:30",
    room: "305 тоот",
    description: "Хөдөлгөөн, хүч, энерги болон лабораторийн ажил.",
    assignments: 6,
  },
  {
    id: "course-3",
    title: "Англи хэл",
    teacher: "С. Марал",
    students: 41,
    progress: 85,
    schedule: "Пүрэв 14:00",
    room: "104 тоот",
    description: "Унших, бичих, ярих чадварыг ахиулах хөтөлбөр.",
    assignments: 10,
  },
];

export const users = [
  {
    id: "user-1",
    name: "Н. Төгөлдөр",
    role: "Админ",
    email: "admin@school.mn",
    status: "Идэвхтэй",
  },
  {
    id: "user-2",
    name: "С. Марал",
    role: "Багш",
    email: "maral@school.mn",
    status: "Идэвхтэй",
  },
  {
    id: "user-3",
    name: "Г. Тэмүүлэн",
    role: "Сурагч",
    email: "temuulen@school.mn",
    status: "Хүлээгдэж буй",
  },
  {
    id: "user-4",
    name: "А. Номин",
    role: "Сурагч",
    email: "nomin@school.mn",
    status: "Идэвхтэй",
  },
];

export const initialGrades = [
  {
    id: "grade-1",
    studentId: "user-3",
    studentName: "Г. Тэмүүлэн",
    courseId: "course-1",
    courseTitle: "Математик I",
    score: 88,
    teacher: "Д. Болор",
  },
  {
    id: "grade-2",
    studentId: "user-4",
    studentName: "А. Номин",
    courseId: "course-3",
    courseTitle: "Англи хэл",
    score: 93,
    teacher: "С. Марал",
  },
];
