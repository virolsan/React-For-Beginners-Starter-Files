import React from "react";
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    addFish = (fish) => {
        // 1. take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. add our new fish to that fishes object
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to state
        this.setState({ fishes });
    };
    addToOrder = (key) => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. either add to order or updated amount
        order[key] = order[key] + 1 || 1;
        // 3. update state object
        this.setState({ order });
    }
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };
    render() {
        return (
            <div className={"catch-of-the-day"}>
                <div className="menu">
                    <Header tagline={"Fresh Seafood Market"}/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes)
                            .map(key => <Fish addToOrder={this.addToOrder}
                                              key={key} index={key}
                                              details={this.state.fishes[key]} />)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        );
    }
}

export default App;