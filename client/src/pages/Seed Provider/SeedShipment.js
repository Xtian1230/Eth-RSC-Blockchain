import React from "react";
import Navbar from "../../components/Navbar";
import Button from "@material-ui/core/Button";
import { useRole } from "../../context/RoleDataContext";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { useStyles } from "../../components/Styles";
import ProductModal from "../../components/Modal";
import clsx from "clsx";
import Loader from "../../components/Loader";

export default function ShipSeed(props) {
  const supplyChainContract = props.supplyChainContract;
  const { roles } = useRole();
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const [allSeedBatches, setAllSeedBatches] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navItem = [
    ["Add Seed", "/Seed Provider/SeedProvider"],
    ["View Seeds", "/Seed Provider/ViewSeeds"],
    ["Seed Shipments", "/Seed Provider/SeedShipment"],
  ];
  const [alertText, setalertText] = React.useState("");

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const cnt = await supplyChainContract.methods.fetchProductCount().call();
      setCount(cnt);
    })();

    (async () => {
      const arr = [];
      for (let i = 1; i < count; i++) {
        const state = await supplyChainContract.methods
          .fetchProductState(i)
          .call();
        if (state === "1") {
          const part1 = await supplyChainContract.methods
            .fetchProductPart1(i, "seed", 0)
            .call();
          const part2 = await supplyChainContract.methods
            .fetchProductPart2(i, "seed", 0)
            .call();
          const part3 = await supplyChainContract.methods
            .fetchProductPart3(i, "seed", 0)
            .call();
          arr.push([part1, part2, part3]);
        }
      }
      setAllSeedBatches(arr);
      setLoading(false);
    })();
  }, [count]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);
  const handleClose = () => setOpen(false);

  const handleClick = async (batch) => {
    setModalData(batch);
    setOpen(true);
  };

  const handleSetTxhash = async (id, hash) => {
    await supplyChainContract.methods
      .setTransactionHash(id, hash)
      .send({ from: roles.producer, gas: 900000 });
  };

  const handleShipSeed = async (id) => {
    try {
      await supplyChainContract.methods
        .shipSeedBatch(id)
        .send({ from: roles.producer, gas: 1000000 })
        .on("transactionHash", (hash) => {
          handleSetTxhash(id, hash);
        });
      setCount(0);
    } catch {
      setalertText("You are not the owner of the Seed Batch");
    }
  };

  return (
    <div className={classes.pageWrap}>
      <Navbar pageTitle={"Seed Producer"} navItems={navItem}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ProductModal
              prod={modalData}
              open={open}
              handleClose={handleClose}
            />
            <h1 className={classes.pageHeading}>Seed Batches Ready to Ship</h1>
            <h3 className={classes.tableCount}>
              Total: {allSeedBatches.length}
            </h3>

            <p style={{ color: "red" }}>{alertText}</p>

            <Paper className={classes.TableRoot}>
              <TableContainer className={classes.TableContainer}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.TableHead} align="left">
                        Batch ID
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Seed Code
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Producer
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Harvest Date
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Seed Type
                      </TableCell>
                      <TableCell
                        className={clsx(classes.TableHead, classes.AddressCell)}
                        align="center"
                      >
                        Owner
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allSeedBatches.length !== 0 &&
                      allSeedBatches
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((batch) => {
                          const d = new Date(parseInt(batch[1][0] * 1000));
                          return (
                            <TableRow hover key={batch[0][0]}>
                              <TableCell
                                className={classes.TableCell}
                                align="left"
                                onClick={() => handleClick(batch)}
                              >
                                {batch[0][0]}
                              </TableCell>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                                onClick={() => handleClick(batch)}
                              >
                                {batch[1][2]}
                              </TableCell>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                                onClick={() => handleClick(batch)}
                              >
                                {batch[0][4]}
                              </TableCell>
                              <TableCell
                                align="center"
                                onClick={() => handleClick(batch)}
                              >
                                {d.toDateString()} {d.toTimeString()}
                              </TableCell>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                                onClick={() => handleClick(batch)}
                              >
                                {batch[1][1]}
                              </TableCell>
                              <TableCell
                                className={clsx(
                                  classes.TableCell,
                                  classes.AddressCell
                                )}
                                align="center"
                                onClick={() => handleClick(batch)}
                              >
                                {batch[0][2]}
                              </TableCell>
                              <TableCell
                                className={classes.TableCell}
                                align="center"
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleShipSeed(batch[0][0])}
                                >
                                  SHIP
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={allSeedBatches.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </>
        )}
      </Navbar>
    </div>
  );
}
