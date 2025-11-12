import React from 'react';

const WhatIsIt = () => {
  return (
    <section id="what-is-it" className="w-full py-12">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            What is it?
          </h3>
          <p className="text-base text-[#1a1a1a]">
            Harper is a free English grammar checker designed to be just right. You can think of it as an
            open-source alternative to Grammarly. I created it after years of dealing with the shortcomings
            of the competition.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsIt;