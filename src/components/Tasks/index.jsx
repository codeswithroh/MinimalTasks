/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Client, Databases, Query } from "appwrite";
import AddTasks from "./AddTasks";
import ShowTasks from "./ShowTasks";
import { useSession } from "../../hooks/context";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646fac4383abdf7894e9");

function Tasks() {
  const { session } = useSession();
  const { type, category } = useParams();
  const databases = new Databases(client);

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchTasks = async (queryParams, _category) => {
    const query = [Query.equal("userId", [`${session?.userId}`])];
    query.push(Query.equal("done", false));

    if (queryParams === "important") {
      query.push(Query.equal("important", true));
    }

    if (_category) {
      query.push(Query.equal("categories", _category));
    }

    const res = await databases.listDocuments(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      query
    );
    setTasks(res.documents);
  };

  const fetchCompletedTasks = async (queryParams, _category) => {
    const query = [Query.equal("userId", [`${session?.userId}`])];

    query.push(Query.equal("done", true));

    if (queryParams === "important") {
      query.push(Query.equal("important", true));
    }

    if (_category) {
      query.push(Query.equal("categories", _category));
    }

    const res = await databases.listDocuments(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      query
    );
    setCompletedTasks(res.documents);
  };

  useEffect(() => {
    fetchTasks(type, category);
    fetchCompletedTasks(type, category);
  }, [type, category]);

  return (
    <div
      style={{
        width: "98vw",
        marginLeft: "2em",
        marginRight: "2em",
      }}
    >
      {!!type && (
        <Typography
          sx={{ mt: "3em", ml: "0.8em" }}
          variant="h5"
          align="left"
          gutterBottom
        >
          {type === "important" ? "Important Tasks" : "My Tasks"}
        </Typography>
      )}
      {!!category && (
        <Typography
          sx={{ mt: "3em", ml: "0.8em" }}
          variant="h5"
          align="left"
          gutterBottom
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} Tasks
        </Typography>
      )}
      <AddTasks databases={databases} fetchTasks={fetchTasks} />
      <ShowTasks
        databases={databases}
        fetchTasks={fetchTasks}
        fetchCompletedTasks={fetchCompletedTasks}
        tasks={tasks}
        completedTasks={completedTasks}
      />
    </div>
  );
}

export default Tasks;
