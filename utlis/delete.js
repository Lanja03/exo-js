export async function deleteUser(id) {
    try {
        const res = await fetch("http://localhost:4400/users/" + id, {
            method: "DELETE",
            headers: {
                "content-type": "application/JSON"
            }
        });
        return await res.json();
        //console.log(res);
    } catch (err) {
        console.error(err);
    }
}