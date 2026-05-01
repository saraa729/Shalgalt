import Card from "../../components/ui/Card";
import { users } from "../../data/mockData";
import { formatCount, getInitials, getStatusClassName } from "../../utils/helpers";

export default function Users() {
  return (
    <Card
      hover={false}
      className="rounded-[24px] border border-[#2E2D45] bg-[#181824] p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#ECEAF6]">Хэрэглэгчид</h2>
        <span className="text-sm text-[#8D8AAF]">
          {formatCount(users.length)} бүртгэл
        </span>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-[#2E2D45]">
        <div className="grid grid-cols-[1.4fr_0.9fr_1.3fr_0.8fr] gap-3 bg-[#202031] px-4 py-3 text-sm text-[#8D8AAF]">
          <div>Нэр</div>
          <div>Төрөл</div>
          <div>Имэйл</div>
          <div>Төлөв</div>
        </div>

        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[1.4fr_0.9fr_1.3fr_0.8fr] gap-3 border-t border-[#2E2D45] bg-[#181824] px-4 py-4 text-sm text-[#ECEAF6]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2A2840] text-xs font-semibold text-[#C6C1F1]">
                {getInitials(user.name)}
              </div>
              <span>{user.name}</span>
            </div>
            <div className="text-[#A7A4C2]">{user.role}</div>
            <div className="text-[#A7A4C2]">{user.email}</div>
            <div>
              <span
                className={`rounded-full px-3 py-1 text-xs ${getStatusClassName(
                  user.status
                )}`}
              >
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
