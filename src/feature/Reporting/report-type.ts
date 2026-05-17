export interface userReportType {
  reason: "FRAUD_ATTEMPT" | "HARASSMENT" | "POLICY VIOLATION" | string;
  description: string;
  status: "Pending Review" | "In Progress" | "Resolved";
  adminAction: "string";
  reporterId: string;
  reportedUserId: string;
  reporter: {
    id: string;
    fullname: string;
    displayname: string;
    profile_image: string;
  };
  reportedUser: {
    id: string;
    fullname: string;
    displayname: string;
    profile_image: string;
  };
}

export interface getUserReportType {
  page: number;
  page_size: number;
  total: number;
  reports: userReportType[] | []
}

export interface userReportSliceType {
  data: getUserReportType | null;
  isLoading: boolean;
  isError: any;
}
