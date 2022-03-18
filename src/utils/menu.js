import { MdDashboard, MdArrowUpward, MdOutlineSupervisorAccount } from 'react-icons/md';

export const teamManagerMenu =[
  { id: "dashboard",
    title: "DASHBOARD",
    href: "/dashboard",
    icon: <MdDashboard/>
},
{ id: "team",
    title: "TEAMS",
    href: "/team-manager",
    icon:  <MdOutlineSupervisorAccount/>

},
{ id: "guideline",
    title: "GUIDELINES",
    href: "/team-manager",
    icon:  <MdArrowUpward />
},
{ id: "support",
    title: "SUPPORT",
    href: "/team-manager",
    icon:  <MdArrowUpward />

},
]