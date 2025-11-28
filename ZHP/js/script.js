{
    const date = new Date(Date.now());
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    const tasks = JSON.parse(localStorage.getItem("ZHP_tasks"));
    let taskStatus = "locked";
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

    const defaultTasks = [
        {
            content: `To już ostatnie zadanie - 
            Przeczytaj świąteczne opowiadanie.
            wesołych świąt!!!`,
            dayNumber: 24,
            taskStatus
        },
        {
            content: "Napisz list do świętego Mikołaja",
            dayNumber: 1,
            taskStatus
        },
        {
            content: "Pobaw się w Mikołaja i przygotuj dla kogoś niespodziankę",
            dayNumber: 5,
            taskStatus
        },
        {
            content: "Przygotuj małą ozdobę świąteczną",
            dayNumber: 4,
            taskStatus
        },
        {
            content: "Pomóż przy świątecznych porządkach",
            dayNumber: 2,
            taskStatus
        },
        {
            content: `Pomóż przygotować świąteczne wypieki
            – pierniki, kruche ciastka, cokolwiek!`,
            dayNumber: 8,
            taskStatus
        },
        {
            content: `Z pomocą bliskich przygotuj zimową herbatę -
            użyj swoich ulubionych składników`,
            dayNumber: 3,
            taskStatus
        },
        {
            content: `Zrób „łańcuch dobrych uczynków”
            – jedna karteczka = jeden dobry uczynek.`,
            dayNumber: 10,
            taskStatus
        },
        {
            content: "Naucz się nowej kolędy lub pastorałki.",
            dayNumber: 7,
            taskStatus
        },
        {
            content: "Zagraj z rodziną w grę planszową lub karcianą.",
            dayNumber: 9,
            taskStatus
        },
        {
            content: "Wybierz się na jarmark bożonarodzeniowy",
            dayNumber: 6,
            taskStatus
        },
        {
            content: "Wybierz się z rodziną na zimowy spacer lub sanki",
            dayNumber: 14,
            taskStatus
        },
        {
            content: `Zorganizuj rodzinny seans świąteczny
            – wybierzcie razem bajkę lub film.`,
            dayNumber: 11,
            taskStatus
        },
        {
            content: `Wyślij lub przekaż życzenia komuś
            z kim dawno nie rozmawiałeś lub komuś
            kto jest dla Ciebie ważny`,
            dayNumber: 13,
            taskStatus
        },
        {
            content: `Zrób porządek w zabawkach,
            jeśli jest coś czego nie potrzebujesz podaruj je komuś innemu`,
            dayNumber: 15,
            taskStatus
        },
        {
            content: `Przygotuj coś dobrego dla ptaszków
            – np. ziarna lub kulę tłuszczową.`,
            dayNumber: 12,
            taskStatus
        },
        {
            content: `Naucz się "Wesołych Świąt" w innym języku`,
            dayNumber: 18,
            taskStatus
        },
        {
            content: `Dowiedz się jakie są zwyczaje w innych krajach
            lub jak dawniej obchodziło się święta w twoim domu`,
            dayNumber: 16,
            taskStatus
        },
        {
            content: "Wybierz się na kolędowanie z przyjaciółmi",
            dayNumber: 20,
            taskStatus
        },
        {
            content: "Przygotuj lampion na światełko betlejemskie",
            dayNumber: 17,
            taskStatus
        },
        {
            content: "Ulep bałwana z przyjaciółmi",
            dayNumber: 19,
            taskStatus
        },
        {
            content: "Pochwal się swoją choinką",
            dayNumber: 23,
            taskStatus
        },
        {
            content: "Zróbcie sobie świąteczne zdjęcie (według swojego pomysłu)",
            dayNumber: 21,
            taskStatus
        },
        {
            content: "Pomóż mamie lub tacie przygotować jedną potrawę wigilijną",
            dayNumber: 22,
            taskStatus
        }
    ];

    let defaultTasksContents = [defaultTasks.map(({ content }) => ({ content }))];
    let tasksContents = ((tasks == null)) ? defaultTasksContents : [(tasks.map(({ content }) => ({ content })))];
    let listOfTasks = ((tasks == null) || (month !== 12) || (JSON.stringify(defaultTasksContents) !== JSON.stringify(tasksContents))) ? defaultTasks : tasks;

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
        const todayTaskStatus = todayTaskIndex > -1 ? tasks[todayTaskIndex].taskStatus : null;
        let isDailyTaskContentShown = ((todayTaskStatus === "inProgress")) ? true : false;
        containerHeaderBox.innerHTML =
            isDailyTaskContentShown &&
            `<h3 class="containerHeader">
                Dzisiejsze zadanie:
                </h3>
                    <p>${(todayTaskIndex > -1)
                ? `${tasks[todayTaskIndex].content} (Odśwież stronę przed potwierdzeniem zadania)`
                : ""}
                </p>`
            || `<h3 class="containerHeader">
                </h3>
                    <p>${(month === 12) && (dayOfMonth <= 24) && (todayTaskStatus !== "done")
                ? `Kliknij na przycisk z numerem ${dayOfMonth}`
                : (todayTaskStatus === "done")
                    ? "Dobra robota! Do zobaczenia jutro."
                    : (month === 12) && (dayOfMonth > 24)
                        ? "Wesołych świąt i szczęśliwego Nowego Roku"
                        : "Zajrzyj tutaj w grudniu"}
                </p>`
            ;
        let HTMLString = "";

        tasks.forEach((task) => {
            HTMLString +=
                `<button class=
                "containerButton js-containerButton
                ${((month === 12) && (task.dayNumber === dayOfMonth) && (task.taskStatus === "locked"))
                    ? ""
                    : ((task.taskStatus === "inProgress") && (task.dayNumber === dayOfMonth))
                        ? "containerButton--inProgress"
                        : (task.taskStatus === "done")
                            ? "containerButton--done"
                            : ((task.taskStatus === "locked") && (task.dayNumber !== dayOfMonth))
                                || ((task.taskStatus === "inProgress") && (task.dayNumber !== dayOfMonth))
                                || (month !== 12)
                                ? "containerButton--locked"
                                : ""}" 
                ${((task.taskStatus === "done") || (month !== 12)
                    || ((task.dayNumber !== dayOfMonth) && (task.taskStatus === "locked"))
                    || ((task.dayNumber !== dayOfMonth) && (task.taskStatus === "inProgress")))
                    ? "disabled"
                    : ((task.dayNumber === dayOfMonth) || (task.taskStatus === "inProgress"))
                        ? ""
                        : ''
                }>
        ${task.dayNumber}
                </button> `;
        });

        container.innerHTML = HTMLString;
        localStorage.setItem("ZHP_tasks", JSON.stringify(tasks));
    };

    const render = (dayOfMonth, month) => {
        renderButtons(listOfTasks, month);
        const taskBox = document.querySelector(".js-taskBox");
        containerButtonsEvents(listOfTasks, taskBox, dayOfMonth);
    };

    render(dayOfMonth, month);
};