import gql from 'graphql-tag';

export const fetchAllPizzasQuery = () => ({
  query: gql`
  query {
    pizzaSizes {
      name
      basePrice
      maxToppings
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
    }
  }`,
});

export const fetchPizzaByName = name => ({
  query: gql`
  query($name: PizzaSizes) {
    pizzaSizeByName(name: $name) {
      name
      basePrice
      maxToppings
      toppings {
        pizzaSize {
          name
          basePrice
          maxToppings
        }
        topping {
          name
          price
        }
        defaultSelected
      }
    }
  }`,
  variables: {
    name,
  },
});
