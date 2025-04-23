import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
const animations = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1.05,
  },
};
const PageTransition = ({ children }) => {
  const location = useLocation(); // To detect route changes in the admin panel
  const pageTransition = {
    type: "spring",
    stiffness: 150,
    damping: 20,
    duration: 2,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

PageTransition.propTypes = {
  children: PropTypes.PropTypes.node,
};

export default PageTransition;
