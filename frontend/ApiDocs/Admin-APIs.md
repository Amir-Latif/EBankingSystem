- Only the admin is authorized to perform the following APIs
- All request dates are to be sent in the format of string obtained from the `input type=date` using `e.target.value` {"2022-04-06"}
- All response date can be parsed in JS; for example: `new Date("2022-04-06T17:07:07.994806Z")`
- Whenever `""` is mentioned, use an empty string `""` to get all results without filter

================================================
<!-- #region manage customer -->
# Manage Customer status

## Request Data

email: string
status: one of ["Active", "Pending", "Suspended", "Rejected"] (case sensetive)

## Response

status code 200 if successful
status 406 if user does not exist with a response body `"User does not exist"`
status 400 if the status is not from the options

<!-- #endregion -->
=====================================================================
<!-- region manage Account -->
# Manage Account status

## Request Data

account: string (account ID)
status: one of ["Active", "Pending", "Suspended", "Rejected"] (case sensetive)

## Response

status code 200 if successful
status 405 if user does not exist with a response body `"Account does not exist"`
status 400 if the status is not from the options

<!-- #endregion -->
=====================================================================
<!-- #region get customer status -->
# Get Customer Details

## Response
name: string
email: string
status: string

status code 200 if successful
<!-- #endregion -->
=====================================================================
<!-- #region get Complete Transaction Log -->
# Get Customer Details

## Response
{
    id: string,
    type: "Withdrawal, Desposit, Transfer" string,
    amount: number,
    transactionId: string,
    transactor: string,
    transferredTo: string,
    approved: boolean,
    date: UTC
}[]

status code 200 if successful
<!-- #endregion -->