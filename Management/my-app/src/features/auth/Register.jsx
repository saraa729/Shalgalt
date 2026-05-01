import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const { setMode, register, selectedRole } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
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
            Бүртгэл үүсгэх
          </h1>
          <p className="mt-3 text-center text-[15px] text-[#8D8AAF] sm:text-[17px]">
            Системд нэвтрэх эрхээ шинээр бүртгэнэ
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              setLoading(true);

              try {
                await register({
                  fullName: form.fullName.trim(),
                  email: form.email.trim(),
                  password: form.password,
                  roleKey: selectedRole,
                });
              } catch (registerError) {
                setError(
                  registerError instanceof Error
                    ? registerError.message
                    : "Бүртгэх үед алдаа гарлаа."
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
              label="НЭР"
              placeholder="Таны бүтэн нэр"
              error={error && !form.fullName ? "Нэр оруулна уу." : ""}
              value={form.fullName}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  fullName: event.target.value,
                }))
              }
              className="h-[58px] rounded-[14px] border border-[#343454] bg-[#232234] px-4 text-[18px] text-[#ECEAF6] placeholder:text-[#A6A5BA] focus:ring-[#7C69F5]"
            />

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
              placeholder="Шинэ нууц үг"
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
              className="h-[52px] w-full rounded-[14px] bg-gradient-to-r from-[#7A68EE] to-[#836FF7] text-[18px] font-medium text-white shadow-[0_20px_48px_rgba(122,104,238,0.28)] hover:opacity-100 hover:brightness-105"
            >
              {loading ? "Бүртгэж байна..." : "Бүртгүүлэх →"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode("login")}
            className="mt-5 text-center text-[15px] text-[#9A97B8] transition hover:text-white"
          >
            Нэвтрэх хуудас руу буцах
          </button>
        </div>
      </div>
    </div>
  );
}
