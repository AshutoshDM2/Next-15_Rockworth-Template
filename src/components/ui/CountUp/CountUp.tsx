interface CountUpProps {
  targetValue: string;
  className?: string;
}

export const CountUp = ({
  targetValue,
  className = "text-2xl font-bold text-primary-green",
}: CountUpProps) => {
  return <div className={className}>{targetValue}</div>;
};
