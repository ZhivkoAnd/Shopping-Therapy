import { Data } from "../types";

export const filterDateAscending = (arr: Data[]) => {
  return [...arr].sort((a, b) => Number(a.fields.date) - Number(b.fields.date));
};

export const filterDateDescending = (arr: Data[]) => {
  return [...arr].sort((a, b) => Number(b.fields.date) - Number(a.fields.date));
};

export const filterPriceAscending = (arr: any) => {
  return [...arr].sort((a, b) => a.price - b.price);
};

export const filterPriceDescending = (arr: any) => {
  return [...arr].sort((a, b) => b.price - a.price);
};

export const filterTitleAscending = (arr: any) => {
  return [...arr].sort((a: any, b: any) => {
    return b.title.localeCompare(a.title);
  });
};
export const filterTitleDescending = (arr: any) => {
  return [...arr].sort((a: any, b: any) => {
    return a.title.localeCompare(b.title);
  });
};
