import React from "react";
import Navbar from "../../components/Navbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { useStyles } from "../../components/Styles";
import Loader from "../../components/Loader";
import clsx from "clsx";

export default function ViewSeeds(props) {
  const supplyChainContract = props.supplyChainContract;
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const [allSeeds, setAllSeeds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const navItem = [
    ["Add Seed", "/Seed Provider/SeedProvider"],
    ["View Seeds", "/Seed Provider/ViewSeeds"],
    ["Seed Shipments", "/Seed Provider/SeedShipment"],
  ];

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const seedCount = await supplyChainContract.methods
          .seedCounter()
          .call();
        setCount(seedCount);

        const seedArray = [];
        for (let i = 1; i <= seedCount; i++) {
          const seed = await supplyChainContract.methods.seeds(i).call();
          seedArray.push(seed);
        }

        setAllSeeds(seedArray);
      } catch (error) {
        console.error("Failed to fetch seeds:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [supplyChainContract]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.pageWrap}>
      <Navbar pageTitle="Seed Provider" navItems={navItem}>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h1 className={classes.pageHeading}>All Seeds</h1>
            <h3 className={classes.tableCount}>Total: {allSeeds.length}</h3>
            <Paper className={classes.TableRoot}>
              <TableContainer className={classes.TableContainer}>
                <Table stickyHeader aria-label="seeds table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.TableHead} align="center">
                        Seed ID
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Seed Name
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Seed Type
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Origin
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Harvest Date
                      </TableCell>
                      <TableCell
                        className={clsx(classes.TableHead, classes.AddressCell)}
                        align="center"
                      >
                        Owner
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allSeeds.length > 0 &&
                      allSeeds
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((seed, index) => {
                          const harvestDate = new Date(
                            parseInt(seed.harvestDate) * 1000
                          );
                          return (
                            <TableRow hover key={index}>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                              >
                                {seed.name}
                              </TableCell>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                              >
                                {seed.seedType}
                              </TableCell>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                              >
                                {seed.origin}
                              </TableCell>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                              >
                                {harvestDate.toDateString()}
                              </TableCell>
                              <TableCell
                                className={clsx(
                                  classes.TableCell,
                                  classes.AddressCell
                                )}
                                align="center"
                              >
                                {seed.owner}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={allSeeds.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}
      </Navbar>
    </div>
  );
}
