import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  Cart,
  BuyingForm,
  Admin,
  addProduct,
  addCategory,
  Orders,
  Homepage,
  adminEditProduct
} from './components'
import Categories from './components/categories'
import {me} from './store'
import Stripe from './components/stripe'
import {fetchCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isLoggedInAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/stripe" component={Stripe} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/products" component={AllProducts} />

        <Route path="/BuyingForm" component={BuyingForm} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route exact path="/category/:categoryName" component={Categories} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/BuyingForm" component={BuyingForm} />
            <Route exact path="/" component={AllProducts} />
            <Route
              exact
              path="/category/:categoryName"
              component={Categories}
            />
          </Switch>
        )}

        {isLoggedInAdmin && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/admin/home" component={Admin} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/BuyingForm" component={BuyingForm} />
            <Route exact path="/" component={AllProducts} />
            <Route
              exact
              path="/category/:categoryName"
              component={Categories}
            />
            <Route exact path="/admin/addproduct" component={addProduct} />
            <Route exact path="/admin/addcategory" component={addCategory} />
            <Route exact path="/admin/orders" component={Orders} />
            <Route
              exact
              path="/admin/editProduct/:id"
              component={adminEditProduct}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}

        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id && !state.user.admin,
    isLoggedInAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggedInAdmin: PropTypes.bool.isRequired
}
