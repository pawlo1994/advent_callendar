{
    const date = new Date(Date.now());
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const author = "Robert Baden-Powell";
    const quotes = [
        {
            content: "Starajcie się zostawić ten świat troszkę lepszym niż go zastaliście",
            author
        },
        {
            content: "Nie błądzi tylko ten, kto nic nie robi",
            author
        },
        {
            content: "Życie bez przygód byłoby strasznie głupie",
            author
        },
    ];

    let taskStatus = "locked";

    const defaultTasks = [
        {
            content: `To już ostatnie zadanie - 
            Przeczytaj świąteczne opowiadanie.
            wesołych świąt!!!`,
            dayNumber: 24,
            taskStatus
        },
        {
            content: "Udekoruj choinkę",
            dayNumber: 23,
            taskStatus
        },
        {
            content: "Urządźcie sobie maraton świątecznych filmów",
            dayNumber: 22,
            taskStatus
        },
        {
            content: "Posprzątaj pokój na święta",
            dayNumber: 21,
            taskStatus
        },
        {
            content: "Zrób ozdoby na choinkę",
            dayNumber: 20,
            taskStatus
        },
        {
            content: "Przygotuj śniadanie dla rodziców",
            dayNumber: 10,
            taskStatus
        },
        {
            content: `Naucz się mówić "Wesołych świąt" w innym języku`,
            dayNumber: 12,
            taskStatus
        },
        {
            content: "Zróbcie bitwę na śnieżki (jeśli nie ma śniegu - bądźcie kreatywni)",
            dayNumber: 14,
            taskStatus
        },
        {
            content: "Przygotuj ozdobę na drzwi Twojego domu/pokoju",
            dayNumber: 16,
            taskStatus
        },
        {
            content: "Pokoloruj świąteczną kolorowankę",
            dayNumber: 5,
            taskStatus
        },
        {
            content: "Zabaw się w Mikołaja. Zrób porządek w zabawkach i przekaż innym dzieciom te, którymi się już nie bawisz",
            dayNumber: 6,
            taskStatus
        },
        {
            content: "Odwiedź świąteczny jarmark",
            dayNumber: 7,
            taskStatus
        },
        {
            content: "Ususz plastry pomarańczy",
            dayNumber: 8,
            taskStatus
        },
        {
            content: "Poznaj świąteczne zwyczaje innych krajów",
            dayNumber: 13,
            taskStatus
        },
        {
            content: "Pokaż jaki nietypowy zwyczaj świąteczny panuje u Ciebie w domu",
            dayNumber: 15,
            taskStatus
        },
        {
            content: "Ulepcie z kolegami/koleżankami bałwana (jeśli nie ma śniegu - bądźcie kreatywni)",
            dayNumber: 17,
            taskStatus
        },
        {
            content: "Naucz się nowej kolędy/pastorałki",
            dayNumber: 19,
            taskStatus
        },
        {
            content: "Napisz list do świętego Mikołaja",
            dayNumber: 1,
            taskStatus
        },
        {
            content: "Zagrajcie całą rodziną w ulubioną grę",
            dayNumber: 2,
            taskStatus
        },
        {
            content: "Wykonaj własnoręcznie ozdobę/upominek dla pani w szkole/przedszkolu",
            dayNumber: 3,
            taskStatus
        },
        {
            content: "Upiecz z pomocą bliskich świąteczne ciasteczka",
            dayNumber: 4,
            taskStatus
        },
        {
            content: "Zabierz rodzinę na zimowy spacer",
            dayNumber: 9,
            taskStatus
        },
        {
            content: "Zrób świąteczną kartkę i wyślij do kogoś ważnego dla Ciebie",
            dayNumber: 11,
            taskStatus
        },
        {
            content: "Poszukajcie z rodzicami najładniej udekorowanego domu",
            dayNumber: 18,
            taskStatus
        }
    ];

    let defaultTasksContents = [defaultTasks.map(({ content }) => ({ content }))];
    let tasksContents = ((tasks == null)) ? defaultTasksContents : [(tasks.map(({ content }) => ({ content })))];
    let listOfTasks = ((tasks == null) || (month !== 10) || (JSON.stringify(defaultTasksContents) !== JSON.stringify(tasksContents))) ? defaultTasks : tasks;

    const toggleTaskInProgress = (tasks, dayOfMonth) => {
        let index = tasks.findIndex(({ dayNumber }) => dayNumber === dayOfMonth);
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], taskStatus: "inProgress" },
            ...tasks.slice(index + 1),
        ];
        renderButtons(tasks, dayOfMonth);
    };

    const toggleTaskDone = (tasks, dayOfMonth) => {
        let index = tasks.findIndex(({ dayNumber }) => dayNumber === dayOfMonth);
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], taskStatus: "done" },
            ...tasks.slice(index + 1),
        ];
        renderButtons(tasks, dayOfMonth);
    };

    const setTaskBoxContent = (tasks, taskBox, containerButton, dayOfMonth) => {
        const taskBoxContent = document.querySelector(".js-taskBox__Content");
        let taskIndex = tasks.findIndex(({ dayNumber }) => dayNumber === +containerButton.innerText);
        let quoteIndex = (+containerButton.innerText) % 3;
        switch (taskIndex) {
            case taskIndex:
                {
                    taskBoxContent.innerHTML = `
                    <p class="taskBox__ContentQuote">
                    ${quotes[quoteIndex].content}
                    <span class="taskBox__ContentQuoteAuthor">
                    ${quotes[quoteIndex].author}
                    </span>
                    </p>
                        <h2 class="taskBox__ContentHeader">Zadanie nr ${(+containerButton.innerText)}</h2>
                            <p class="taskBox__ContentParagraph js-taskBox__ContentParagraph">
                                ${tasks[(+taskIndex)].content}
                            </p>
                            <button class="taskBox__Button js-taskBox__button">
                                ${tasks[(+taskIndex)].taskStatus === "locked" ? `Do dzieła!` : (tasks[(+taskIndex)].taskStatus === "inProgress") ? `Zrobione!` : ''}
                            </button>
                    `;
                    if ((+containerButton.innerText) === 24) {
                        const taskBoxContentParagraph = document.querySelector(".js-taskBox__ContentParagraph");
                        taskBoxContentParagraph.classList.add("taskBox__ContentParagraph--merryChristmassed");
                    };
                    const taskBoxButton = document.querySelector(".js-taskBox__button");
                    taskBoxButton.addEventListener("click", () => {
                        if (tasks[(+taskIndex)].taskStatus === "locked") {
                            toggleTaskInProgress(tasks, (+containerButton.innerText), dayOfMonth);
                        }
                        else {
                            toggleTaskDone(tasks, (+containerButton.innerText), dayOfMonth);
                        }
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

    const renderButtons = (tasks, month) => {
        const container = document.querySelector(".js-container");
        const containerHeaderBox = document.querySelector(".js-containerHeaderBox");
        const todayTaskIndex = tasks.findIndex(({ dayNumber }) => (dayNumber === dayOfMonth));
        console.log(month);
        containerHeaderBox.innerHTML =
            (month !== 10) &&
            `<h3 class="containerHeader">
                Dzisiejsze zadanie:
                </h3>
                    <p>${(todayTaskIndex > -1)
                ? `${tasks[todayTaskIndex].content} (Odśwież stronę przed potwierdzeniem zadania)`
                : ""}
                </p>` || null
            ;
        let HTMLString = "";

        tasks.forEach((task) => {
            HTMLString +=
                `<button class=
                "containerButton js-containerButton
                ${((month === 10) && (task.dayNumber === dayOfMonth) && (task.taskStatus === "locked"))
                    ? ""
                    : ((task.taskStatus === "inProgress") && (task.dayNumber === dayOfMonth))
                        ? "containerButton--inProgress"
                        : (task.taskStatus === "done")
                            ? "containerButton--done"
                            : ((task.taskStatus === "locked") && (task.dayNumber !== dayOfMonth)) || (month !== 10)
                                ? "containerButton--locked"
                                : ""}" 
                ${((task.taskStatus === "done") || (month !== 10) || (task.dayNumber !== dayOfMonth) && (task.taskStatus === "locked"))
                    ? "disabled"
                    : ((task.dayNumber === dayOfMonth) || (task.taskStatus === "inProgress"))
                        ? ""
                        : ''
                }>
        ${task.dayNumber}
                </button > `;
        });

        container.innerHTML = HTMLString;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const render = (dayOfMonth, month) => {
        renderButtons(listOfTasks, month);
        const taskBox = document.querySelector(".js-taskBox");
        containerButtonsEvents(listOfTasks, taskBox, dayOfMonth);
    };

    render(dayOfMonth, month);
};