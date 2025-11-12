'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from 'lucide-react';

const FaqSection = () => {
  const linkClasses = "text-primary underline";

  const faqItems = [
    {
      value: "item-1",
      question: "Is Harper Free?",
      answer: <p>Yes. Harper is free in every sense of the word. You don't need a credit card to start using Harper, and the source code is freely available under the <a href="https://github.com/automattic/harper/blob/main/LICENSE" className={linkClasses} target="_blank" rel="noopener noreferrer">Apache-2.0 license</a>.</p>,
    },
    {
      value: "item-2",
      question: "How Does Harper Work?",
      answer: <p>Harper watches your writing and provides instant suggestions when it notices a grammatical error. When you see an underline, it's probably because Harper has something to say.</p>,
    },
    {
      value: "item-3",
      question: "Does Harper Change The Meaning of My Words?",
      answer: <p>No. Harper will never intentionally suggest an edit that might change your meaning. Harper strives to never make it harder to express your creativity.</p>,
    },
    {
      value: "item-4",
      question: "Is Harper Really Private?",
      answer: <p>Harper is the only widespread and comprehensive grammar checker that is truly private. Your data never leaves your device. Your writing should remain just that: yours.</p>,
    },
    {
      value: "item-5",
      question: "How Do I Use or Integrate Harper?",
      answer: (
        <p>
          That depends on your use case. Do you want to use it within Obsidian? We have an <a href="/docs/integrations/obsidian" className={linkClasses}>Obsidian plugin</a>. Do you want to use it within WordPress? We have a <a href="/docs/integrations/wordpress" className={linkClasses}>WordPress plugin</a>. Do you want to use it within your Browser? We have a <a href="https://chromewebstore.google.com/detail/private-grammar-checking/lodbfhdipoipcjmlebjbgmmgekckhpfb" className={linkClasses} target="_blank" rel="noopener noreferrer">Chrome extension</a> and a <a href="/docs/integrations/firefox-extension" className={linkClasses}>Firefox plugin</a>. Do you want to use it within your code editor? We have documentation on how you can integrate with <a href="/docs/integrations/visual-studio-code" className={linkClasses}>Visual Studio Code</a> and its forks, <a href="/docs/integrations/neovim" className={linkClasses}>Neovim</a>, <a href="/docs/integrations/helix" className={linkClasses}>Helix</a>, <a href="/docs/integrations/emacs" className={linkClasses}>Emacs</a>, <a href="/docs/integrations/zed" className={linkClasses}>Zed</a> and <a href="/docs/integrations/sublime-text" className={linkClasses}>Sublime Text</a>. If you're using a different code editor, then you can integrate directly with our language server, <a href="/docs/integrations/language-server" className={linkClasses}>harper-ls</a>. Do you want to integrate it in your web app or your JavaScript/TypeScript codebase? You can use <a href="/docs/harperjs/introduction" className={linkClasses}>harper.js</a>. Do you want to integrate it in your Rust program or codebase? You can use <a href="https://crates.io/crates/harper-core" className={linkClasses} target="_blank" rel="noopener noreferrer">harper-core</a>.
        </p>
      ),
    },
    {
      value: "item-6",
      question: "What Human Languages Do You Support?",
      answer: <p>We currently only support English and its dialects British, American, Canadian, and Australian. Other languages are on the horizon, but we want our English support to be truly amazing before we diversify.</p>,
    },
    {
      value: "item-7",
      question: "What Programming Languages Do You Support?",
      answer: (
        <div className="space-y-4">
          <p>
            For harper-ls and our code editor integrations, we support a wide variety of programming languages. You can view all of them over at the <a href="/docs/integrations/language-server" className={linkClasses}>harper-ls documentation</a>. We are entirely open to PRs that add support. If you just want to be able to run grammar checking on your code's comments, you can use <a href="https://github.com/automattic/harper/pull/1314" className={linkClasses} target="_blank" rel="noopener noreferrer">this PR</a> as a model for what to do.
          </p>
          <p>
            For harper.js and those that use it under the hood like our <a href="/docs/integrations/obsidian" className={linkClasses}>Obsidian plugin</a>, we support plaintext and/or Markdown.
          </p>
        </div>
      ),
    },
    {
      value: "item-8",
      question: "Where Did the Name Harper Come From?",
      answer: <p>See <a href="/blog/the-story-of-harper" className={linkClasses}>this blog post</a>.</p>,
    },
    {
      value: "item-9",
      question: "Do I Need a GPU?",
      answer: <p>No. Harper runs on-device, no matter what. There are no special hardware requirements. No GPU, no additional memory, no fuss.</p>,
    },
    {
      value: "item-10",
      question: "What Do I Do If My Question Isn't Here?",
      answer: (
        <p>
          You can join our <a href="https://discord.gg/invite/JBqcAaKrzQ" className={linkClasses} target="_blank" rel="noopener noreferrer">Discord</a> and ask your questions there or you can <a href="https://github.com/automattic/harper/discussions" className={linkClasses} target="_blank" rel="noopener noreferrer">start a discussion over at GitHub</a>.
        </p>
      ),
    }
  ];

  return (
    <section className="w-full py-12 px-4 md:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <h2 className="text-[32px] font-bold text-foreground">
          FAQs
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="group p-4 text-left text-base font-semibold hover:no-underline transition-colors hover:bg-muted [&>svg]:hidden">
                <div className="flex w-full items-center justify-start gap-3 text-foreground">
                  <ChevronRight className="h-4 w-4 shrink-0 text-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  <span className="flex-1">{item.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0 text-base text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;