import { TodoistApi } from "@doist/todoist-api-typescript";
import info from "./info";
import getDataFromLocalStorage from "../../app/util/localStorage/getDataFromLocalStorage";

const Todoist = {
  foo: async () => {
    const url = "https://api.todoist.com/sync/v9";
    const clientID = info.clientID;
    const client_secret = info.secret;
    const code = info.code;
    console.log(clientID, client_secret, code);

    const body = JSON.stringify({
      client_id: clientID,
      client_secret: client_secret,
      personal_token: code,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error(`Error migrating token: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  },

  getToken: async (code) => {
    const formData = new FormData();
    formData.append("client_id", info.clientID);
    formData.append("client_secret", info.secret);
    formData.append("code", code);

    const response = await fetch("https://todoist.com/oauth/access_token", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Unable to procces request");
      return {
        isSuccess: false,
        message: "Unable to procces request",
        access_token: undefined,
      };
    }
    const data = await response.json();
    return {
      isSuccess: true,
      message: "Todoist Authentication Done.",
      access_token: data.access_token,
    };
  },

  getTasks: async () => {
    try {
      const userToken = getDataFromLocalStorage("todoist_token");
      const api = new TodoistApi(userToken);

      const tasks = await api.getTasks();
      return {
        tasks,
        isSuccess: true,
        message: "",
      };
    } catch (error) {
      return {
        tasks: [],
        isSuccess: false,
        message: "unable to get tasks.",
      };
    }
  },

  deleteTask: async (taskID) => {
    try {
      const userToken = getDataFromLocalStorage("todoist_token");
      const api = new TodoistApi(userToken);

      const isSuccess = await api.deleteTask(taskID);
      return {
        isSuccess,
        message:
          isSuccess === true
            ? "Task has been deleted."
            : "Unable to delete task.",
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Unable to delete task, Check your connection",
      };
    }
  },
  createTask: async ({ content }) => {
    try {
      const userToken = getDataFromLocalStorage("todoist_token");
      const api = new TodoistApi(userToken);

      const task = await api.addTask({
        content: content,
        dueString: "today",
        dueLang: "en",
      });
      return {
        isSuccess: true,
        message: "Task has been saved.",
        task,
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Unable to save task.",
      };
    }
  },

  closeTask: async (taskID) => {
    try {
      const userToken = getDataFromLocalStorage("todoist_token");
      const api = new TodoistApi(userToken);
      const isSuccess = await api.closeTask(taskID);
      return {
        isSuccess,
        message:
          isSuccess === true
            ? "Task has been checked."
            : "Unable to check task.",
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: "Unable to check task.",
      };
    }
  },
};
export default Todoist;
