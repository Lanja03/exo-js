export async function put(id, user) {
    try {
        const res = await fetch(`http://localhost:4400/users/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/JSON"
            }, body: JSON.stringify(user)
        });
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}