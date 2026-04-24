import { motion } from "framer-motion";
import { BadgeCheck, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn" as const,
      duration: 0.6,
    },
  },
};

const SuccessMessage = () => {
  const router = useRouter();
  const refresh = () => router.push("/");
  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-2 text-center"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <HandHeart height="100" width="100" className="text-primary hover:scale-110 hover:animate-pulse" />

      <h4 className="text-2xl font-semibold text-foreground md:text-3xl">
        Gracias!
      </h4>
      <p className="max-w-md text-sm text-muted-foreground md:text-base">
        Pronto recibirás una respuesta sobre tu solicitud. Confirmando que toda la información proporcionada es correcta para continuar con el proceso.
      </p>
      <div className="flex items-center mt-6">
        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
          <Button
            onClick={refresh}
            variant="default"
            className="px-6"
          >
            <BadgeCheck className="mr-2 h-8 w-8" /> Salir
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default SuccessMessage;
