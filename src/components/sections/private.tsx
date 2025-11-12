import Image from 'next/image';

const PrivateSection = () => {
  return (
    <section className="w-full px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">
            Private
          </h3>
          <div className="space-y-3">
            <p>
              Harper is completely private, in every sense of the word.
            </p>
            <p>
              Since Harper runs on-device, your data doesn't go anywhere you
              don't want it to.
            </p>
            <p>
              That means you have 100% certainty we don't violate your
              copyright by training large language models.
            </p>
          </div>
        </div>
        <div>
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2d48e1dd-052a-4936-b83a-5a10904b520a-writewithharper-com/assets/images/camera-1.webp"
            alt="Graffiti of a camera."
            width={500}
            height={375}
            className="w-full rounded-xl object-cover shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default PrivateSection;