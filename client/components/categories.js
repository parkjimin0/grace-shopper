import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/categories'
import {Link, withRouter} from 'react-router-dom'

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gender: this.props.match.params.categoryName
    }
  }

  componentDidMount() {
    this.props.fetchCategory(this.state.gender)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const nextGender = this.props.match.params.categoryName

    if (nextGender !== this.state.gender) {
      this.setState(
        {
          gender: nextGender
        },
        this.props.fetchCategory(nextGender)
      )
    }
  }

  //do the onClick invoking a function that invokes a thunk creator

  render() {
    const gender = this.props.match.params.categoryName
    const genderCategory = this.props.genderCategory
    console.log('genderCatgory', genderCategory)
    if (!genderCategory.length) {
      return <h2>No Products Yet</h2>
    }
    return (
      <div>
        <h2>{gender}</h2>
        {genderCategory.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={'/' + product.image} />

                {product.name}
              </Link>
              {product.price}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    genderCategory: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: gender => {
      dispatch(fetchCategory(gender))
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
)
