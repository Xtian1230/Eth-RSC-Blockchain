import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { useStyles } from "../../components/Styles";
import { useRole } from "../../context/RoleDataContext";

export default function SeedProvider(props) {
  const supplyChainContract = props.supplyChainContract;
  const classes = useStyles();
  const { roles } = useRole();
  const [loading, setLoading] = React.useState(false);
  const [fvalid, setFvalid] = React.useState(false);

  const navItems = [
    ["Add Seed", "/Seed Provider/SeedProvider"],
    ["View Seeds", "/Seed Provider/ViewSeeds"],
    ["Seed Shipments", "/Seed Provider/SeedShipment"],
  ];

  const [seedForm, setSeedForm] = React.useState({
    providerName: "",
    providerLocation: "",
    providerLatitude: "",
    providerLongitude: "",
    seedType: "",
    seedCode: 0,
    seedPrice: 0,
    seedDescription: "",
  });

  const handleChange = (e) => {
    setSeedForm({
      ...seedForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const {
      providerName,
      providerLocation,
      providerLatitude,
      providerLongitude,
      seedType,
      seedCode,
      seedPrice,
      seedDescription,
    } = seedForm;

    if (
      providerName &&
      providerLocation &&
      providerLatitude &&
      providerLongitude &&
      seedType &&
      seedCode &&
      seedPrice &&
      seedDescription
    ) {
      setFvalid(false);

      await supplyChainContract.methods
        .addSeed(
          providerName,
          providerLocation,
          providerLatitude,
          providerLongitude,
          seedType,
          parseInt(seedCode),
          parseInt(seedPrice),
          seedDescription
        )
        .send({ from: roles.seedProvider, gas: 999999 })
        .on("transactionHash", (hash) => {
          handleSetTxhash(hash);
        });

      setSeedForm({
        providerName: "",
        providerLocation: "",
        providerLatitude: "",
        providerLongitude: "",
        seedType: "",
        seedCode: 0,
        seedPrice: 0,
        seedDescription: "",
      });
    } else {
      setFvalid(true);
    }

    setLoading(false);
  };

  const handleSetTxhash = async (hash) => {
    await supplyChainContract.methods
      .setTransactionHashOnSeedAdd(hash)
      .send({ from: roles.seedProvider, gas: 900000 });
  };

  return (
    <Navbar pageTitle="Seed Provider" navItems={navItems}>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.FormWrap}>
          <h1 className={classes.pageHeading}>Add Seed</h1>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                name="providerName"
                label="Provider Name"
                variant="outlined"
                value={seedForm.providerName}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="providerLocation"
                label="Provider Location"
                variant="outlined"
                value={seedForm.providerLocation}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="providerLatitude"
                label="Latitude"
                variant="outlined"
                value={seedForm.providerLatitude}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="providerLongitude"
                label="Longitude"
                variant="outlined"
                value={seedForm.providerLongitude}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="seedType"
                label="Seed Type"
                variant="outlined"
                value={seedForm.seedType}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="seedCode"
                label="Seed Code"
                variant="outlined"
                value={seedForm.seedCode}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                name="seedPrice"
                label="Seed Price"
                variant="outlined"
                value={seedForm.seedPrice}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="seedDescription"
                label="Seed Description"
                variant="outlined"
                value={seedForm.seedDescription}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <br />
          {fvalid && (
            <p>
              <b style={{ color: "red" }}>Please enter all data</b>
            </p>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
          <br />
          <br />
        </div>
      )}
    </Navbar>
  );
}
