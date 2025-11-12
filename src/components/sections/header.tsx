"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Moon } from "lucide-react";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v19.056c0 1.368-1.104 2.472-2.46 2.472h-15.08c-1.356 0-2.46-1.104-2.46-2.472v-19.056c0-1.368 1.104-2.472 2.46-2.472h15.08zm-2.883 5.952h-2.156c-.336 0-.648.252-.72.588-.528 2.376-1.92 3-3.096 3s-2.568-.624-3.096-3c-.072-.336-.384-.588-.72-.588h-2.148c-.42 0-.636.54-.336.864 1.416 1.944 3.06 3.036 5.16 3.036 2.1 0 3.744-1.092 5.16-3.036.312-.324.096-.864-.324-.864zm-6.084-2.052c-.816 0-1.488.66-1.488 1.488s.672 1.488 1.488 1.488 1.488-.66 1.488-1.488-.672-1.488-1.488-1.488zm5.16 0c-.816 0-1.488.66-1.488 1.488s.672 1.488 1.488 1.488 1.488-.66 1.488-1.488-.672-1.488-1.488-1.488z" />
  </svg>
);

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2d48e1dd-052a-4936-b83a-5a10904b520a-writewithharper-com/assets/icons/circle-logo-1.png"
            alt="Harper Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-semibold text-xl text-foreground">Harper</span>
        </Link>

        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                href="/docs/about"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Documentation
              </Link>
            </li>
            <li>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=elijah-potter.harper"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Visual Studio Code
              </a>
            </li>
            <li>
              <Link
                href="/docs/integrations/obsidian"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Obsidian
              </Link>
            </li>
            <li>
              <a
                href="https://chromewebstore.google.com/detail/private-grammar-checking/lodbfhdipoipcjmlebjbgmmgekckhpfb"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Chrome Extension
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/automattic/harper"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://discord.gg/invite/JBqcAaKrzQ"
            target="_blank"
            rel="noreferrer"
            aria-label="Discord"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <DiscordIcon className="h-5 w-5" />
          </a>
          <button
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Moon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;