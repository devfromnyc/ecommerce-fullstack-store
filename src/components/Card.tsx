import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  colors?: number;
  badge?: string;
}

const Card = ({
  title,
  description,
  price,
  image,
  colors,
  badge,
}: CardProps) => {
  return (
    <article className="group flex w-full max-w-sm flex-col overflow-hidden rounded-lg bg-light-100 shadow-sm transition-shadow hover:shadow-md">
      {/* Image section */}
      <div className="relative aspect-square w-full overflow-hidden bg-light-200">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-light-100 px-4 py-1.5 text-caption font-medium text-red">
            {badge}
          </span>
        )}
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-1 bg-dark-900 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-body-medium font-medium text-light-100">
            {title}
          </h3>
          <span className="text-body-medium font-medium text-light-100 whitespace-nowrap">
            ${price.toFixed(2)}
          </span>
        </div>

        <p className="text-caption text-dark-500">{description}</p>

        {colors !== undefined && colors > 0 && (
          <p className="text-caption text-dark-500">
            {colors} Colour{colors !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </article>
  );
};

export default Card;
