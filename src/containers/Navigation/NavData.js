import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GrIcons from 'react-icons/gr';

export const NavData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Master Setup',
        path: '/master',
        icon: <IoIcons.IoMdContract />,
        cName: 'nav-text'
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Store',
        path: '/store',
        icon: <FaIcons.FaStore />,
        cName: 'nav-text'
    },
    {
        title: 'Production',
        path: '/production',
        icon: <FaIcons.FaProjectDiagram />,
        cName: 'nav-text'
    },
    {
        title: 'Reports',
        path: '/reports',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
]