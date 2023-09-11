export function createBtn(content, type) {
    const btn = document.createElement("button")
    btn.setAttribute("type", type)
    btn.textContent = content;

    return btn;
}
