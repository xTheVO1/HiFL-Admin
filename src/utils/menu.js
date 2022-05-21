import {
  MdDashboard,
  MdOutlineSupervisorAccount,
  MdPeopleAlt,
  MdToggleOn,
  MdSchool,
  MdSports,
  MdCalendarToday,
  MdInfo,
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
    id: "user",
    title: "USERS",
    href: "/users",
    icon: <MdPeopleAlt />,
  },
  {
    id: "settings",
    title: "SETTINGS",
    href: "/settings",
    icon: <MdToggleOn />,
  },
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
];