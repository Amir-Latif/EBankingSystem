import React, { useState, useEffect } from "react";
import { Item, Button, Icon, Popup } from "semantic-ui-react";
import { ajax } from "../../utilities/ajax";

export default function Decided({ type }) {
  //#region Get the data
  const [data, setData] = useState([]);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    ajax.get(`admin/get${type}status`, true).then((data) => {
      setData(data.filter((e) => e.status !== "Pending"));
      setDidMount(true);
    });
  }, []);
  //#endregion

  //#region Ruling on Requests
  function manageData(dataId, decision) {
    ajax
      .post(
        `admin/manage${type}`,
        "json",
        JSON.stringify({
          id: dataId,
          status: decision,
        }),
        true
      )
      .then(() => {
        setData(
          data.map((d) => (d.id === dataId ? { ...d, status: decision } : d))
        );
      });
  }
  //#endregion

  //#region Popup control
  const [popUp, setPopUp] = useState("");
  //#endregion

  return (
    <div style={{ marginTop: "100px" }}>
      {data.length === 0 && didMount ? (
        <Item.Group
          link
          style={{
            alignItems: "center",
            width: "60%",
            marginLeft: "100px",
            border: "solid 1px black",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          No {type.toLowerCase()}s registered yet
        </Item.Group>
      ) : data.length > 0 ? (
        data.map((d) => (
          <Item.Group
            key={d.id}
            link
            style={{
              alignItems: "center",
              width: "60%",
              marginLeft: "100px",
              border: "solid 1px black",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Item>
              <Icon name="user circle" size="huge" color="teal" />

              <Item.Content>
                <Item.Header>{d.name}</Item.Header>
                <Item.Description>ID: {d.id}</Item.Description>
                <div style={{ float: "right" }}>
                  <Button
                    positive={d.status === "Active"}
                    negative={d.status === "Suspended"}
                    disabled={true}
                  >
                    This {type.toLowerCase()} is {d.status}
                  </Button>
                  <Popup
                    trigger={
                      <Button
                        positive={d.status === "Suspended"}
                        negative={d.status === "Active"}
                        onClick={() => setPopUp(`${d.id}`)}
                      >
                        {d.status === "Active" ? "Suspend" : "Activate"}
                      </Button>
                    }
                    content={
                      <Button
                        color={d.status === "Active" ? "red" : "green"}
                        content="Are you sure"
                        onClick={() => {
                          manageData(
                            d.id,
                            d.status === "Active" ? "Suspended" : "Active"
                          );
                          setPopUp("");
                        }}
                      />
                    }
                    open={popUp === `${d.id}`}
                    position="top right"
                  />
                </div>
              </Item.Content>
            </Item>
          </Item.Group>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
