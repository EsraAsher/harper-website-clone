import React from 'react';
import Link from 'next/link';

const platforms: { name: string; href: string }[] = [
  { name: 'Obsidian', href: '/docs/integrations/obsidian' },
  { name: 'Visual Studio Code', href: '/docs/integrations/visual-studio-code' },
  { name: 'Neovim', href: '/docs/integrations/neovim' },
  { name: 'Chrome', href: 'https://chromewebstore.google.com/detail/private-grammar-checking/lodbfhdipoipcjmlebjbgmmgekckhpfb' },
  { name: 'Firefox', href: '/docs/integrations/firefox-extension' },
  { name: 'Helix', href: '/docs/integrations/helix' },
  { name: 'WordPress', href: '/docs/integrations/wordpress' },
  { name: 'Zed', href: '/docs/integrations/zed' },
  { name: 'Emacs', href: '/docs/integrations/emacs' },
  { name: 'Sublime Text', href: '/docs/integrations/sublime-text' },
];

interface PlatformCardProps {
  name: string;
  href: string;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ name, href }) => {
  const isExternal = href.startsWith('http');
  const className = "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm transition-shadow hover:shadow-md";

  const content = (
    <>
      <div className="h-10 w-10 flex-shrink-0 rounded-md bg-muted" />
      <span className="font-medium text-card-foreground">{name}</span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
};

const NativeEverywhere = () => {
  return (
    <section className="w-full px-4 md:px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-4 md:order-2">
            <h3 className="text-2xl font-semibold text-foreground">Native Everywhere</h3>
            <div className="space-y-3 text-base text-foreground">
              <p>
                Harper is available as a{' '}
                <Link href="/docs/integrations/language-server" className="text-primary underline">
                  language server
                </Link>
                ,{' '}
                <Link href="/docs/harperjs/introduction" className="text-primary underline">
                  JavaScript library
                </Link>{' '}
                through WebAssembly, and{' '}
                <a href="https://crates.io/crates/harper-core" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  Rust crate
                </a>
                , so you can get fantastic grammar checking anywhere you work.
              </p>
              <p>
                That said, we take extra care to make sure the{' '}
                <Link href="/docs/integrations/visual-studio-code" className="text-primary underline">
                  Visual Studio Code
                </Link>
                ,{' '}
                <Link href="/docs/integrations/neovim" className="text-primary underline">
                  Neovim
                </Link>
                ,{' '}
                <Link href="/docs/integrations/obsidian" className="text-primary underline">
                  Obsidian
                </Link>
                , and{' '}
                <a href="https://chromewebstore.google.com/detail/private-grammar-checking/lodbfhdipoipcjmlebjbgmmgekckhpfb" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  Chrome
                </a>{' '}
                extensions are amazing.
              </p>
            </div>
          </div>
          <div className="md:order-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {platforms.map((platform) => (
                <PlatformCard key={platform.name} name={platform.name} href={platform.href} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NativeEverywhere;