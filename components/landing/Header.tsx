// components/landing/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<header className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm border-b border-border/40" : "bg-transparent"}`}>
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2 font-bold text-xl">
					<span>FinFlow</span>
				</div>

				<div className="hidden md:flex items-center gap-8">
					<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
						Home
					</Link>
					<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
						Pricing
					</Link>
					<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
						Why To Use
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
						{mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
						<span className="sr-only">Toggle theme</span>
					</Button>
					<div className="hidden md:flex gap-4 items-center">
						<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
							로그인
						</Link>
						<Link href="/onboarding">
							<Button className="rounded-2xl bg-blue-600 hover:bg-blue-700">시작하기</Button>
						</Link>
					</div>
					<Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
						{mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
						<span className="sr-only">Toggle menu</span>
					</Button>
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
				>
					<div className="container py-4 flex flex-col gap-4">
						<Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
							Home
						</Link>
						<Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
							Pricing
						</Link>
						<Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
							Why To Use
						</Link>
						<hr className="border-border/40" />
						<Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
							로그인
						</Link>
						<Link href="/onboarding">
							<Button className="rounded-2xl bg-blue-600 hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>
								시작하기
							</Button>
						</Link>
					</div>
				</motion.div>
			)}
		</header>
	);
};