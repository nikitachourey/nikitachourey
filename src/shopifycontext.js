import React, { Component } from 'react'
import Client from 'shopify-buy';
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';


const client = Client.buildClient({
  domain: 's3bg.myshopify.com',
  storefrontAccessToken: '7b036ffd844a4ddefa4e99c653c27bf3'
});



const httpLink = createHttpLink({ uri: 'http://s3bg.myshopify.com/api/graphql' })

const middlewareLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': '7b036ffd844a4ddefa4e99c653c27bf3',

  }
}))

const apolloClient = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const shopContext = React.createContext();

export class ShopifyProvider extends Component {

  state = {
    products: [],
    product: {},
    collections: [],
    images: [],
    selectedProducts: [],
    cart: [],
    filteredProducts: [],
    shippingMethod: {},
    checkout :{},
    shippingRateHandle:{},
    payment:{}

  };




  fetchProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
    // console.log(products);

    products.map(product => {
      //console.log(product.images)
    })
  }


  fetchCollections = async () => {
    const collections = await client.collection.fetchAll();
    //console.log(collections)
    collections.map(collection => {
      // console.log(collection.title);
    });
    this.setState({ collections: collections })
  };


  fetchCollectionByHandle = async (handle) => {
    const selectedCatalogProduct = await client.collection.fetchByHandle(handle);
    this.setState({ selectedProducts: selectedCatalogProduct.products });
  }


  fetchProductByHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ images: product.images });
    this.setState({ product: product });
  };

  createCart = async () => {
    const cart = await client.checkout.create();
    localStorage.setItem("cart_id", cart.id);
    this.setState({ cart: cart });
  }


  fetchCart = async (cartId) => {
    client.checkout.fetch(localStorage.getItem("cart_id")).then(cart => {
      this.setState({ cart: cart });
    });
  }

  removeProduct = async (checkoutId, lineitemsIds) => {
    const cart = await client.checkout.removeLineItems(checkoutId, lineitemsIds);
    this.setState({ cart: cart });
  }



  addItemsToCart = async (variant, quantity) => {
    const items = {
      variantId: variant.id,
      quantity: quantity
    }
    const cart = await client.checkout.addLineItems(this.state.cart.id, items);
    this.setState({ cart: cart });

  }
  updateQuantity = async (checkoutId, id, quantity) => {
    const cart = await client.checkout.updateLineItems(checkoutId, [{ id: id, quantity: quantity }])
    this.setState({ cart: cart });
  }


  updateShippingAddress = async (cartId, shippingAddress) => {
    const cart = await client.checkout.updateShippingAddress(cartId, shippingAddress)
    this.setState({ cart: cart })
    console.log(cart);
  }





  addDiscountCoupon = async (checkoutId, discountCode) => {
    const cart = await client.checkout.addDiscount(checkoutId, discountCode)
    this.setstate({ cart: cart });
  }

  removeDiscountCoupon = async (checkoutId, discountCode) => {
    const cart = await client.checkout.removeDiscount(checkoutId, discountCode)
    this.setstate({ cart: cart });
  }

  searchProducts = (searchString) => {
    const filterProducts = this.state.products.filter(x => x.title.toLowerCase().includes(searchString.toLowerCase()));
    this.setState({ filteredProducts: filterProducts })
  }


  // getshippingMethod = async query => {

  //   const myQuery = client.graphQLClient.query(query);

  //   const { model, data } = await client.graphQLClient.send(myQuery);
  //   this.setState({ model });
  //   this.setState({ data });
  // };


  //  getApolloQueryResponse = async query => {
  //   const res = await apolloClient.query({ query });
  //   this.setState({ res });

  // };



  componentDidMount() {
    if (localStorage.cart_id) {
      console.log("Dont Create")
      this.fetchCart(localStorage.cart_id);
    } else {
      this.createCart();
      console.log("Cart Created")
    }
    this.getShippingModes();

  }

  testGraphQL = async () => {



    const productsQuery = client.graphQLClient.query((root) => {
      root.addConnection('products', { args: { first: 10 } }, (product) => {
        product.add('title');

      });
    });
    const { data } = await client.graphQLClient.send(productsQuery);
    console.log("*******************");
    console.log(data);
    console.log("*******************");
    console.log("*******************");

    const collectionQuery = client.graphQLClient.query((root) => {
      root.addConnection('collections', { args: { first: 10 } }, (product) => {
        product.add('id');

      });
    });
    const res = await client.graphQLClient.send(collectionQuery);
    console.log("*******************");
    console.log(res);
    console.log("*******************");

    const checkoutQuery = client.graphQLClient.query((root) => {
      root.add('node', { args: { id: localStorage.cart_id } }, (node) => {

        node.addInlineFragmentOn('Checkout', (checkout) => {
          checkout.add('totalTax');
          checkout.add('taxesIncluded');
          checkout.add('taxExempt');
          checkout.add('subtotalPrice');
          checkout.add('totalPrice');
          checkout.add('email');
          checkout.add('createdAt');
          checkout.add('webUrl');
          checkout.add('requiresShipping');

        });
      });
    });

    const shopRes = await client.graphQLClient.send(checkoutQuery);
    // this.setstate({shopres});
    console.log("*******************");
    console.log(shopRes);
    console.log("*******************");
  }

  

  getShippingModes = async () => {
    const query = gql`
     query checkout($checkoutid: ID!){

        node(id: $checkoutid) {

          ... on Checkout {

              totalTax

              taxesIncluded

              taxExempt

              subtotalPrice

              totalPrice

              email

              createdAt

              requiresShipping

              availableShippingRates {

                ready

                shippingRates {

                  handle

                  priceV2 {

                    amount

                  }

                  title

                }

              }

          }

      }

    }

  `

    const res = await apolloClient.query({
      query: query, variables: {

        checkoutid: localStorage.cart_id

      }
    });
  
    this.setState({checkout : res.data.node});

    console.log("*******checkoutid*******");

    console.log(res);

    console.log("*******************");



  }


  updateShippingLine = async (shippingHandle) => {
    const mutation = gql`mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
      checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
        checkout {
          id
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
`


const res = await apolloClient.mutate({
  mutation: mutation, variables: {

    checkoutId:  localStorage.cart_id,
    shippingRateHandle: shippingHandle
    
}
});
 console.log(res);
  }

  updatePaymentInfo = async (payment) =>{
     const mutation= gql` mutation checkoutCompleteWithCreditCardV2($checkoutId: ID!, $payment: CreditCardPaymentInputV2!) {
    checkoutCompleteWithCreditCardV2(checkoutId: $checkoutId, payment: $payment) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      payment {
        id 
      }
    }
  }
`


  const res = await apolloClient.mutate({
    mutation: mutation, variables: {
  
      checkoutId:  localStorage.cart_id,
        payment:   payment
    }
  });
  console.log(res);
}



  







 

  render() {
    return (
      <div>
        <shopContext.Provider
          value={{
            ...this.state, fetchAllProducts: this.fetchProducts,
            fetchProductByHandle: this.fetchProductByHandle,
            fetchCollections: this.fetchCollections,
            fetchCollectionByHandle: this.fetchCollectionByHandle,
            addItemsToCart: this.addItemsToCart,
            fetchCart: this.fetchCart,
            removeProduct: this.removeProduct,
            updateQuantity: this.updateQuantity,
            updateShippingAddress: this.updateShippingAddress,
            addDiscountCoupon: this.addDiscountCoupon,
            removeDiscountCoupon: this.removeDiscountCoupon,
            searchProducts: this.searchProducts,
            getShippingModes: this.getShippingModes,
            updateShippingLine: this.updateShippingLine,
            updatePaymentInfo: this.updatePaymentInfo
          }}>
          {this.props.children}
        </shopContext.Provider>
      </div>
    )
  }
}

const Shopconsumer = shopContext.Consumer;

export { Shopconsumer, shopContext };

export default ShopifyProvider;

