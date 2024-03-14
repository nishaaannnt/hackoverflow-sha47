import React from 'react'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import InfoIcon from '@mui/icons-material/Info';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeRoundedIcon />,
        link: "/"
    },
    {
        title: "Dashboard",
        icon: <SpaceDashboardRoundedIcon />,
        link: "/dashboard"
    },
    {
        title: "Add Camera",
        icon: <PlaylistAddRoundedIcon />,
        link: "/addCamera"
    },
    {
        title: "Activity",
        icon: <TextSnippetRoundedIcon />,
        link: "/activity"
    },
    {
        title: "Settings",
        icon: <SettingsRoundedIcon />,
        link: "/settings"
    },
    {
        title: "About",
        icon: <InfoIcon/>,
        link: "/about"
    },
]
