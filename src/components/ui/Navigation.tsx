import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationMenu from "./AuthenticationMenu";

const pages = [
  {
    id: 1,
    label: "Admin",
    link: "/",
  },
  {
    id: 2,
    label: "Shop",
    link: "/shop",
  },
  {
    id: 3,
    label: "Vacations",
    link: "/vacations",
  },
  {
    id: 4,
    label: "Clock",
    link: "/clock",
  },
  {
    id: 5,
    label: "Random City",
    link: "/random-city",
  },
  {
    id: 6,
    label: "Guess Game",
    link: "/guess-game",
  },
  {
    id: 7,
    label: "Form Validation",
    link: "/form",
  },
  {
    id: 8,
    label: "Pokemons",
    link: "/pokemons",
  },
  {
    id: 9,
    label: "Testing",
    link: "/testing",
  },
  {
    id: 10,
    label: "Slider",
    link: "/slider",
  },
  {
    id: 11,
    label: "Search Synonyms",
    link: "/search-synonyms",
  },
  {
    id: 12,
    label: "Breaking Bad",
    link: "/breaking-bad",
  },
  {
    id: 13,
    label: "Guess Color",
    link: "/guess-color",
  },
  {
    id: 14,
    label: "Traffic Light",
    link: "/traffic-light",
  },
  {
    id: 15,
    label: "Guack",
    link: "/guack",
  },
  {
    id: 16,
    label: "Table3D",
    link: "/table3D",
  },
  {
    id: 17,
    label: "Tic Tac Toe",
    link: "/tictactoe",
  },
  {
    id: 18,
    label: "Context API",
    link: "/contextapi",
  },
  {
    id: 19,
    label: "Redux",
    link: "/redux",
  },
];

interface Props {
  lightMode: React.MouseEventHandler<SVGSVGElement>;
  darkMode: React.MouseEventHandler<SVGSVGElement>;
}

const Navigation = ({ lightMode, darkMode }: Props) => {
  // const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = useState<any>(1);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = (id: any) => {
    pages.map((page) => {
      if (id === page.id) {
        return;
      } else {
        setActivePage(id);
      }
    });
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link to={page.link}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.link} key={page.label}>
                <Button
                  onClick={() => handleCloseNavMenu(page.id)}
                  className={
                    activePage === page.id
                      ? "navbar__link-active"
                      : "navbar__link"
                  }
                  sx={{
                    my: 2,

                    display: "block",
                  }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
            <div className="navbar__colorThemeIcons">
              <LightModeIcon onClick={lightMode} className="sun" />
              <DarkModeIcon onClick={darkMode} className="moon" />
            </div>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <AuthenticationMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;
