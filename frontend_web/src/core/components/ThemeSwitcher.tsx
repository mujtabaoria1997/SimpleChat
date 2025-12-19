import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { type FC } from "react";

interface ThemeSwitcherProps {
  darkMode: boolean;
  toggleThemeMode: () => void;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  darkMode,
  toggleThemeMode,
}) => {
  return (
    <Button
      style={{
        marginLeft: "auto",
        marginRight: "10px"
      }}
      type="text"
      onClick={toggleThemeMode}
      icon={
        <AnimatePresence>
          {darkMode ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MoonOutlined style={{ fontSize: 24, color: "#f5f5f5" }} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SunOutlined style={{ fontSize: 24, color: "#ffc107" }} />
            </motion.div>
          )}
        </AnimatePresence>
      }
    />
  );
};

export default ThemeSwitcher;
