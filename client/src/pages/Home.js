import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Box, Typography } from "@material-ui/core";
import Navbar from "../components/Navbar";
import { useStyles } from "../components/Styles";

export default function Home() {
  const classes = useStyles();
  const navItems = [];

  return (
    <Box
      className={classes.pageWrap}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Blurred Background */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/RiceField.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(10px)", // Adjust blur level
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <Box style={{ position: "relative", zIndex: 1 }}>
        <Navbar navItems={navItems} />

        <Grid
          container
          spacing={3}
          style={{
            height: "90vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              minHeight: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <img
              alt="."
              src="/RSC3.png"
              style={{ width: "70%", height: "auto", marginLeft: 500 }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              className={classes.HomeCardWrap}
              style={{
                padding: 32,
                borderRadius: 16,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                maxWidth: 400,
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                className={classes.pageHeading}
                gutterBottom
              >
                Assign Roles
              </Typography>
              <div
                style={{
                  width: "100%",
                  maxWidth: 300,
                  margin: "0 auto",
                }}
              >
                <CustomLinkButton to="/roleAdmin">Assign</CustomLinkButton>
              </div>

              <Typography
                variant="h4"
                className={classes.pageHeading}
                style={{ marginTop: 24 }}
                gutterBottom
              >
                Visit As
              </Typography>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "100%",
                  maxWidth: 300,
                  margin: "0 auto",
                }}
              >
                <CustomLinkButton to="/Seed Provider/SeedProvider">
                  Seed Provider
                </CustomLinkButton>
                <CustomLinkButton to="/manufacturer/manufacture">
                  Producer
                </CustomLinkButton>
                <CustomLinkButton to="/Miller/miller">Miller</CustomLinkButton>
                <CustomLinkButton to="/ThirdParty/allProducts">
                  Distributor
                </CustomLinkButton>
                <CustomLinkButton to="/DeliveryHub/receive">
                  Delivery Hub
                </CustomLinkButton>
                <CustomLinkButton to="/Customer/buy">Retailer</CustomLinkButton>
                <CustomLinkButton to="/Consumer/consumer">
                  Consumer
                </CustomLinkButton>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const CustomLinkButton = ({ to, children }) => (
  <Link to={to} style={{ textDecoration: "none", width: "100%" }}>
    <Button
      variant="contained"
      size="large"
      fullWidth
      style={{
        backgroundColor: "#4caf50", // Green background
        color: "#000", // Black text
        fontWeight: "bold", // Bold text
      }}
    >
      {children}
    </Button>
  </Link>
);
