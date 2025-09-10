const url = "http://localhost:3050/tasks";

export async function postTask(newTask) {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => console.log("Задача добавлена:", data))
        .catch((err) => console.error(err));
}

export async function getTask(id) {
    return fetch(`${url}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            console.log("Задача получена:", data);
            return data;
        })
        .catch((err) => console.error(err));
}

export async function getAllTasks() {
    return fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            console.log("Задачи получены:", data);
            return data;
        })
        .catch((err) => console.error(err));
}

export async function deleteTask(id) {
    return fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            console.log("Задача удалена:", data);
        })
        .catch((err) => console.error(err));
}
