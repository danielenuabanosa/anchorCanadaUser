export interface CategoryTag {
  id: string;
  label: string;
  slug: string;
  icon: string;
}

export interface Category {
  id: string;
  slug: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  opportunityCount: number;
  color: string;
  iconBg?: string;
  tagBg?: string;
  tagColor?: string;
  status?: string;
  tags?: CategoryTag[];
}
