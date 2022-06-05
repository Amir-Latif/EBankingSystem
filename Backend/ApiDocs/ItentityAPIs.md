- Only the customers are authorized to perform the following APIs (except for registering)
- All request dates are to be sent in the format of string obtained from the `input type=date` using `e.target.value` {"2022-04-06"}
- All response dates can be parsed in JS; for example: `new Date("2022-04-06T17:07:07.994806Z")`
- Whenever `""` is mentioned, use an empty string `""` to get all results without filter

================================================

# Register

## Request

```
post("api/identity/register")
```

### Request Data

userName: string,
email: string (must be validated using input type email in the frontend),
password: string,

## Response

Status Code 200 successful
status code 406: the user is already registered

- After registering, the customer receives an email to verify his mail before loging

=====================================================================

# login

## Request

```
post("api/identity/login")
```

### Request Data

email: string (must be validated using input type email in the frontend),
password: string,
rememberMe: boolean

## Response

Status Code 200 successful
status 403 if user is forbidden or locked or email not confirmed with response body containing the error

=====================================================================

# logout

## Request

```
post("api/identity/logout")
```

### Request Data

none

## Response

# Status Code 200

# change Password

## Request

```
post("api/identity/changePassword")
```

### Request Data

email: string
currentPassword: string
newPassword: string

## Response

# Status Code 200

# Get Product (search)

## Request

```
post("api/product/searchProduct")
```

### Request Data

query: string

## Response

Status Code 200
status 400 if query is empty
404 if no matching products
=====================================================================

# Get products by Category

## Request

```
post("api/product/getCategoryProducts")
```

### Request Data

category: string

## Response

## Response

Array of

```
 {
 productId,
Name,
Description,
category,
brand,
Price,
Color,
Reviews,
orderId (associated with this product),
DateAdded,
StockAvailability,
DateReturned,
ReasonOfReturn,
}
```

Status Code 200
status 400 if category data is not provided
404 if no matching category or no products are listed in the category with a response body
=====================================================================

# Add to Cart

## Request

```
post("api/product/addToCart")
```

### Request Data

productId: string

## Response

Status Code 200
status 404 if productId is incorrect
status 406 if the product is out of stock
=====================================================================

# Remove from Cart

## Request

```
post("api/product/removeFromCart")
```

### Request Data

productId: string

## Response

Status Code 200
status 404 if productId is incorrect
=====================================================================

# Create order or add/remove to/from it or cancel it

## Request

```
post("api/product/manageOrder")
```

### Request Data

paymentMethod: one of ["COD", "PayPal"] (case sensetive)
voucher: string || null
action: one of ["Add", "Remove", "Cancel", "Update"]
orderId: string (if editing order) || null (in case of creating order)

## Response

Status Code 200
status 403 if voucher is expired
400 malformated request body data

- # After order creation or editing, a mail is sent to the customer containing the orderId
  =====================================================================

# add/edit/remove review

## Request

```
post("api/product/manageReview")
```

### Request Data

review: string shall be validated in frontend to be more than 10 characters
productId: string
rating: number from 0 to 5
action: one of ["Add", "Update", "Remove"] (case sensetive)

## Response

Status Code 200
400 with error in response body
=====================================================================
