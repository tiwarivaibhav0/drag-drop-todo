import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import React, { useState } from "react";
const { Text } = Typography;

const Todo: React.FC = () => {
  const [transferIndex, setTransferIndex] = useState<any>(null);
  const [showReview, setShowReview] = useState<any>(false);
  const [showPending, setShowPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [list, setList] = useState([]);
  const [inputFields, setInputFields] = useState(["", "", ""]);
  const [edit, setEdit] = useState(false);


  function allowDrop(ev: any) {
    ev.preventDefault();
  }

  function drag(ev: any, index: any) {
    setTransferIndex(index);
  }

  function drop(ev: any, cat: string) {
    ev.preventDefault();
    let tempList: any = [...list];
    tempList[transferIndex]["cat"] = cat;
    setList(tempList);
    setTransferIndex(null);
  }
  
  const handleInput = (val: string, index: any) => {
    let tempInputs = [...inputFields];
    tempInputs[index] = val;
    setInputFields(tempInputs);
  };
  
  const addNewTask = (val: string, cat: string, index: any) => {

    let newTask = {
      data: val,
      cat: cat,
    };

    let tempList: any = [...list];
    tempList.push(newTask);
    setList(tempList);

    let tempInputs = [...inputFields];
    tempInputs[index] = "";
    setInputFields(tempInputs);
    setEdit(false)
  };


  const deleteTask = (index: any) => {
    let tempList: any = [...list];
    tempList.splice(index, 1);
    setList(tempList);
  };

  

  const editTask = (index: any, inputIndex: any) => {
    let tempInputs = [...inputFields];
    tempInputs[inputIndex] = list[index]["data"];
    setInputFields(tempInputs);
    deleteTask(index);
    setEdit(true)
  };
  return (
    <>
      <div className="container">
        <h1>ToDo APP</h1>
        <section className="section-main">
          <Card>
            <div className="section-main-title">
              <h2>Review</h2>
              <Button onClick={() => setShowReview(!showReview)}>
                {showReview ? "Hide" : "+"}
              </Button>
            </div>
            {showReview && (
              <Card>
                {" "}
                <Input
                  placeholder="Enter Todo Details"
                  onPressEnter={(e: any) =>
                    addNewTask(inputFields[0], "review", "0")
                  }
                  value={inputFields[0]}
                  onChange={(e) => {
                    handleInput(e.target.value, "0");
                  }}
                />
              </Card>
            )}
            <div
              className="dropzone"
              onDrop={(e) => drop(e, "review")}
              onDragOver={(e) => allowDrop(e)}
            >
              {list.map(
                (item: any, i) =>
                  item.cat === "review" && (
                    <Card
                      draggable="true"
                      onDragStart={(e) => drag(e, i)}
                      className="draggable-card"
                    >
                      <Row>
                        <Col span={8}>
                          <Text type="danger">{item.data}</Text>
                        </Col>

                        <Col>
                          <Button
                            onClick={() => {
                              editTask(i, "0");
                              setShowReview(true);
                            }}
                            disabled={edit}
                          >
                            <EditOutlined />
                          </Button>
                          <Button onClick={() => deleteTask(i)}>
                            <DeleteOutlined />
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  )
              )}
            </div>
          </Card>
          <Card>
            <div className="section-main-title">
              <h2>Pending</h2>
              <Button onClick={() => setShowPending(!showPending)}>
                {showPending ? "Hide" : "+"}
              </Button>
            </div>
            {showPending && (
              <Card>
                <Input
                  placeholder="Enter Todo Details"
                  onPressEnter={(e: any) =>
                    addNewTask(inputFields[1], "pending", "1")
                  }
                  value={inputFields[1]}
                  onChange={(e) => {
                    handleInput(e.target.value, "1");
                  }}
                />
              </Card>
            )}
            <div
              className="dropzone"
              onDrop={(e) => drop(e, "pending")}
              onDragOver={(e) => allowDrop(e)}
            >
              {list.map(
                (item: any, i) =>
                  item.cat === "pending" && (
                    <Card
                      draggable="true"
                      onDragStart={(e) => drag(e, i)}
                      className="draggable-card"
                    >
                      <Row>
                        <Col span={8}>
                          <Text type="danger">{item.data}</Text>
                        </Col>

                        <Col>
                          <Button
                            onClick={() => {
                              editTask(i, "1");
                              setShowPending(true);
                            }}
                            disabled={edit}
                          >
                            <EditOutlined />
                          </Button>
                          <Button onClick={() => deleteTask(i)}>
                            <DeleteOutlined />
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  )
              )}
            </div>
          </Card>
          <Card>
            <div className="section-main-title">
              <h2>Completed</h2>
              <Button onClick={() => setShowCompleted(!showCompleted)}>
                {showCompleted ? "Hide" : "+"}
              </Button>
            </div>
            {showCompleted && (
              <Card>
                {" "}
                <Input
                  placeholder="Enter Todo Details"
                  onPressEnter={(e: any) =>
                    addNewTask(inputFields[2], "completed", "2")
                  }
                  value={inputFields[2]}
                  onChange={(e) => {
                    handleInput(e.target.value, "2");
                  }}
                />
              </Card>
            )}

            <div
              className="dropzone"
              onDrop={(e) => drop(e, "completed")}
              onDragOver={(e) => allowDrop(e)}
            >
              {list.map(
                (item: any, i) =>
                  item.cat === "completed" && (
                    <Card
                      draggable="true"
                      onDragStart={(e) => drag(e, i)}
                      className="draggable-card"
                    >
                      <Row>
                        <Col span={8}>
                          <Text type="danger">{item.data}</Text>
                        </Col>

                        <Col>
                          <Button
                            onClick={() => {
                              editTask(i, "2");
                              setShowCompleted(true);
                            }}
                            disabled={edit}
                          >
                            <EditOutlined />
                          </Button>
                          <Button onClick={() => deleteTask(i)}>
                            <DeleteOutlined />
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  )
              )}
            </div>
          </Card>
        </section>
      </div>
    </>
  );
};

export default Todo;
