export interface userReportType {
  data: {
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
  } | null;
  isLoading: boolean;
  isError: any;
}