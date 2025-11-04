export interface SliderItem {
  id: number;
  title: string;
  image?: string;
  badge?: string;
  icon?: string;
  color: string;
  downloadUrl: string;
}

export interface SliderData {
  certificates: SliderItem[];
  catalogues: SliderItem[];
}

export interface SliderProps {
  data: SliderData;
  defaultTab?: "catalogues" | "certificates";
  className?: string;
}

export interface ResponsiveConfig {
  desktop: number;
  tablet: number;
  mobile: number;
}
