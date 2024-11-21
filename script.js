// Função para salvar o status do presente no localStorage
function saveGiftStatus(giftId, status) {
    const gifts = JSON.parse(localStorage.getItem('gifts')) || {};
    gifts[giftId] = status;
    localStorage.setItem('gifts', JSON.stringify(gifts));
}

// Função para marcar o presente como "Comprado"
function markAsBought(button) {
    const item = button.closest("li");
    if (!item) return;

    // Adiciona a classe 'bought' e remove 'available', se aplicável
    item.classList.add("bought");
    item.classList.remove("available");

    // Atualiza o texto do botão e exibe uma mensagem de agradecimento
    const thankYouMessage = "Muito obrigado por escolher este presente! 😊";
    alert(thankYouMessage);

    // Atualiza o localStorage
    const giftId = item.querySelector("h3").textContent;
    saveGiftStatus(giftId, "bought");
}

// Função para marcar o presente como "Disponível"
function markAsAvailable(button) {
    const item = button.closest("li");
    if (!item) return;

    // Remove a classe 'bought'
    item.classList.remove("bought");

    // Atualiza o localStorage
    const giftId = item.querySelector("h3").textContent;
    saveGiftStatus(giftId, "available");
}

// Função para carregar os status dos presentes no localStorage
function loadGiftStatuses() {
    const gifts = JSON.parse(localStorage.getItem('gifts')) || {};

    // Loop para atualizar o status de cada item de acordo com o localStorage
    const items = document.querySelectorAll("li");
    items.forEach(item => {
        const giftId = item.querySelector("h3").textContent;

        if (gifts[giftId] === "bought") {
            item.classList.add("bought");
            item.classList.remove("available");
        } else {
            item.classList.remove("bought");
            item.classList.add("available");
        }
    });
}

// Adicionando eventos de clique aos selects
document.querySelectorAll(".status").forEach(select => {
    select.addEventListener("change", (event) => {
        const status = event.target.value;
        const item = event.target.closest("li");
        const giftId = item.querySelector("h3").textContent;

        if (status === "comprado") {
            markAsBought(event.target);
        } else {
            markAsAvailable(event.target);
        }
    });
});

// Carregar os status quando a página for carregada
window.onload = loadGiftStatuses;