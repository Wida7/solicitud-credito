"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/modules/auth/services/authApi";
import { useAppDispatch, useAppSelector } from "@/infrastructure/store/hooks";
import { setSession } from "@/modules/auth/store/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.auth.session);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.token) {
      router.replace("/view/admin/reviews");
    }
  }, [router, session?.token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const authSession = await authApi.login({ username, password });
      dispatch(setSession(authSession));
      toast.success("Inicio de sesion correcto", {
        position: "top-center",
        className: "bg-primary text-primary-foreground font-semibold",
      });
      router.push("/view/admin/reviews");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No fue posible iniciar sesion";

      toast.error(message, {
        position: "top-center",
        className: "bg-primary text-primary-foreground font-semibold",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-4 pt-28 pb-8 md:px-6 md:pt-32">
      <section className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-4xl border border-form-panel-border bg-form-panel p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Acceso empleado</h1>
          <p className="text-sm text-muted-foreground">
            Ingresa con tus credenciales para revisar solicitudes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="username">
              Usuario
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Escribe tu usuario"
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Contrasena
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escribe tu contrasena"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Validando..." : "Ingresar"}
          </Button>
        </form>
      </section>
    </main>
  );
}
