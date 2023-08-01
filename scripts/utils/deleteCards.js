/* Deletes existing cards */
function deleteCards(container) {
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
}