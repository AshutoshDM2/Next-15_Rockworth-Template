"use client";

import { Button } from "@/components/ui/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "../Logo/Logo";

const navItems = [
  { label: "Home", href: "/", active: true },
  { label: "About us", href: "/about" },
  { label: "All Categories", href: "/categories" },
  { label: "Spaces", href: "/spaces" },
  { label: "Workspace Service", href: "/workspace-service" },
  { label: "Projects", href: "/projects" },
];

export function MobileTopbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <Logo width={120} height={32} animated={false} href="/" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <nav className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block py-3 px-4 rounded-lg transition-colors ${
                      item.active
                        ? "bg-orange-50 text-brand-color font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
