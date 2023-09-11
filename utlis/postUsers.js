export async function postUser(userToPost) {
    try {
        const res = await fetch("http://localhost:4400/users", {
            method: "POST",
            headers: {
                "content-type": "application/JSON"
            }, body: JSON.stringify(userToPost)
        });
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}