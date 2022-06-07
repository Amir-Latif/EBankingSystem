- Only the customers are authorized to perform the following APIs (except for registering)
- All request dates are to be sent in the format of string obtained from the `input type=date` using `e.target.value` {"2022-04-06"}
- All response dates can be parsed in JS; for example: `new Date("2022-04-06T17:07:07.994806Z")`
- Whenever `""` is mentioned, use an empty string `""` to get all results without filter

================================================
<!-- #region register -->
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
<!-- #endregion -->

<!-- #region login -->
# login

## Request Data

email: string (must be validated using input type email in the frontend),
password: string,
rememberMe: boolean

## Response

Status Code 200 successful
status 403 if user is forbidden or locked or email not confirmed with response body containing the error

<!-- #endregion -->

<!-- #region logout -->
# logout

## Request

```
post("api/identity/logout")
```

### Request Data

none

## Response

# Status Code 200

<!-- #endregion -->

<!-- #region change password -->
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

<!-- #endregion -->

<!-- #region request change password -->

# request change password

## request body
email: string

## response
403 if the email does not belong to a user or is not confirmed
200 if successful

<!-- #endregion -->

<!-- #region reset password -->
# Reset password

## request body
userId: string (from the URL query parameters)
code: string (from the URL query parameters)
newPassword: string

## response
403 if user is not registered or is not confirmed
406 errors with a response body containing the errors
200 if successful
<!-- #endregion -->