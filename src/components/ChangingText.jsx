import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
const ChangingText = ({ className }) => {
    const dataList = ["Full Stack Developer", "Bon appétit, GitHub.", "Tech Enthusiast"];
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % dataList.length);
        }, 2000);

        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className={`${className ?? ''} dark:text-zinc-400`}
            >
                {dataList[index]}
            </motion.p>
        </AnimatePresence>
    );
}

export default ChangingText;

