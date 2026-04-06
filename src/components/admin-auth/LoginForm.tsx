"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAdminLogin } from "@/hooks/mutations/use-admin";

export default function LoginForm() {
  const router = useRouter();

  const { login, data, isPending, errorMessage, isLoginSuccess, reset } =
    useAdminLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isLoginSuccess) {
      router.push("/v1/admin");
      router.refresh();
    }
  }, [isLoginSuccess, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowError(false);

    login(
      { email, password },
      {
        onSuccess: (response) => {
          if (!response.success) {
            setShowError(true);
          }
        },
        onError: () => {
          setShowError(true);
        },
      }
    );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (showError) {
      setShowError(false);
    }

    if (data) {
      reset();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (showError) {
      setShowError(false);
    }

    if (data) {
      reset();
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      >
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">Admin Login</h2>
          <p className="text-sm opacity-60">
            Enter your credentials to continue
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm opacity-80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              disabled={isPending}
              className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-white/30 disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm opacity-80">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isPending}
                className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-white/30 disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isPending}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-60 transition hover:opacity-100 disabled:cursor-not-allowed"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {showError && !!errorMessage && (
          <p className="text-center text-sm text-red-400">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending && <Loader2 size={18} className="animate-spin" />}
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}