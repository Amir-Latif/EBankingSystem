import React, { useState, useEffect } from "react";
import { Search, Feed, Icon } from "semantic-ui-react";
import { ajax } from "../../utilities/ajax";
import admin from "./admin.module.scss";

function Transaction() {
  const image = "https://react.semantic-ui.com/images/avatar/small/jenny.jpg";

  const [transactions, setTransactions] = useState([]);
  const [sourceTransactions, setSourceTransactions] = useState([]);
  const [didMount, setDidMount] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    ajax.get("admin/getCompleteTransactionLog", true).then((data) => {
      setTransactions(data);
      setSourceTransactions(data);
      setDidMount(true);
    });
  }, []);

  function searchTransactions(e) {
    if (e.target.value !== "")
      setTransactions(transactions.filter((t) => t.id === e.target.value));
    else setTransactions(sourceTransactions);
  }

  function incrementPage() {
    if (page + 5 > transactions.length) setPage(0);
    else setPage(page + 5);
  }
  function decrementPage() {
    if (page - 5 < 0) setPage(0);
    else setPage(page - 5);
  }

  return (
    <div style={{ marginTop: "100px" }}>
      {transactions.length === 0 && didMount ? (
        <Feed
          style={{
            border: "solid 1px black",
            width: "80%",
            marginTop: "40px",
            marginLeft: "40px",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          No transactions are done so far
        </Feed>
      ) : transactions.length > 0 ? (
        <>
          <Search
            placeholder="Enter Transaction Id"
            style={{ marginLeft: "50px" }}
            size="massive"
            onBlur={searchTransactions}
          />

          <button
            className={admin.flex}
            onClick={() => setTransactions(sourceTransactions)}
          >
            Clear Filter
          </button>

          {transactions.slice(page, page + 5).map((transaction) => (
            <Feed
              key={transaction.id}
              style={{
                border: "solid 1px black",
                width: "80%",
                marginTop: "40px",
                marginLeft: "40px",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h3>Transaction ID: {transaction.id}</h3>
              <Feed.Event
                image={image}
                date={new Date(transaction.date).toLocaleDateString()}
                summary={
                  transaction.type === "transfer"
                    ? `${transaction.transactor} sent ${transaction.amount}$ to ${transaction.transferredTo}`
                    : transaction.type === "withdraw"
                    ? `${transaction.transactor} withdrew ${transaction.amount}$`
                    : `${transaction.transactor} deposited ${transaction.amount}$`
                }
              />
              {transaction.type === "transfer" ? (
                <Icon
                  name="exchange"
                  style={{ float: "right", marginTop: "-30px" }}
                  size="big"
                  color="blue"
                />
              ) : transaction.type === "deposit" ? (
                <Icon
                  name="arrow right"
                  style={{ float: "right", marginTop: "-30px" }}
                  size="big"
                  color="green"
                />
              ) : (
                <Icon
                  name="arrow left"
                  style={{ float: "right", marginTop: "-30px" }}
                  size="big"
                  color="red"
                />
              )}
            </Feed>
          ))}

          <div className={admin.flex}>
            <button className={admin.button} onClick={decrementPage}>
              Previous
            </button>
            <button onClick={incrementPage}>Next</button>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Transaction;
