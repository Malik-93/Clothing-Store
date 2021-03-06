import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getCart,
  checkPromoCode,
  removePromoCode,
  getShippingOptions,
  setShipping,
} from '../../actions/cart';
import { removeItem } from '../../actions/cartItem';
import Cart from './Cart';
import CartHeader from './CartHeader';
import Shipping from './Shipping';
import DiscountCode from './DiscountCode';
import CartFooter from './CartFooter';

// function to calculate total price
// arr.reduce() wouldn't work here for some reason
const getTotal = arr => {
  if (arr.length > 1) {
    let total = 0;

    arr.forEach(item => {
      const price = item.price;
      const quantity = item.quantity;
      total += price * quantity;
    });
    return total;
  } else if (arr.length === 1) {
    return arr[0].price * arr[0].quantity;
  } else {
    return 0;
  }
};

export class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      cart: [],
      shippingOptions: [{ name: '' }],
      shippingOption: {},
      shippingOptionName: '',
      discount: {
        codePhrase: null,
        amount: 1,
        validCode: false,
      },
    };
  }
  handleRemove = item => {
    const userID = this.props.userID;
    const itemObj = {
      cartItemID: item,
      userID,
    };
    this.props.removeItem(itemObj);
  };
  // shipping
  handleSelectShipping = (e, i, val) => {
    // pull index from selectbox, pass object found to cartfooter
    // state.shippingOptionName saves the val(index) so
    // we can return that to teh select box
    // to display the current option
    const options = this.props.cartState.shippingOptions;
    const opt = { ...options[val], index: val };
    this.setState(() => ({
      shippingOptionName: val,
    }));
    // dispatch option to redux
    this.props.setShipping(opt);
  };
  // discount
  handleDiscount = codePhrase => {
    const userID = this.props.userID;
    this.props.checkPromoCode(codePhrase, userID);
  };
  handleRemoveDiscount = () => {
    const userID = this.props.userID;
    this.setState(() => ({
      discount: {
        codePhrase: null,
        amount: 1,
        validCode: false,
      },
    }));
    this.props.removePromoCode(userID);
  };
  componentDidMount() {
    this.setState(() => ({
      cart: this.props.cart,
      // total: getTotal(cart),
      // discount,
      shippingOptions: this.props.cartState.shippingOptions,
      shippingOption: this.props.cartState.shippingOption
    }));
    this.props.getCart(this.props.userID);
    // this.props.getShippingOptions();
  }
  // componentWillReceiveProps(nextProps) {
  //   const cart = nextProps.cart.contents;
  //   // const discount = nextProps.cart.discount;
  //   // const shippingOptions = nextProps.cart.shippingOptions;
  //   // const shippingOption = nextProps.cart.shippingOption;
  //   if (cart !== undefined) {
  //     this.setState(() => ({
  //       cart,
  //       // total: getTotal(cart),
  //       // discount,
  //       shippingOptions: this.props.cart.shippingOptions,
  //       shippingOption: this.props.cart.shippingOption
  //     }));
  //   }
  // }

  render() {
    console.log(this.state)
    return (
      <div>
        <CartHeader cart={this.props.cart} total={getTotal(this.props.cart)} />
        <Cart cart={{ loading: false, contents: this.props.cart }} handleRemove={this.handleRemove} />
        <Shipping
          handleSelectShipping={this.handleSelectShipping}
          currentOpt={this.state.shippingOption}
          options={this.state.shippingOptions}
        />
        <DiscountCode
          handleDiscount={this.handleDiscount}
          info={this.state.discount}
          handleRemove={this.handleRemoveDiscount}
        />
        <CartFooter
          total={getTotal(this.props.cart)}
          discount={this.state.discount}
          shipping={this.state.shippingOption}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartState: state.cart,
  cart: state.cart.contents ? state.cart.contents : [],
  userID: state.auth.user ? state.auth.user.sub._id : "",
});

const mapDispatchToProps = dispatch => ({
  getCart: token => dispatch(getCart(token)),
  removeItem: item => dispatch(removeItem(item)),
  checkPromoCode: (codePhrase, userID) =>
    dispatch(checkPromoCode(codePhrase, userID)),
  removePromoCode: userID => dispatch(removePromoCode(userID)),
  getShippingOptions: () => dispatch(getShippingOptions()),
  setShipping: option => dispatch(setShipping(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
