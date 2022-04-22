import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import styles from './Footer.module.css'
import clsx from "clsx";

const Copyright= () => {
    return (
      <div className={clsx(styles.engfont, styles.FontSize, styles.korfont, styles.layout)} color="text.secondary">
        Developed and Designed by 15.5Do Team / Copyright © 2022
        <p className={styles.info}>회사소개 | 쇼핑가이드 | 개인정보보호정책 | 이용약관</p> 
      </div>
    );
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: 2,
        display: "flex",
        justifyContent: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;