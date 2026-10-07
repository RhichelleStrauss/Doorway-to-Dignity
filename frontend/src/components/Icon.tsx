type IconProps = { src: string; className?: string };

function Icon({ src, className = "" }: IconProps) {
  const mask = `url("${src}") center / contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}

export default Icon;
