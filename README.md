# Customer basket

The application allows the creation of a virtual shopping store, offering the following features:

- CRUD APIs for store products
- CRUD APIs for store offers
- CRUD APIs for customer baskets
- Calculating the total cost of a customer's basket
- Interactive terminal for running product, offer and basket

## How to run the application

- install NodeJS
- `make deps` - to install the npm dependencies (required for running the linter and the tests)
- `make` - to run the lint and the tests
- `make start` - to start the application

### Example of commands
```
product add 1 Butter 0.8
product add 2 Milk 1.15
product add 3 Bread 1

offer add 1 HalfBread
offer include 1 1 2
offer include 1 3 1
offer discount percentage 1 3 0.5

offer add 2 ForthMilk
offer include 2 2 4
offer discount percentage 2 2 1

basket add 1 1
basket add 2 1
basket add 3 1
basket cost

basket remove 2
basket update 1 2
basket update 3 2
basket cost

basket remove 1
basket remove 3
basket add 2 4
basket cost

basket update 1 2
basket update 2 8
basket update 3 1
basket cost
```
