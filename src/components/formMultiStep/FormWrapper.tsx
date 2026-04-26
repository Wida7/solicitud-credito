import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { RoughNotation } from "react-rough-notation";

type FormWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const formVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      ease: "easeOut" as const,
    },
  },
};

const FormWrapper = ({ title, description, children }: FormWrapperProps) => {
  return (
    <motion.div
      className="flex flex-col gap-5"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col gap-1">

        <h2 className="text-xl font-semibold text-foreground md:text-2xl mb-2">
          <RoughNotation
                type="underline"
                show={true}
                color={"#09344a"}
                animationDuration={1000}
              > {title}</RoughNotation>  
        </h2>      
        <p className="text-sm text-muted-foreground md:text-base">{description}</p>
      </div>
      {children}
    </motion.div>
  );
};

export default FormWrapper;
