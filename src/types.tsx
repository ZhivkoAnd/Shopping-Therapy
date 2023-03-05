export interface BookingProps {
  id: number;
  title: string;
  price: number;
  image?: string;
  qty?: number;
}

export interface Product {
  [data: string]: {
    cities?: [];
    id: number;
    title: string;
    price: number;
    image?: string;
    qty?: number;
  };
}

export interface Vacations {
  params?: {
    city: string;
  };
  items: {
    fields: {
      date?: Date;
      title?: string;
      slug?: string;
      gallery?: {
        fields: {
          file: {
            url: string;
          };
        };
      }[];
    };
  }[];
}

export interface VacationPanelProps {
  item: {
    fields: {
      thumbnail: {
        fields: {
          file: {
            url: string;
            details: {
              image: {
                width: number;
                height: number;
              };
            };
          };
        };
      };
      date: string;
      title: string;
      slug: string;
    };
  };
}
export interface FilterProps {
  setFilterDateAscending?: () => void;
  setFilterDateDescending?: () => void;
  setFilterTitleAscending?: () => void;
  setFilterTitleDescending?: () => void;
  setFilterPriceAscending?: () => void;
  setFilterPriceDescending?: () => void;
  setInputQuery?: (e: string) => void;
  inputQuery?: string;
  isAdminPage?: boolean;
}

export interface Data {
  fields: {
    date?: number | Date | string;
  };
}
