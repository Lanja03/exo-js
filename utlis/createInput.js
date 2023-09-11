export const createInput = (placeholder, type, className) => {
    const input = document.createElement('input')
    input.setAttribute('placeholder', placeholder)
    input.setAttribute('type', type)
    input.classList.add(className)

    return input;
}