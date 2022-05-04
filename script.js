const addBtn = document.getElementById('add');

// this pulls information that was added to local storage on previous trip out.
const notes = JSON.parse(localStorage.getItem('notes'));


if(notes) {
    notes.forEach(note => addNewNote(note))
}

// Create a note function. Relies on const addBtn
addBtn.addEventListener('click', () => addNewNote(''));

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    // adding functionality to the buttons. Consts have to be present in this level in order to pass through. Outside of this level const and let will not pass into the function.
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked.parse(text)

    deleteBtn.addEventListener('click', () => {
        note.remove();

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })
    // editBtn is being used to lock in the text that was written into the note.

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked.parse(value)

        updateLS()
    })

    document.body.appendChild(note);
}

localStorage.setItem('name', 'Orion')
localStorage.getItem('name')
localStorage.removeItem('name')

// Only strings can be stored into local storage.


// Updates Local Storage actively through each keytype.
function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    // store into local Storage
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Parsing functions with JSON/APIs. Parse turn data into a JavaScript object that can be manipulated.

// Session storage will clear items from local storage on reboot. They are being consumer minded and thier desingn.