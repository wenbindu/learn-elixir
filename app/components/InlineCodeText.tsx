type InlineCodeTextProps = {
  text: string;
};

export function InlineCodeText({ text }: InlineCodeTextProps) {
  return (
    <>
      {text.split(/(`[^`\n]+`)/g).map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code className="inline-code-text" key={`${part}-${index}`}>
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}
