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

    let isDone = false;

    const defaultTasks = [
        {
            content: `To już ostatnie zadanie - 
            Przeczytaj świąteczne opowiadanie.
            wesołych świąt!!!`,
            dayNumber: 24,
            isDone
        },
        {
            content: "Udekoruj choinkę",
            dayNumber: 23,
            isDone
        },
        {
            content: "Urządźcie sobie maraton świątecznych filmów",
            dayNumber: 22,
            isDone
        },
        {
            content: "Posprzątaj pokój na święta",
            dayNumber: 21,
            isDone
        },
        {
            content: "Zrób ozdoby na choinkę",
            dayNumber: 20,
            isDone
        },
        {
            content: "Przygotuj śniadanie dla rodziców",
            dayNumber: 10,
            isDone
        },
        {
            content: `Naucz się mówić "Wesołych świąt" w innym języku`,
            dayNumber: 12,
            isDone
        },
        {
            content: "Zróbcie bitwę na śnieżki (jeśli nie ma śniegu - bądźcie kreatywni)",
            dayNumber: 14,
            isDone
        },
        {
            content: "Przygotuj ozdobę na drzwi Twojego domu/pokoju",
            dayNumber: 16,
            isDone
        },
        {
            content: "Pokoloruj świąteczną kolorowankę",
            dayNumber: 5,
            isDone
        },
        {
            content: "Zabaw się w Mikołaja. Zrób porządek w zabawkach i przekaż innym dzieciom te, którymi się już nie bawisz",
            dayNumber: 6,
            isDone
        },
        {
            content: "Odwiedź świąteczny jarmark",
            dayNumber: 7,
            isDone
        },
        {
            content: "Ususz plastry pomarańczy",
            dayNumber: 8,
            isDone
        },
        {
            content: "Poznaj świąteczne zwyczaje innych krajów",
            dayNumber: 13,
            isDone
        },
        {
            content: "Pokaż jaki nietypowy zwyczaj świąteczny panuje u Ciebie w domu",
            dayNumber: 15,
            isDone
        },
        {
            content: "Ulepcie z kolegami/koleżankami bałwana (jeśli nie ma śniegu - bądźcie kreatywni)",
            dayNumber: 17,
            isDone
        },
        {
            content: "Naucz się nowej kolędy/pastorałki",
            dayNumber: 19,
            isDone
        },
        {
            content: "Napisz list do świętego Mikołaja",
            dayNumber: 1,
            isDone
        },
        {
            content: "Zagrajcie całą rodziną w ulubioną grę",
            dayNumber: 2,
            isDone
        },
        {
            content: "Wykonaj własnoręcznie ozdobę/upominek dla pani w szkole/przedszkolu",
            dayNumber: 3,
            isDone
        },
        {
            content: "Upiecz z pomocą bliskich świąteczne ciasteczka",
            dayNumber: 4,
            isDone
        },
        {
            content: "Zabierz rodzinę na zimowy spacer",
            dayNumber: 9,
            isDone
        },
        {
            content: "Zrób świąteczną kartkę i wyślij do kogoś ważnego dla Ciebie",
            dayNumber: 11,
            isDone
        },
        {
            content: "Poszukajcie z rodzicami najładniej udekorowanego domu",
            dayNumber: 18,
            isDone
        }
    ];

    let defaultTasksContents = [defaultTasks.map(({ content }) => ({ content }))];
    let tasksContents = ((tasks == null)) ? defaultTasksContents : [(tasks.map(({ content }) => ({ content })))];

    let listOfTasks = ((tasks == null) || (month !== 12) || (JSON.stringify(defaultTasksContents) !== JSON.stringify(tasksContents))) ? defaultTasks : tasks;

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
                                Do dzieła!
                            </button>
                    `;
                    if ((+containerButton.innerText) === 24) {
                        const taskBoxContentParagraph = document.querySelector(".js-taskBox__ContentParagraph");
                        taskBoxContentParagraph.classList.add("taskBox__ContentParagraph--merryChristmassed");
                    };
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

    const renderButtons = (tasks, dayOfMonth, month) => {
        const container = document.querySelector(".js-container");
        let HTMLString = "";

        tasks.forEach((task) => {
            HTMLString +=
                `<button class=
                "containerButton js-containerButton ${((month === 12) && (task.dayNumber === dayOfMonth) && (task.isDone === false)) ? "" : "containerButton--locked"} ${(task.isDone === false) ? "" : "containerButton--done"}" 
                ${((task.dayNumber !== dayOfMonth) || (month !== 12) || (task.isDone === true)) ? "disabled" : ""}>
                        ${task.dayNumber}
                </button>`;
        });

        container.innerHTML = HTMLString;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const render = (dayOfMonth, month) => {
        renderButtons(listOfTasks, dayOfMonth, month);
        const taskBox = document.querySelector(".js-taskBox");
        containerButtonsEvents(listOfTasks, taskBox, dayOfMonth);
    };

    render(dayOfMonth, month);
};