import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectClass?: string;
}

export function EditorialImage({
  src,
  alt,
  caption,
  className = '',
  aspectClass = 'aspect-[4/3]',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-[#EAE1D5] border border-[#252525]/10 ${aspectClass}`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EAE1D5] via-[#F7F3EC] to-[#EAE1D5] p-6 text-center">
            <BookOpen className="h-8 w-8 text-[#713D46]" aria-hidden="true" />
            <p className="max-w-xs font-serif text-lg text-[#252525]">{alt}</p>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-xs leading-relaxed text-[#5C554E]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
