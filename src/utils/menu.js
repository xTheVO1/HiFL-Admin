import {
  MdDashboard,
  MdOutlineSupervisorAccount,
  MdPeopleAlt,
  MdToggleOn,
  MdSchool,
  MdShop,
  MdSettingsApplications,
  MdPeople,
  MdCalendarToday,
  MdInfo,MdOutlineLogout
} from "react-icons/md";

export const teamManagerMenu = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    href: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "team",
    title: "TEAMS",
    href: "/teams",
    icon: <MdOutlineSupervisorAccount />,
  },
  {
    id: "guidelines",
    title: "GUIDELINES",
    href: "/guidelines",
    icon: <MdInfo />,
  },
  {
    id:"logout",
    title: "LOGOUT",
    href: "",
    icon: <MdOutlineLogout/>
  }
];

export const AdminMenu = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    href: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "team",
    title: "TEAMS",
    href: "/teams",
    icon: <MdOutlineSupervisorAccount />,
  },
  {
    id: "institutions",
    title: "INSTITUTIONS",
    href: "/institution",
    icon: <MdSchool />,
  },
  {
    id:"logout",
    title: "LOGOUT",
    href: "",
    icon: <MdOutlineLogout/>
  }
];

export const SuperAdminMenu = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    href: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "team",
    title: "TEAMS",
    href: "/teams",
    icon: <MdOutlineSupervisorAccount />,
  },
  {
    id: "institutions",
    title: "INSTITUTIONS",
    href: "/institutions",
    icon: <MdSchool />,
  },
  {
    id: "season",
    title: "SEASONS",
    href: "/seasons",
    icon: <MdCalendarToday />,
  },
  {
    id: "settings",
    title: "SETTING",
    href: "/settings",
    icon: <MdSettingsApplications />,
  },
  {
    id: "store",
    title: "STORE",
    href: "/store",
    icon: <MdShop />,
  },
  {
    id: "volunteer",
    title: "VOLUNTEER",
    href: "/volunteer",
    icon: <MdPeople />,
  },
  {
    id: "user",
    title: "USERS",
    href: "/users",
    icon: <MdPeopleAlt />,
  },
  {
    id:"logout",
    title: "LOGOUT",
    href: "",
    icon: <MdOutlineLogout/>
  }
];

export const AccreditorMenu = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    href: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    id: "team",
    title: "TEAMS",
    href: "/teams",
    icon: <MdOutlineSupervisorAccount />,
  },
  {
    id: "guidelines",
    title: "GUIDELINES",
    href: "/guidelines",
    icon: <MdInfo />,
  },
  {
    id:"logout",
    title: "LOGOUT",
    href: "",
    icon: <MdOutlineLogout/>
  }
];