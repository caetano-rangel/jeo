"use client";

interface StorytellingClientProps {
  tag?: string;
  titulo: string;
  descricao?: string;
  videoUrl?: string;
}

export default function StorytellingClient({
  tag,
  titulo,
  descricao,
  videoUrl,
}: StorytellingClientProps) {
  return (
    <section className="relative bg-cream py-16 md:py-24 px-6 text-center overflow-hidden">
      <div className="mx-auto max-w-3xl animate-fade-in-up">
        {/* HEADER DA SEÇÃO */}
        <div className="mb-16">
          {tag && (
            <span
              className="mb-4 block text-[10px] tracking-[0.4em] uppercase font-medium"
              style={{ color: "#6b6b6b" }}
            >
              {tag}
            </span>
          )}

          <h2
            className="font-serif text-3xl md:text-4xl text-gray-900"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            {titulo}
          </h2>

          {descricao && (
            <p
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed"
              style={{ color: "#757575" }}
            >
              {descricao}
            </p>
          )}
        </div>

        {/* VÍDEO DO SANITY (Exibido caso exista) */}
        {videoUrl && (
          <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl shadow-lg bg-black">
            <video
              src={videoUrl}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        {/* ELEMENTO DECORATIVO INFERIOR */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gray-300" />
          <div className="h-1 w-1 rounded-full bg-gray-400" />
          <div className="h-px w-12 bg-gray-300" />
        </div>
      </div>
    </section>
  );
}