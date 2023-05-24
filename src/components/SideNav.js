import { Box, Drawer } from '@mui/material'
import React from 'react'

const drawerWidth = 240;

const SideNav = () => {
  return (
    <Box sx={{ display: 'flex' }}>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
        >
        </Drawer>
    </Box>
  )
}

export default SideNav;