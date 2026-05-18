export const ArticleData = [
  {
    id: 1024,
    reason: "FRAUD_ATTEMPT",
    description:
      "User is sending fishing links in private messages pretending to be a system administrator offering free premium accounts.",
    status: "PENDING",
    adminAction: "",
    reporterId: 452,
    reportedUserId: 890,
    reporter: {
      id: 452,
      fullname: "Sarah Connor",
      displayname: "sconnor_dev",
      profile_image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    },
    reportedUser: {
      id: 890,
      fullname: "Crypto Bot Alpha",
      displayname: "official_admin_rewards3",
      profile_image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&h=150&q=80",
    },
    createdAt: "2026-05-18T08:15:22.124Z",
    updatedAt: "2026-05-18T08:15:22.124Z",
  },
  {
    id: 1025,
    reason: "HARASSMENT",
    description:
      "Leaving highly offensive, targeted comments on my recent public articles despite being explicitly blocked.",
    status: "INVESTIGATING",
    adminAction:
      "Temporary shadowban applied while reviewing full comment history logs.",
    reporterId: 110,
    reportedUserId: 643,
    reporter: {
      id: 110,
      fullname: "David Chen",
      displayname: "dchen_codes",
      profile_image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    },
    reportedUser: {
      id: 643,
      fullname: "Troll Master 99",
      displayname: "anonymous_user_x",
      profile_image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
    },
    createdAt: "2026-05-18T09:44:10.000Z",
    updatedAt: "2026-05-18T10:12:35.850Z",
  },
  {
    id: 1026,
    reason: "SPAM",
    description:
      "Bulk pasting promotional tracking URLs for a sketchy third-party retail software across multiple community boards.",
    status: "RESOLVED",
    adminAction:
      "Account permanently terminated and all matching link configurations purged from database.",
    reporterId: 321,
    reportedUserId: 911,
    reporter: {
      id: 321,
      fullname: "Marcus Aurelius",
      displayname: "stoic_coder",
      profile_image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    },
    reportedUser: {
      id: 911,
      fullname: "Cheap Licenses LLC",
      displayname: "get_software_fast",
      profile_image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80",
    },
    createdAt: "2026-05-18T10:25:00.312Z",
    updatedAt: "2026-05-18T10:28:39.973Z",
  },
];
