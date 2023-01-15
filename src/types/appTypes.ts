export type ProductObject = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

export type ResponseObject = {
  data: ProductObject[];
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
};
