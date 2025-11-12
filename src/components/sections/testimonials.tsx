import React from 'react';

const testimonials = [
  {
    quote: "Written in Rust, everything is processed in an instant and I find it neat to see the browser extension highlight words as I type, effectively checking per letter. And no account is required, allowing me to get up and running in no time.",
    author: "Rich Edmonds",
    role: "Lead PC Hardware Editor, XDA Developers",
  },
  {
    quote: "I've been using Harper in Neovim for a long time and am glad to see it as an extension!",
    author: "imbolc",
    role: "Chrome Extension Review",
  },
  {
    quote: "Obsidian is my favorite productivity app, and Harper is a grammar checking tool that works well with it.",
    author: "Justin Pot",
    role: "Tech Journalist, Lifehacker",
  },
  {
    quote: "What a delightful way to check for flagrant spelling errors in markdown files. Thanks Harper authors!",
    author: "Martijn Gribnau",
    role: "Software Engineer",
  },
  {
    quote: "Awesome extension! It's privacy focused, that means that every check it done locally on your computer, there is no server where your data goes! And because of that it's blazingly fast compared to Grammarly.",
    author: "Filip Cujanovic",
    role: "Chrome Extension Review",
  },
  {
    quote: "Harper excels at catching the kinds of mistakes that matter in technical writing – improper capitalization, misspelled words, and awkward phrasing that can make documentation unclear.",
    author: "Chloe Ferguson",
    role: "Writer, We Are Founders",
  },
  {
    quote: "Harper is great: it is discreet, fast, powerful, and private.",
    author: "Tim Miller",
    role: "Author, Obsidian Rocks",
  },
  {
    quote: "I've been using Harper instead of Grammarly for a few months already, and I can't be happier! I can't wait to see the great improvement when this tool reaches version 1.0.0! Great job! I hope that, eventually, it will also support languages other than English.",
    author: "Rogerio Taques",
    role: "Chrome Extension Review",
  },
  {
    quote: "What I loved about this tool is that it's private, and open source and really fast.",
    author: "Prakash Joshi Pax",
    role: "Writer, Medium",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full px-4 md:px-6">
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold">Loved by Thousands</h3>
        <div className="columns-1 gap-6 space-y-6 md:columns-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="break-inside-avoid rounded-lg border bg-card p-6 shadow-sm"
            >
              <p className="text-base text-foreground">
                {testimonial.quote}
              </p>
              <div className="mt-4">
                <p className="text-base font-semibold text-card-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;