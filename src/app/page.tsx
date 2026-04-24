import { redirect } from "next/navigation";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
export default function Home() {

  const permisos = true;

  //Enrutador automático basado en permisos (obviamente en el mundo real se validaía también en la vista)
  permisos ? redirect("/landing-page") : redirect("/admin/reviews");

  return;
}
