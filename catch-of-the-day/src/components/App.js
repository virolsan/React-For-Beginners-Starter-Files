import React from "react";
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const {params} = this.props.match;
        // first reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        //console.log('Loading existing order: ' + localStorageRef);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    componentDidUpdate() {
        //console.log('Updating order: ' + JSON.stringify(this.state.order));
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addFish = (fish) => {
        // 1. take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. add our new fish to that fishes object
        fishes[`fish${Date.now()}`] = fish;
        // 3. set the new fishes object to state
        this.setState({fishes});
    };
    updateFish = (key, updatedFish) => {
        // 1. take a copy of the current state
        const fishes = {...this.state.fishes};
        // 2. update that state
        fishes[key] = updatedFish;
        // 3. set that to state
        this.setState({fishes});

    }
    addToOrder = (key) => {
        // 1. take a copy of state
        const order = {...this.state.order};
        // 2. either add to order or updated amount
        order[key] = order[key] + 1 || 1;
        // 3. update state object
        this.setState({order});
    }
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
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
                                              details={this.state.fishes[key]}/>)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} updateFish={this.updateFish}
                           loadSampleFishes={this.loadSampleFishes}
                           fishes={this.state.fishes}
                />
            </div>
        );
    }
}

export default App;