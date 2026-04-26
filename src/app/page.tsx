import { redirect } from "next/navigation";
export default function Home() {

  const permisos = true;

  //Enrutador automático basado en permisos (obviamente en el mundo real se validaía también en la vista)
  if (permisos) {
    redirect("/view/landing-page");
  } else {
    redirect("/view/admin/reviews");
  }

  return;
}
