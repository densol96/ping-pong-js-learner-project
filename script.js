const p1 = {
    button: document.querySelector("#p1btn"),
    score: document.querySelector("#p1score"),
    value: 0
}

const p2 = {
    button: document.querySelector("#p2btn"),
    score: document.querySelector("#p2score"),
    value: 0
}

const reset = document.querySelector("#reset");
const optionsMenu = document.querySelector("#options");

for (let i = 3; i < 12; i++) {
    const option = document.createElement("option");
    option.innerText = `${i}`;
    option.value = `${i}`;
    optionsMenu.appendChild(option);
}

let menuValue = parseInt(optionsMenu.value);
const tempTarget = document.createElement("option");

function updateOnClick(player, opponent) {
    player.value += 1;
    player.score.innerText = player.value;
    if (player.value === menuValue) {
        if (player.value - opponent.value >= 2) {
            player.button.disabled = true;
            opponent.button.disabled = true;
            player.score.classList.add("has-text-success");
            opponent.score.classList.add("has-text-danger");
        }
        else {
            setTimeout(() => {
                alert("You need to win at least by 2 points or more!");
                alert(`The target goal has been incremented from ${menuValue} to ${menuValue + 1}`);
                menuValue += 1;
                tempTarget.innerText = `${menuValue}`;
                tempTarget.value = `${menuValue}`;
                optionsMenu.appendChild(tempTarget);
                tempTarget.selected = true;
            }, 100);
        }
    }
}

function resetFunc() {
    for (let p of [p1, p2]) {
        p.score.innerText = 0;
        p.value = 0;
        p.button.disabled = false;
        p.score.classList.remove("has-text-success", "has-text-danger");
    }
    menuValue = parseInt(optionsMenu.value);
    tempTarget.selected = false;
    tempTarget.remove();
}

p1.button.addEventListener("click", () => {
    updateOnClick(p1, p2);
});

p2.button.addEventListener("click", () => {
    updateOnClick(p2, p1);
});

optionsMenu.addEventListener("change", () => {
    menuValue = parseInt(this.value);
    resetFunc();
})

optionsMenu.addEventListener("click", () => {
    tempTarget.style.display = "none";
})

reset.addEventListener("click", resetFunc);