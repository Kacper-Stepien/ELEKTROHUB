import BenefitsList from "./BenefitsList";
import RegisterForm from "./forms/RegisterForm";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const RegisterFormContainer = () => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <div className="3xl:text-md m-auto grid   max-w-[64rem] grid-cols-2 justify-center gap-16 rounded-lg bg-white  p-8 text-sm shadow-md">
        <RegisterForm />
        <BenefitsList />
      </div>
    </motion.div>
  );
};

export default RegisterFormContainer;
