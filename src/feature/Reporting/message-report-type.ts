// report-type.ts

export type MessageAccountStatusType = "ACTIVE" | "SUSPENDED" | "BANNED";

export type MessageReportStatusType =
  | "ACTIVE"
  | "PENDING"
  | "DEACTIVE"
  | "SUSPEND"
  | "DELETE"
  | "DISMISS_REPORT";

export type MessageReportReasonType =
  | "FRAUD_ATTEMPT"
  | "SPAM"
  | "HARASSMENT"
  | "INAPPROPRIATE_CONTENT"
  | string;

export type MessageReportUserType = {
  id: number;
  fullname: string;
  email: string;
  isVerified: boolean;
  accountStatus: MessageAccountStatusType;
  roles: string[];
  displayname: string | null;
  bio: string | null;
  longitude: number | null;
  latitude: number | null;
  profile_image: string | null;
  trust_score: number;
  raw_score: number;
  is_online: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MessageReportType = {
  id: number;
  reason: MessageReportReasonType;
  description: string;
  image_url: string | null;
  status: MessageReportStatusType;
  adminAction: string | null;
  reporterId: number;
  reportedUserId: number;
  reporter: MessageReportUserType;
  reportedUser: MessageReportUserType;
  createdAt: string;
  updatedAt: string;
};

export type MessageReportsResponseType = {
  total: number;
  page: number;
  page_size: number;
  reports: MessageReportType[];
};
