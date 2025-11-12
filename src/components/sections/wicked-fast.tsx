import React from 'react';

const WickedFast = () => {
  return (
    <section className="w-full bg-background py-12 px-6">
      <div className="mx-auto max-w-xl space-y-4 text-center">
        <h3 className="font-semibold text-2xl leading-[1.3] tracking-[-0.01em] text-foreground">
          Wicked Fast
        </h3>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Since Harper runs on your devices, it's able to serve up suggestions in under 10
            milliseconds.
          </p>
          <p>No network request, no massive language models, no fuss.</p>
        </div>
      </div>
    </section>
  );
};

export default WickedFast;