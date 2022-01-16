const saveButton = document.querySelector("button.save");
const form = document.querySelector('form');
const url1 = 'http://localhost:5000/data1';
const url2 = 'http://localhost:5000/data2';
const url3 = 'http://localhost:5000/data3';
const numOfEvents = document.querySelectorAll('.number');
const nameOfEvents = document.querySelectorAll('.name');
const dateOfEvents = document.querySelectorAll('.date');
const timeOfEvents = document.querySelectorAll('.time');
const importanceOfEvents = document.querySelectorAll('.importance');
const noteOfEvents = document.querySelectorAll('.note');
const logs = document.querySelectorAll('.logs');


// Creating an artificial delay
const delay = ms => {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}




/**
 * Event loading function.
 * @param {string} url - request address.
 * @param {number} ms - Delay amount.
 * @param {number} i -The number of the area where information about the event will be displayed.
 * @param {number} j - Event number.
 * @param {number} k - Line number where query logs will be displayed.
 */
function loadTodo(url, ms, i, j, k) {
    logs[k].textContent = `Loading of ${j} task has started`;
    return delay(ms)
        .then(() => {
                return fetch(url)
            }

        )
        .then((res) => res.json())
        .then((data) => {

            numOfEvents[i].textContent = data.number;
            nameOfEvents[i].textContent = data.name;
            dateOfEvents[i].textContent = data.date;
            timeOfEvents[i].textContent = data.time;
            importanceOfEvents[i].textContent = data.importance;
            noteOfEvents[i].textContent = data.note;
            logs[k + 1].textContent = `Loading of ${j} task completed`;
        })
        .catch(e => console.error(e))
}

// "Save" button click handler function
saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const jsonData = {};
    for (const [key, value] of formData) {
        jsonData[key] = value;
    }
    form.reset();
    const event = new Event({
        number: jsonData.number,
        name: jsonData.name,
        date: jsonData.date,
        time: jsonData.time,
        importance: jsonData.importance,
        note: jsonData.note
    });
    const eventNum = event.number;
    fetch('http://localhost:5000/event', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
        .then((res) => {
            if (res.ok) {
                res.json()
                    .then((data) => {
                        numOfEvents[eventNum - 1].textContent = data.number;
                        nameOfEvents[eventNum - 1].textContent = data.name;
                        dateOfEvents[eventNum - 1].textContent = data.date;
                        timeOfEvents[eventNum - 1].textContent = data.time;
                        importanceOfEvents[eventNum - 1].textContent = data.importance;
                        noteOfEvents[eventNum - 1].textContent = data.note;
                    });

            } else {
                res.json()
                    .then((data) => alert(data))
            }
        });
});
/** Class representing an event. */
class Event {
    /**
     * Create an event.
     * @param {object} params - Event Information.
     */
    constructor(params) {
        this.number = params.number,
            this.name = params.name,
            this.date = params.date,
            this.time = params.time,
            this.importance = params.importance,
            this.note = params.note
    };
};

loadTodo(url1, 1000, 0, 1, 0)
    .then(() => loadTodo(url2, 3000, 1, 2, 2))
    .then(() => loadTodo(url3, 3000, 2, 3, 4))





// loadTodo(url3, 3000, 2, 3);