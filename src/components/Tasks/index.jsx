/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Client, Databases, Query } from "appwrite";
import NavBar from "../NavBar";
import AddTasks from "./AddTasks";
import ShowTasks from "./ShowTasks";
import { useSession } from "../../hooks/context";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646fac4383abdf7894e9");

function Tasks() {
  const { session } = useSession();
  const databases = new Databases(client);

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await databases.listDocuments(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      [Query.equal("userId", [`${session?.$id}`])]
    );
    setTasks(res.documents);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <NavBar />
      <AddTasks databases={databases} fetchTasks={fetchTasks} />
      <ShowTasks databases={databases} fetchTasks={fetchTasks} tasks={tasks} />
    </div>
  );
}

export default Tasks;
