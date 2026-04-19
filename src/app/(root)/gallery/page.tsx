import Image from "next/image";

const images = [
  {
    src: "/images/aravind-vijayan1.png",
    alt: "Aravind Vijayan – Portrait 1",
  },
  {
    src: "/images/aravind-vijayan2.png",
    alt: "Aravind Vijayan – Portrait 2",
  },
];

export default function Gallery() {
  return (
    <section className="w-full py-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Gallery
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Selected moments and portraits
        </p>
      </div>

      <div
        className="
          mx-auto max-w-6xl
          grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-4 px-4
        "
      >
        {images.map((img) => (
          <div
            key={img.src}
            className="
              overflow-hidden rounded-xl
              transition-transform duration-300
              hover:scale-[1.02]
            "
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1200}
              height={1200}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
