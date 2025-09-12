const url = "http://localhost:3050/projects";

export async function postProject(newProject) {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => console.log("Проект добавлен:", data))
        .catch((err) => console.error(err));
}

export async function patchProject(id, updateData) {
    return fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => console.log("Проект обновлен:", data))
        .catch((err) => console.error(err));
}

export async function getAllProjects() {
    return fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            console.log("Проекты получены:", data);
            return data;
        })
        .catch((err) => console.error(err));
}

export async function getProject(id) {
    return fetch(`${url}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            console.log("Проект получен:", data);
            return data;
        })
        .catch((err) => console.error(err));
}

export async function deleteProject(id) {
    return fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            console.log("Проект удален:", data);
        })
        .catch((err) => console.error(err));
}

