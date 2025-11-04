"use client";

import { FooterLink } from "./footer-link";

interface FooterSectionProps {
  title: string;
  links: Array<{ label: string; href: string }>;
  delay?: number;
}

export function FooterSection({ title, links, delay = 0 }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-black">{title}</h3>
      <ul className="">
        {links.map((link, index) => (
          <li key={link.label}>
            <FooterLink href={link.href} delay={delay + index * 0.05}>
              {link.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
