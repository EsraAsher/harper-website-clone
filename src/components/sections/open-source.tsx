import React from 'react';

const OpenSourceSection = () => {
  return (
    <section className="w-full px-6 text-center">
      <div className="space-y-4">
        <h2 className="text-[32px] font-bold text-foreground">Open Source</h2>
        <div className="space-y-3 text-base text-muted-foreground">
          <p>
            Harper is completely open source under the Apache-2.0 license.
          </p>
          <p>
            Come pay us a visit on{' '}
            <a
              href="https://github.com/automattic/harper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;