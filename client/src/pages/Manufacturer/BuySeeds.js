import React, { useEffect, useState } from "react";
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
import Loader from "../../components/Loader";

export default function BuySeeds(props) {
  const supplyChainContract = props.supplyChainContract;
  const { roles } = useRole();
  const classes = useStyles();

  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navItem = [
    ["Buy Seeds", "/producer/buySeeds"],
    ["Ship Product", "/producer/ship"],
    ["All Products", "/producer/allProducts"],
    ["Receive Seeds", "/manufacturer/ReceiveSeed"],
    ["Buy Seeds", "/manufacturer/BuySeeds"],
  ];

  useEffect(() => {
    const fetchAvailableSeeds = async () => {
      setLoading(true);
      const total = await supplyChainContract.methods.fetchSeedCount().call();
      const result = [];

      for (let i = 1; i <= total; i++) {
        const state = await supplyChainContract.methods
          .fetchSeedState(i)
          .call();
        if (state === "0") {
          const seedDetails = await supplyChainContract.methods
            .fetchSeedDetails(i)
            .call();
          result.push({ id: i, ...seedDetails });
        }
      }

      setSeeds(result);
      setLoading(false);
    };

    fetchAvailableSeeds();
  }, []);

  const handleBuySeed = async (id, price) => {
    try {
      await supplyChainContract.methods.buySeed(id).send({
        from: roles.manufacturer,
        value: price,
        gas: 500000,
      });

      setAlertText(`Seed ${id} purchased successfully.`);
    } catch (error) {
      setAlertText("Transaction failed. You may not have permission.");
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.pageWrap}>
      <Navbar pageTitle={"Buy Seeds"} navItems={navItem}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className={classes.pageHeading}>Available Seeds</h1>
            <p style={{ color: "red" }}>{alertText}</p>
            <Paper className={classes.TableRoot}>
              <TableContainer className={classes.TableContainer}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.TableHead}>ID</TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Seed Name
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Provider
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Price (wei)
                      </TableCell>
                      <TableCell className={classes.TableHead} align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {seeds
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((seed) => (
                        <TableRow hover key={seed.id}>
                          <TableCell className={classes.TableCell}>
                            {seed.id}
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
                            {seed.owner}
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            align="center"
                          >
                            {seed.price}
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            align="center"
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleBuySeed(seed.id, seed.price)}
                            >
                              Buy
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={seeds.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </>
        )}
      </Navbar>
    </div>
  );
}
