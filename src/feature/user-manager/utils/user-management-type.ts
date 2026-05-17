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

export type userManagerUserType = {
  id: string;
  fullname: string;
  email: string;
  isVerified: boolean;
  accountStatus: "PENDING" | "ACTIVE" | "REJECTED";
  roles: "ALL" | "USER" | "SELLER" | "SERVICE_PROVIDER";
  displayname: string;
  bio: string;
  longitude: number;
  latitude: number;
  profile_image: string;
  is_online: boolean;
  raw_score: number;
  trust_score: number;
};

export type getAllUserType = {
  page: number;
  page_size: number;
  total: number;
  users: userManagerUserType[] | null;
};

type statusType = {
  user_id: string;
  accountStatus: "PENDING" | "ACTIVE" | "REJECTED";
};

export type userManagerType = {
  data: getAllUserType  | null;
  accountStatus: statusType;
  isLoading: boolean;
  isError: any;
};