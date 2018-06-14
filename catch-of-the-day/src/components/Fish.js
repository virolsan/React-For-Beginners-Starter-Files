import React from "react";
import PropTypes from "prop-types";
import {formatPrice} from "../helpers";

class Fish extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            status: PropTypes.oneOf(['available', 'unavailable']),
            desc: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        }),
        index: PropTypes.string.isRequired,
        addToOrder: PropTypes.func
    };

    render() {
        const {image, name, price, desc, status} = this.props.details;
        const isAvailable = status === 'available';
        return (
            <li className="menu-fish">
                <img src={image} alt={name}/>
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>
                    {isAvailable ? "Add To Order" : "Sold Out!"}
                </button>
            </li>
        );
    }
}

export default Fish;