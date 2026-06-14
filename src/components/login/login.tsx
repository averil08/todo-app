"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogoIcon } from "../ui/logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
        <div className="p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home"><LogoIcon /></Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to Tailark</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-6">
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">Email</Label>
              <Input type="email" required id="email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-sm">Password</Label>
              </div>
              <Input type="password" required id="pwd" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account?
            <Button asChild variant="link" className="px-2">
              <Link href="/signup">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}