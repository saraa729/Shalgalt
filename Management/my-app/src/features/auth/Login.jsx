import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import useAuth from "../../hooks/useAuth";
import { cn } from "../../lib/cn";

const roles = [
  { id: "admin", icon: "⚙️", label: "Админ" },
  { id: "teacher", icon: "🧑‍🏫", label: "Багш" },
  { id: "student", icon: "🎓", label: "Сурагч" },
];

function RoleCard({ role, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[16px] border px-3 py-4 text-center transition-all duration-200",
        "bg-[#232234] border-[#343454] hover:border-[#7C69F5] hover:-translate-y-0.5",
        active && "border-[#8B7CFF] bg-[#2A2840] shadow-[0_0_0_1px_rgba(139,124,255,0.2)]"
      )}
    >
      <div className="mb-2 text-[28px]">{role.icon}</div>
      <div className="text-[15px] text-[#9A97B8]">{role.label}</div>
    </button>
  );
}

export default function Login() {
  const { selectedRole, setSelectedRole, setMode, login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#11111B] px-3 py-4 text-white sm:px-5 sm:py-5">
      <div className="mx-auto w-full max-w-[620px] rounded-[26px] border border-[#2E2D45] bg-[#181824] px-4 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:px-7 sm:py-7">
        <div className="mx-auto flex max-w-[500px] flex-col">
          <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-gradient-to-b from-[#8C79FF] to-[#6F5DE7] text-[38px] font-semibold text-white shadow-[0_18px_40px_rgba(117,99,255,0.32)]">
            M
          </div>

          <h1 className="text-center text-[30px] leading-none tracking-[-0.02em] text-[#ECEAF6] sm:text-[34px]">
            МонСургууль
          </h1>
          <p className="mt-3 text-center text-[15px] text-[#8D8AAF] sm:text-[17px]">
            Сургуулийн удирдлагын систем
          </p>

          <div className="mt-9 text-center text-[16px] uppercase tracking-[0.08em] text-[#8F8CB2]">
            Хурдан нэвтрэх
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                active={selectedRole === role.id}
                onClick={() => setSelectedRole(role.id)}
              />
            ))}
          </div>

          <div className="my-7 flex items-center gap-3 text-[14px] text-[#8D8AAF]">
            <div className="h-px flex-1 bg-[#33334A]" />
            <span>эсвэл гараар оруул</span>
            <div className="h-px flex-1 bg-[#33334A]" />
          </div>

          <form
            className="space-y-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              setLoading(true);

              try {
                await login({
                  email: form.email.trim(),
                  password: form.password,
                  roleKey: selectedRole,
                });
              } catch (loginError) {
                setError(
                  loginError instanceof Error
                    ? loginError.message
                    : "Нэвтрэх үед алдаа гарлаа."
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            {error ? (
              <div className="rounded-[14px] border border-[#5B2B3A] bg-[#2A1A22] px-4 py-3 text-sm text-[#F2B7C6]">
                {error}
              </div>
            ) : null}
            <Input
              label="ИМЭЙЛ"
              type="email"
              placeholder="name@school.mn"
              error={error && !form.email ? "Имэйл оруулна уу." : ""}
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              className="h-[58px] rounded-[14px] border border-[#343454] bg-[#232234] px-4 text-[18px] text-[#ECEAF6] placeholder:text-[#A6A5BA] focus:ring-[#7C69F5]"
            />

            <Input
              label="НУУЦ ҮГ"
              type="password"
              placeholder="••••••••"
              error={error && !form.password ? "Нууц үг оруулна уу." : ""}
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              className="h-[58px] rounded-[14px] border border-[#343454] bg-[#232234] px-4 text-[18px] text-[#ECEAF6] placeholder:text-[#A6A5BA] focus:ring-[#7C69F5]"
            />

            <Button
              type="submit"
              disabled={loading}
              className="mt-1 h-[52px] w-full rounded-[14px] bg-gradient-to-r from-[#7A68EE] to-[#836FF7] text-[18px] font-medium text-white shadow-[0_20px_48px_rgba(122,104,238,0.28)] hover:opacity-100 hover:brightness-105"
            >
              {loading ? "Нэвтэрч байна..." : "Нэвтрэх →"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode("register")}
            className="mt-5 text-center text-[15px] text-[#9A97B8] transition hover:text-white"
          >
            Бүртгэл үүсгэх
          </button>
        </div>
      </div>
    </div>
  );
}
