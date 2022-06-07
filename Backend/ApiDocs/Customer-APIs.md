<!-- #region create Account -->
# Create Account status

## Request Data

credit: number (min 1000)
type: one of ["Current", "Saving"] (case sensetive)

## Response

status code 200 if successful
status 403 if user does not exist or the type is not from the specified types or the credit is below 1000
<!-- #endregion -->
=====================================================================
<!-- #region Make Transaction -->
# Make Transaction

## Request Data

amount: number (min 1)
action: one of ["Withrdraw", "Deposit", "Transfer"] (case sensetive)
account: string (to depost to/ withdraw or transfer from )

## Response

status code 200 if successful
status 403 if user does not exist
or the type is not from the specified types
or the credit is below 1
or the account does not exist
or the account is not activated

status 405 if no sufficient credit is available in the account
or if the account to transfer to does not exist or not active
<!-- #endregion -->
=====================================================================
<!-- #region Get Transaction Log -->
# Make Transaction

## Response

status code 200 if successful
status 403 if user does not exist (not logged)

data:
transactionId: string
type: string (depost, withdrawal, transfer)
amount: number
approved: boolean
date: DateTime UTC

<!-- #endregion -->
=====================================================================