interface CaptionProps {
  caption?: string;
}

export default function Caption({ caption }: CaptionProps) {
  if (!caption) return null;

  const words = caption.split(" ");

  return (
    <p>
      {words.map((word, index) => {
        if (word.startsWith("#")) {
          return (
            <span key={index} className="text-blue-500">
              {word}{" "}
            </span>
          );
        }

        return <span key={index}>{word} </span>;
      })}
    </p>
  );
}
