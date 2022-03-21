import {
  MdDashboard,
  MdArrowUpward,
  MdOutlineSupervisorAccount,
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
    icon:  <MdArrowUpward />
},
  {
    id: "support",
    title: "SUPPORT",
    href: "/support",
    icon: <MdArrowUpward />,
  },
];
