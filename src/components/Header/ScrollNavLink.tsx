"use client";
import Typography from "@/components/Typography/Typography";
import useScrollTo from "@/hooks/useScrollTo";

interface ScrollNavLinkProps {
  label: string;
  target: string;
  className?: string;
  onAfterScroll?: () => void; // useful for closing mobile menu
}

export default function ScrollNavLink({
  label,
  target,
  className = "",
  onAfterScroll
}: ScrollNavLinkProps) {
  const scrollTo = useScrollTo();

  const handleClick = () => {
    scrollTo(target);
    onAfterScroll?.(); // call this if provided (like closing menu)
  };

  return (
    <div onClick={handleClick} className={className}>
      <Typography
        variant="para"
        className="cursor-pointer text-black-700 hover:text-black border-b-2 border-transparent hover:border-black inline-block transition-all duration-200"
      >
        {label}
      </Typography>
    </div>
  );
}