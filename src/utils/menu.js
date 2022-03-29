import {
  MdDashboard,
  MdArrowUpward,
  MdOutlineSupervisorAccount,
  MdPeopleAlt,
  MdToggleOn,
  MdSchool,
  MdSports,
  MdCalendarToday
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
    id: "guidelines",
    title: "INSTITUTIONS",
    href: "/institution",
    icon:  <MdArrowUpward />
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
    icon:  <MdSchool />
},
{
  id: "season",
  title: "SEASONS",
  href: "/seasons",
  icon:  <MdCalendarToday />
},
{
  id: "league",
  title: "LEAGUES",
  href: "/leagues",
  icon:  <MdSports />
},
{
  id: "user",
  title: "USERS",
  href: "/users",
  icon:  < MdPeopleAlt />
},
{
  id: "settings",
  title: "SETTINGS",
  href: "/settings",
  icon:  <MdToggleOn />
}
];