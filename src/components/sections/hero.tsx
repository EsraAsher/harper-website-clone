import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HarperGlassesLogo = () => (
  <svg width="200" height="auto" viewBox="0 0 200 100" className="text-foreground" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round">
      <circle cx="50" cy="50" r="40" />
      <circle cx="150" cy="50" r="40" />
      <path d="M90 45 C 100 30, 100 30, 110 45" />
    </g>
  </svg>
);

const GithubIcon = () => (
    <div className="relative h-10 w-10">
      <div className="absolute inset-0 rounded-full bg-black"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="white"
        className="absolute inset-0 p-2"
      >
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49 0-.45-.15-1.2.45-1.49 2.5-.28 5.14-1.28 5.14-5.64 0-1.25-.43-2.27-1.13-3.07.11-.28.49-1.35-.11-3.23 0 0-1.02-.32-3.33 1.23A11.5 11.5 0 0 0 8 4c-.94 0-1.88.13-2.75.38C2.95 2.92 1.93 3.24 1.93 3.24c-.6 1.88-.22 2.95-.11 3.23-.7.8-1.13 1.82-13.07 0 4.36 2.63 5.36 5.13 5.64.6.52.45 1.04.45 1.49 0 .66.01 1.32.01 1.49 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
      </svg>
    </div>
);

const ChromeIcon = () => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4CAF50" d="M20,35.5c-2.31,0-4.52-0.56-6.49-1.59l-3.23,3.23A20,20,0,0,0,20,40Z"/>
    <path fill="#F44336" d="M10.28,33.91A19.8,19.8,0,0,0,4.5,20,19.8,19.8,0,0,0,10.28,6.09l3.23,3.23A14.51,14.51,0,0,1,9,20a14.51,14.51,0,0,1,4.51,10.68Z"/>
    <path fill="#FFC107" d="M33.91,29.72,30.68,26.49A14.51,14.51,0,0,1,20,31,14.51,14.51,0,0,1,9.32,26.49l-3.23,3.23A19.8,19.8,0,0,0,20,35.5,19.8,19.8,0,0,0,33.91,29.72Z"/>
    <path fill="#4285F4" d="M35.5,20A15.5,15.5,0,0,0,20,4.5c-4.43,0-8.4,1.87-11.23,4.82l3.23,3.23A10,10,0,0,1,20,10a10,10,0,0,1,9.8,8H20v3h15.5A15.42,15.42,0,0,0,35.5,20Z"/>
    <circle fill="#4285F4" cx="20" cy="20" r="5.5"/>
  </svg>
);

const VsCodeIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5 3.5L13.5 12L20.5 20.5L23 18.5V5.5L20.5 3.5Z" fill="#0065A9"/>
        <path d="M3.5 3.5L10.5 12L3.5 20.5L1 18.5V5.5L3.5 3.5Z" fill="#007ACC"/>
        <path d="M12.75 22L17.5 13.25L15 11.25L9.5 21L12.75 22Z" fill="#0065A9"/>
        <path d="M12.75 2L9.5 3L15 12.75L17.5 10.75L12.75 2Z" fill="#007ACC"/>
    </svg>
);

const ObsidianIcon = () => (
    <svg width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="90" fill="#2D205A"/>
      <path d="M110.05 131.785L255.457 43.6332L400.95 131.785V310.215L332.915 363.018L255.457 468.367L178.085 363.018L110.05 310.215V131.785Z" fill="#6A45DB"/>
      <path d="M110.05 310.215L178.085 363.018L255.457 468.367V243.633L110.05 131.785V310.215Z" fill="#8868E4"/>
      <path d="M400.95 131.785L255.457 243.633V468.367L332.915 363.018L400.95 310.215V131.785Z" fill="#A48BFF"/>
      <path d="M255.457 43.6332L110.05 131.785L255.457 243.633L400.95 131.785L255.457 43.6332Z" fill="#C0B0FF"/>
    </svg>
);

const AuthorIcon = () => (
    <Image 
      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2d48e1dd-052a-4936-b83a-5a10904b520a-writewithharper-com/assets/svgs/profile-1.svg"
      alt="Author"
      width={40}
      height={40}
    />
);

const HeroSection = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 md:px-6">
        <div className="space-y-6 text-center">
          <div className="flex w-full flex-col items-center">
            <HarperGlassesLogo />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Hi. I'm Harper.
            </h1>
            <h2 className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
              The <strong className="font-semibold text-muted-foreground">Free</strong> Grammar Checker That Respects Your Privacy
            </h2>
          </div>
          <div className="grid grid-cols-2 place-items-center justify-center gap-x-4 gap-y-6 pt-4 text-sm font-medium text-foreground sm:text-base md:flex md:flex-row md:justify-evenly">
            <a href="https://github.com/automattic/harper" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2 duration-200 hover:scale-105 hover:skew-x-2 transition-transform">
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <a href="https://chromewebstore.google.com/detail/private-grammar-checking/lodbfhdipoipcjmlebjbgmmgekckhpfb" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2 duration-200 hover:scale-105 hover:-skew-x-2 transition-transform">
              <ChromeIcon />
              <span>Add to Chrome</span>
            </a>
            <a href="https://marketplace.visualstudio.com/items?itemName=elijah-potter.harper" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2 duration-200 hover:scale-105 hover:skew-x-2 transition-transform">
              <VsCodeIcon />
              <span>Install in VS Code</span>
            </a>
            <Link href="/docs/integrations/obsidian" className="flex flex-row items-center gap-2 duration-200 hover:scale-105 hover:-skew-x-2 transition-transform">
              <ObsidianIcon />
              <span>Install in Obsidian</span>
            </Link>
            <a href="https://elijahpotter.dev" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2 duration-200 hover:scale-105 hover:skew-x-2 transition-transform">
              <AuthorIcon />
              <span>Author</span>
            </a>
          </div>
          <div className="pt-6">
            <div className="h-[800px] w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              {/* Interactive demo placeholder */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;