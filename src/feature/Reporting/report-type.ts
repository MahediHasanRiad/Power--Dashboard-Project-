import type { MessageReportsResponseType } from "./message-report-type";

export interface userReportType {
  id: number;
  reason: string;
  description: string;
  status: string;
  adminAction: string; 
  
  reporterId: number;
  reportedUserId: number;
  reporter: {
    id: number;
    fullname: string;
    displayname: string;
    profile_image: string;
  };
  reportedUser: {
    id: number;
    fullname: string;
    displayname: string;
    profile_image: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface getUserReportType {
  page: number;
  page_size: number;
  total: number;
  reports: userReportType[] | []
}

export interface userReportSliceType {
  data: getUserReportType | null;
  messageReport: MessageReportsResponseType | null;
  isLoading: boolean;
  isError: any;
}


// report-type.ts
export type ReportStatus = "PENDING" | "RESOLVED" | "BLOCKED" | "ESCALATED"

export type ReportReason =
  | "FRAUD_ATTEMPT"
  | "SPAM"
  | "HARASSMENT"
  | "INAPPROPRIATE_CONTENT"
  | string

export type ReportUser = {
  id: number
  fullname: string
  displayname: string
  profile_image: string
}

export type ReportType = {
  id: number
  reason: ReportReason
  description: string
  status: ReportStatus
  adminAction: string
  reporterId: number
  reportedUserId: number
  reporter: ReportUser
  reportedUser: ReportUser
  createdAt: string
  updatedAt: string
}

export type ReportsResponse = {
  total: number
  page: number
  page_size: number
  reports: ReportType[]
}
