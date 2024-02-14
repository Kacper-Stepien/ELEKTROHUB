import LoginForm from "./forms/LoginForm";
import LoginImage from "./LoginImage";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const LoginFormContainer = () => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <div className="3xl:text-md m-auto grid h-full max-w-[64rem] grow grid-cols-2 items-center justify-center gap-16 rounded-lg bg-white  p-8 text-sm shadow-md">
        <LoginForm />
        <LoginImage />
      </div>
    </motion.div>
  );
};

export default LoginFormContainer;
