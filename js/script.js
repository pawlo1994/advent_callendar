{
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const quotes = JSON.parse(localStorage.getItem("quotes"));
    const author = "Robert Baden-Powell";
    let isDone = false;
    let isUsed = false;

    let listOfTasks = (tasks == null) ? [
        {
            content: "Wesołych świąt!!!",
            dayNumber: 24,
            isDone
        },
        {
            content: "Ubierzcie razem choinkę",
            dayNumber: 23,
            isDone
        },
        {
            content: `Obejrzyj lub przeczytaj "Opowieść wigilijną"`,
            dayNumber: 22,
            isDone
        },
        {
            content: "Zrób sobie z rodziną świąteczne zdjęcie",
            dayNumber: 21,
            isDone
        },
        {
            content: "Pomóż przygotować świąteczną potrawę",
            dayNumber: 20,
            isDone
        },
        {
            content: "Zadzwoń do bliskich i powiedz im coś miłego",
            dayNumber: 10,
            isDone
        },
        {
            content: "Zrób łańcuch choinkowy",
            dayNumber: 12,
            isDone
        },
        {
            content: "Naucz się śpiewać jedną kolędę",
            dayNumber: 14,
            isDone
        },
        {
            content: `Naucz się "Wesołych świąt" w innym języku`,
            dayNumber: 16,
            isDone
        },
        {
            content: "Zrób dobry uczynek koledze / koleżance",
            dayNumber: 5,
            isDone
        },
        {
            content: "Przygotujcie z rodzicami poczęstunek dla ptaszków",
            dayNumber: 6,
            isDone
        },
        {
            content: "Upieczcie pierniczki i udekorujcie je",
            dayNumber: 7,
            isDone
        },
        {
            content: "Zrób porządek w zabawkach - pomyśl o innych i podaruj niepotrzebne zabawki innym dzieciom",
            dayNumber: 8,
            isDone
        },
        {
            content: "Zróbcie sobie wieczór świątecznych filmów",
            dayNumber: 13,
            isDone
        },
        {
            content: "Zbuduj z klocków coś świątecznego",
            dayNumber: 15,
            isDone
        },
        {
            content: "Dowiedz się jak wyglądają święta w innych krajach",
            dayNumber: 17,
            isDone
        },
        {
            content: "Przeczytaj lub obejrzyj historię narodzin Jezusa",
            dayNumber: 19,
            isDone
        },
        {
            content: "Napisz list do świętego Mikołaja",
            dayNumber: 1,
            isDone
        },
        {
            content: "Zabierz rodzinę na zimowy spacer",
            dayNumber: 2,
            isDone
        },
        {
            content: "Pokoloruj świąteczną kolorowankę",
            dayNumber: 3,
            isDone
        },
        {
            content: "Wykonaj własnoręcznie ozdobę choinkową",
            dayNumber: 4,
            isDone
        },
        {
            content: "Przygotuj dla rodziców gorącą czekoladę",
            dayNumber: 9,
            isDone
        },
        {
            content: "Poznaj świąteczne zwyczaje Twojej rodziny",
            dayNumber: 11,
            isDone
        },
        {
            content: "Powiedz coś miłego 3 osobom",
            dayNumber: 18,
            isDone
        }
    ] : tasks;

    let listOfQuotes = (quotes == null) ? [
        {
            content: "Starajcie się zostawić ten świat troszkę lepszym niż go zastaliście",
            author,
            isUsed
        },
        {
            content: "Nie błądzi tylko ten, kto nic nie robi",
            author,
            isUsed
        },
        {
            content: "Życie bez przygód byłoby strasznie głupie",
            author,
            isUsed
        },
    ] : quotes;

    const toggleTaskDone = (tasks, dayOfMonth) => {
        let index = tasks.findIndex(({ dayNumber }) => dayNumber === dayOfMonth);
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], isDone: tasks[index].isDone = true },
            ...tasks.slice(index + 1),
        ];
    };

    const setTaskBoxContent = (tasks, taskBox, containerButton, dayOfMonth) => {
        const taskBoxContent = document.querySelector(".js-taskBox__Content");
        let taskIndex = tasks.findIndex(({ dayNumber }) => dayNumber === +containerButton.innerText);
        console.log(taskIndex);
        switch (taskIndex) {
            case taskIndex:
                {
                    if ((+containerButton.innerText) === 23) {
                        taskBoxContent.classList.add("taskBox__Content--merryChristmassed");
                        taskBox.classList.add("taskBox--merryChristmassed");
                        taskBoxContent.innerHTML = `
            <h2 class="taskBox__ContentHeader">Zadanie nr ${(+containerButton.innerText)}</h2>
                <p class="taskBox__ContentParagraph">
                    ${tasks[(+taskIndex)].content}
                </p>
                <button class="taskBox__Button js-taskBox__button">
                    Wzajemnie!!!
                </button>`
                    }
                    taskBoxContent.innerHTML = `
            <h2 class="taskBox__ContentHeader">Zadanie nr ${(+containerButton.innerText)}</h2>
                <p class="taskBox__ContentParagraph">
                    ${tasks[(+taskIndex)].content}
                </p>
                <button class="taskBox__Button js-taskBox__button">
                    Do dzieła!
                </button>
        `;
                    const taskBoxButton = document.querySelector(".js-taskBox__button");
                    taskBoxButton.addEventListener("click", () => {
                        toggleTaskDone(tasks, (+containerButton.innerText), dayOfMonth);
                        renderButtons(tasks, dayOfMonth);
                        taskBox.classList.toggle("taskBox--hidden");
                    });
                };
        }
    };

    const containerButtonsEvents = (tasks, taskBox, dayOfMonth) => {
        const containerButtons = document.querySelectorAll(".js-containerButton");

        containerButtons.forEach((containerButton) => {
            containerButton.addEventListener("click", () => {
                taskBox.classList.toggle("taskBox--hidden");
                setTaskBoxContent(tasks, taskBox, containerButton, dayOfMonth);
            });
        });
    };

    const renderButtons = (tasks, dayOfMonth) => {
        const container = document.querySelector(".js-container");
        let HTMLString = "";

        tasks.forEach((task) => {
            HTMLString +=
                `<button class=
                "containerButton js-containerButton ${((task.dayNumber === dayOfMonth) && (task.isDone === false)) ? "" : "containerButton--locked"} ${(task.isDone === false) ? "" : "containerButton--done"}" 
                ${((task.dayNumber !== dayOfMonth) || (task.isDone === true)) ? "disabled" : ""}>
                        ${task.dayNumber}
                </button>`;
        });

        container.innerHTML = HTMLString;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const render = () => {
        const date = new Date(Date.now());
        const dayOfMonth = date.getDate();
        renderButtons(listOfTasks, dayOfMonth);
        const taskBox = document.querySelector(".js-taskBox");
        containerButtonsEvents(listOfTasks, taskBox, dayOfMonth);
    };

    render();
};