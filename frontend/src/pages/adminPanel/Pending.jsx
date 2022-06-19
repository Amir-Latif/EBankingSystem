import React, { useState, useEffect } from "react";
import { Item, Button, Icon, Popup } from "semantic-ui-react";
import { ajax } from "../../utilities/ajax";

export default function Pending({ type }) {
  const [popUp, setPopUp] = useState("");
  const [didMount, setDidMount] = useState(false);

  //#region Pending data
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    ajax.get(`admin/get${type}Status`, true).then((data) => {
      setPendingData(data.filter((e) => e.status === "Pending"));
      setDidMount(true);
    });
  }, []);
  //#endregion

  //#region Ruling on Requests
  function manageData(id, decision) {
    ajax
      .post(
        `admin/manage${type}`,
        "json",
        JSON.stringify({
          id: id,
          status: decision,
        }),
        true
      )
      .then(() => {
        setPendingData(pendingData.filter((e) => e.id !== id));
        setDidMount(true);
      });
  }

  //#endregion

  return (
    <div style={{ marginTop: "100px" }}>
      {pendingData.length === 0 && didMount ? (
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
          No pending {type.toLowerCase()} requests
        </Item.Group>
      ) : pendingData.length > 0 ? (
        pendingData.map((data) => (
          <Item.Group
            key={data.id}
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
                <Item.Header>{data.name}</Item.Header>
                <Item.Description>
                  This {type.toLowerCase} is pending your approval
                </Item.Description>
                <Popup
                  trigger={
                    <Button
                      positive
                      style={{ float: "right" }}
                      onClick={() => setPopUp(`${data.id}a`)}
                    >
                      Activate
                    </Button>
                  }
                  content={
                    <Button
                      color="green"
                      content="Are you sure?"
                      onClick={() => {
                        manageData(data.id, "Active");
                        setPopUp("");
                      }}
                    />
                  }
                  open={popUp === `${data.id}a`}
                  position="top right"
                />
                <Popup
                  trigger={
                    <Button
                      negative
                      style={{ float: "right" }}
                      onClick={() => setPopUp(`${data.id}s`)}
                    >
                      Suspend
                    </Button>
                  }
                  content={
                    <Button
                      color="red"
                      content="Are you sure?"
                      onClick={() => {
                        manageData(data.id, "Suspended");
                        setPopUp("");
                      }}
                    />
                  }
                  open={popUp === `${data.id}s`}
                  position="top right"
                />
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
