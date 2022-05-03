const addBtn = document.getElementById('add');

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
    main.innerHTML = marked (text)

    deleteBtn.addEventListener('click', () => {
        note.remove();
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })
    // editBtn is being used to lock in the text that was written into the note.

    document.body.appendChild(note);
}

// 