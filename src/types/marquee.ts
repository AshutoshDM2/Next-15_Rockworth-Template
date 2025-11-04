export interface MarqueeItem {
  id: number;
  logo: string;
  altText: string;
}

export interface MarqueeProps {
  items?: MarqueeItem[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}
