export function formatCount(value) {
  return new Intl.NumberFormat("mn-MN").format(value);
}

export function getStatusClassName(status) {
  const variants = {
    "Идэвхтэй": "bg-[#2A2840] text-[#C6C1F1]",
    "Хүлээгдэж буй": "bg-[#3A2D1F] text-[#F3C98B]",
    "Идэвхгүй": "bg-[#312535] text-[#D1A9D9]",
  };

  return variants[status] ?? "bg-[#2A2840] text-[#C6C1F1]";
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
