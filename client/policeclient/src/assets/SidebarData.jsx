import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ScreenSearchDesktopRoundedIcon from '@mui/icons-material/ScreenSearchDesktopRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import RadarIcon from '@mui/icons-material/Radar';

export const SidebarData = [
    {
        id: 1,
        title: "Home",
        icon: <HomeRoundedIcon />,
        link: "/"
    },
    {
        id: 2,
        title: "Locate",
        icon: <PlaceRoundedIcon />,
        link: "/locate"
    },
    {
        id: 3,
        title: "Video Analysis",
        icon: <ScreenSearchDesktopRoundedIcon />,
        link: "/analyse"
    },
    {
        id: 4,
        title: "Dashboard",
        icon: <SpaceDashboardRoundedIcon />,
        link: "/dashboard"
    },
    {
        id: 5,
        title: "Nearby Camera",
        icon: <RadarIcon />,
        link: "/nearby"
    },
    {
        id: 6,
        title: "Activity",
        icon: <TextSnippetRoundedIcon />,
        link: "/activity"
    },
    {
        id: 7,
        title: "Settings",
        icon: <SettingsRoundedIcon />,
        link: "/settings"
    }
];
