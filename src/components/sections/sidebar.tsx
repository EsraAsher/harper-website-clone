"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

interface NavGroup {
  title: string | null;
  links: NavLink[];
}

const navGroups: NavGroup[] = [
  {
    title: null,
    links: [{ href: "/docs/about", label: "About" }],
  },
  {
    title: "Integrations",
    links: [
      { href: "/docs/integrations/obsidian", label: "Obsidian" },
      { href: "/docs/integrations/chrome-extension", label: "Chrome Extension" },
      { href: "/docs/integrations/firefox-extension", label: "Firefox Extension" },
      { href: "/docs/integrations/wordpress", label: "WordPress" },
      { href: "/docs/integrations/language-server", label: "Language Server" },
      { href: "/docs/integrations/visual-studio-code", label: "Visual Studio Code" },
      { href: "/docs/integrations/neovim", label: "Neovim" },
      { href: "/docs/integrations/helix", label: "Helix" },
      { href: "/docs/integrations/emacs", label: "Emacs" },
      { href: "/docs/integrations/zed", label: "Zed" },
      { href: "/docs/integrations/sublime-text", label: "Sublime Text" },
    ],
  },
  {
    title: "harper.js",
    links: [
      { href: "/docs/harperjs/introduction", label: "Introduction" },
      { href: "/docs/harperjs/linting", label: "Linting" },
      { href: "/docs/harperjs/spans", label: "Spans" },
      { href: "/docs/harperjs/configurerules", label: "Configure Rules" },
      { href: "/docs/harperjs/node", label: "Node.js" },
      { href: "/docs/harperjs/CDN", label: "CDN" },
      { href: "/docs/harperjs/ref/index.html", label: "API Reference" },
    ],
  },
  {
    title: "Contributors",
    links: [
      { href: "/docs/contributors/introduction", label: "Introduction" },
      { href: "/docs/contributors/environment", label: "Environment" },
      { href: "/docs/contributors/committing", label: "Committing" },
      { href: "/docs/contributors/architecture", label: "Architecture" },
      { href: "/docs/contributors/dictionary", label: "Dictionary" },
      { href: "/docs/contributors/tests", label: "Test Suite" },
      { href: "/docs/contributors/author-a-rule", label: "Author a Rule" },
      { href: "/docs/contributors/visual-studio-code", label: "Visual Studio Code" },
      { href: "/docs/contributors/chrome-extension", label: "Chrome Extension" },
      { href: "/docs/contributors/wordpress", label: "WordPress" },
      { href: "/docs/contributors/obsidian", label: "Obsidian" },
      { href: "/docs/contributors/review", label: "Reviewing Pull Requests" },
      { href: "/docs/contributors/local-stats", label: "Local Statistics" },
      { href: "/docs/contributors/brill", label: "Brill Tagging" },
      { href: "/docs/contributors/faq", label: "FAQ" },
    ],
  },
  {
    title: null,
    links: [{ href: "https://docs.rs/harper-core/latest/harper_core/", label: "Rust Reference", external: true }],
  },
  {
    title: null,
    links: [{ href: "/docs/rules", label: "Rules" }],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/25 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col bg-sidebar shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-4">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2d48e1dd-052a-4936-b83a-5a10904b520a-writewithharper-com/assets/icons/circle-logo-1.png"
              alt="Harper logo"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold text-sidebar-primary">
              Harper
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-md p-1.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col">
            {navGroups.map((group, index) => (
              <li key={index} className="mb-4 last:mb-0">
                {group.title && (
                  <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.title}
                  </h3>
                )}
                <ul className="space-y-0.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-md px-4 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                        >
                          <span>{link.label}</span>
                          <ExternalLink size={14} className="text-muted-foreground" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="block rounded-md px-4 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;