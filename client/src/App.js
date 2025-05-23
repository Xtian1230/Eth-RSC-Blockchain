import React, { Component } from "react";
import SupplyChainContract from "./contracts/SupplyChain.json";
import { Router, Switch, Route } from "react-router-dom";
import { RoleDataContextProvider } from "./context/RoleDataContext";
// import history from "./history";
import { createBrowserHistory } from "history";
import getWeb3 from "./getWeb3";

import SeedProvider from "./pages/Seed Provider/SeedProvider";
import ViewSeed from "./pages/Seed Provider/ViewSeeds";
import ShipSeed from "./pages/Seed Provider/SeedShipment";

import Miller from "./pages/Miller/miller";
import BuyProduct from "./pages/Miller/BuyProduct";
import ReceiveProduct from "./pages/Miller/ReceiveProduct";
import ShipProduct from "./pages/Miller/ShipProduct";
import AllProduct from "./pages/Miller/AllProduct";

import Consumer from "./pages/Consumer/Buyconsumer";
import ReceiveConsumer from "./pages/Consumer/RecieveConsumer";
import AllReceivedConsumer from "./pages/Consumer/AllReceivedConsumer";

import Manufacture from "./pages/Manufacturer/Manufacture";
import BuySeeds from "./pages/Manufacturer/BuySeeds";
import ReceiveSeed from "./pages/Manufacturer/ReceiveSeed";
import AllManufacture from "./pages/Manufacturer/AllManufacture";
import ShipManufacture from "./pages/Manufacturer/ShipManufacture";

import "./App.css";
import ReceiveThirdParty from "./pages/ThirdParty/ReceiveThirdParty";
import PurchaseCustomer from "./pages/Customer/PurchaseCustomer";
import ShipThirdParty from "./pages/ThirdParty/ShipThirdParty";
import ReceiveDeliveryHub from "./pages/DeliveryHub/ReceiveDeliveryHub";
import ShipDeliveryHub from "./pages/DeliveryHub/ShipDeliveryHub";
import ReceiveCustomer from "./pages/Customer/ReceiveCustomer";
import ReceivedByCustomer from "./pages/Customer/ReceivedByCustomer";
import PurchaseThirdParty from "./pages/ThirdParty/PurshaseThirdParty";
import RoleAdmin from "./pages/RoleAdmin";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/Theme";

import Explorer from "./pages/Explorer";
import Home from "./pages/Home";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    mRole: null,
    tpRole: null,
    dhRole: null,
    cRole: null,
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      const mRole = localStorage.getItem("mRole");
      const tpRole = localStorage.getItem("tpRole");
      const dhRole = localStorage.getItem("dhRole");
      const cRole = localStorage.getItem("cRole");

      this.setState(
        {
          web3,
          accounts,
          contract: instance,
          mRole: mRole,
          tpRole: tpRole,
          dhRole: dhRole,
          cRole: cRole,
        },
        this.runExample
      );
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract } = this.state;
    console.log(contract);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <RoleDataContextProvider
            mRole={this.state.mRole}
            tpRole={this.state.tpRole}
            dhRole={this.state.dhRole}
            cRole={this.state.cRole}
          >
            <Router history={createBrowserHistory()}>
              <Switch>
                <Route exact path="/roleAdmin">
                  <RoleAdmin
                    accounts={this.state.accounts}
                    supplyChainContract={this.state.contract}
                  />
                </Route>
                <Route exact path="/explorer">
                  <Explorer
                    accounts={this.state.accounts}
                    supplyChainContract={this.state.contract}
                    web3={this.state.web3}
                  />
                </Route>
                <Route exact path="/">
                  <Home
                    accounts={this.state.accounts}
                    supplyChainContract={this.state.contract}
                  />
                </Route>

                <Route exact path="/Seed Provider/SeedProvider">
                  {this.state.mRole !== "" ? (
                    <SeedProvider
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Seed Provider/ViewSeeds">
                  {this.state.mRole !== "" ? (
                    <ViewSeed
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Seed Provider/SeedShipment">
                  {this.state.mRole !== "" ? (
                    <ShipSeed
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>

                <Route exact path="/manufacturer/manufacture">
                  {this.state.mRole !== "" ? (
                    <Manufacture
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Miller/miller">
                  {this.state.mRole !== "" ? (
                    <Miller
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Miller/BuyProduct">
                  {this.state.mRole !== "" ? (
                    <BuyProduct
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Miller/ReceiveProduct">
                  {this.state.mRole !== "" ? (
                    <ReceiveProduct
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Miller/ShipProduct">
                  {this.state.mRole !== "" ? (
                    <ShipProduct
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Miller/AllProduct">
                  {this.state.mRole !== "" ? (
                    <AllProduct
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/manufacturer/allManufacture">
                  {this.state.mRole !== "" ? (
                    <AllManufacture
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/manufacturer/BuySeeds">
                  {this.state.mRole !== "" ? (
                    <BuySeeds
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/manufacturer/ReceiveSeed">
                  {this.state.mRole !== "" ? (
                    <ReceiveSeed
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/manufacturer/ship">
                  {this.state.mRole !== "" ? (
                    <ShipManufacture
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/ThirdParty/allProducts">
                  {this.state.tpRole !== "" ? (
                    <PurchaseThirdParty
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Third Party Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/ThirdParty/receive">
                  {this.state.tpRole !== "" ? (
                    <ReceiveThirdParty
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Third Party Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Customer/buy">
                  {this.state.cRole !== "" ? (
                    <PurchaseCustomer
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Customer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/ThirdParty/ship">
                  {this.state.tpRole !== "" ? (
                    <ShipThirdParty
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Third Party Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/DeliveryHub/receive">
                  {this.state.dhRole !== "" ? (
                    <ReceiveDeliveryHub
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Delivery Hub Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/DeliveryHub/ship">
                  {this.state.dhRole !== "" ? (
                    <ShipDeliveryHub
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Delivery Hub Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Customer/receive">
                  {this.state.cRole !== "" ? (
                    <ReceiveCustomer
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Customer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Customer/allReceived">
                  {this.state.cRole !== "" ? (
                    <ReceivedByCustomer
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Customer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Consumer/Buyconsumer">
                  {this.state.cRole !== "" ? (
                    <Consumer
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Customer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Consumer/ReceiveConsumer">
                  {this.state.cRole !== "" ? (
                    <ReceiveConsumer
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Customer Role at /RoleAdmin</h1>
                  )}
                </Route>
                <Route exact path="/Consumer/AllReceivedConsumer">
                  {this.state.cRole !== "" ? (
                    <AllReceivedConsumer
                      accounts={this.state.accounts}
                      supplyChainContract={this.state.contract}
                    />
                  ) : (
                    <h1>Assign Customer Role at /RoleAdmin</h1>
                  )}
                </Route>
              </Switch>
            </Router>
          </RoleDataContextProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
