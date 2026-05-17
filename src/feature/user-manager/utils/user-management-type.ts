 export interface paginationType {
    page: number;
    page_size: number;
  }

  export const initialPaginationValue = {
    page: 1,
    page_size: 5
  }

  export type roleType = "ALL" | "ADMIN" | "USER" | "SELLER" | "Courier" | "SERVICE_PROVIDER";

  
export interface UserType {
  id: string;
  name: string;
  email: string;
  role: roleType;
  status: "VERIFIED" | "PENDING" | "REJECTED";
  trust: number;
  img: string;
}