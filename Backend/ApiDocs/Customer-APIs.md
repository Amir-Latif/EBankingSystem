<!-- #region create Account -->
# Create Account status

## Request

```
post('createAccount')
```

### Request Data

credit: number (min 1000)
type: one of ["Current", "Saving"] (case sensetive)

## Response

status code 200 if successful
status 403 if user does not exist or the type is not from the specified types or the credit is below 1000
<!-- #endregion -->
=====================================================================
<!-- #region Make Transaction -->
# Make Transaction

## Request

```
post('makeTransaction')
```

### Request Data

amount: number (min 1)
action: one of ["Withrdraw", "Deposit"] (case sensetive)

## Response

status code 200 if successful
status 403 if user does not exist or the type is not from the specified types or the credit is below 1
status 405 if no sufficient credit is available in the account
<!-- #endregion -->
=====================================================================
<!-- #region Get Transaction Log -->
# Make Transaction

## Request

```
get('getTransactionLog')
```

## Response

status code 200 if successful
status 403 if user does not exist (not logged)

data:

<!-- #endregion -->
=====================================================================