const add_modal = document.getElementById('add-modal');
const edit_modal = document.getElementById('edit-modal');
const render_root = document.getElementById('render-root');
let cur_index;

let modal_status = 'closed';

let add_input_field = {
    nome: document.getElementById('add-nome-input'),
    numero: document.getElementById('add-numero-input'),
    email: document.getElementById('add-email-input'),
    submit_button: document.getElementById('add-submit-button'),
    cancel_button: document.getElementById('add-cancel-button'),
}
let edit_input_field = {
    nome: document.getElementById('edit-nome-input'),
    numero: document.getElementById('edit-numero-input'),
    email: document.getElementById('edit-email-input'),
    submit_button: document.getElementById('edit-submit-button'),
    cancel_button: document.getElementById('edit-cancel-button'),
}

let contatos = [{ nome: 'Leonardo Marinho', numero: '12991655701', email: 'leo.ccodes@gmail.com' }];


function start() {
    document.getElementById('add-button').addEventListener('click', () => {
        toggle_modal('add_modal');
    });

    render_list();
    setup_modal_buttons();
}

function toggle_modal(modal) {
    switch (modal) {
        case ('add_modal'):
            switch (modal_status) {
                case ('closed'): add_modal.style.display = 'flex'; modal_status = 'open'; break;
                case ('open'): add_modal.style.display = 'none'; modal_status = 'closed'; break;
            }
            break;
        case ('edit_modal'):
            switch (modal_status) {
                case ('closed'): edit_modal.style.display = 'flex'; modal_status = 'open'; break;
                case ('open'): edit_modal.style.display = 'none'; modal_status = 'closed'; break;
            }
            break;
    }

}

function render_list() {
    contatos.forEach((contato, index) => {
        contact_element = `
        <tr>
            <td>
                <div class="contact-info">
                    <img class="contact-avatar" src="./src/images/avatar.png" alt="">
                    <span>
                        ${contato.nome}
                    </span>
                </div>
            </td>
            <td>
                ${contato.numero}
            </td>
            <td>
            ${contato.email}
            </td>
            <td>
                <div class="actions">
                    <i data-index="${index}" class="fi fi-br-pencil edit"></i>
                    <i data-index="${index}" class="fi fi-br-trash delete"></i>
                </div>
            </td>
        </tr>`;
        render_root.innerHTML += contact_element;
    });
    setup_buttons();
}

function clear_render() {
    render_root.innerHTML = '';
}

function setup_buttons() {
    let arr_delete_button = document.getElementsByClassName('delete');
    Array.from(arr_delete_button).forEach((button) => {
        button.addEventListener('click', () => {
            console.log('deletou');
            cur_index = button.getAttribute('data-index');
            delete_contact(cur_index);
            clear_render();
            render_list();
        })
    });

    let arr_edit_button = document.getElementsByClassName('edit');
    Array.from(arr_edit_button).forEach((button) => {
        console.log('editando');
        button.addEventListener('click', () => {
            cur_index = button.getAttribute('data-index');
            let cur_contact = contatos[cur_index];
            console.log(cur_contact);
            toggle_modal('edit_modal');
            edit_input_field.nome.value = cur_contact.nome;
            edit_input_field.numero.value = cur_contact.numero;
            edit_input_field.email.value = cur_contact.email;


        })
    });
}

function setup_modal_buttons() {
    add_input_field.submit_button.addEventListener('click', () => {
        add_contact(add_input_field.nome.value, add_input_field.numero.value, add_input_field.email.value);
        toggle_modal('add_modal');
        clear_render();
        render_list();
    });
    add_input_field.cancel_button.addEventListener('click', () => {
        toggle_modal('add_modal');
    });

    edit_input_field.submit_button.addEventListener('click', () => {
        update_contact(cur_index,edit_input_field.nome.value, edit_input_field.numero.value, edit_input_field.email.value);
        toggle_modal('edit_modal');
        clear_render();
        render_list();
    });
    edit_input_field.cancel_button.addEventListener('click', () => {
        toggle_modal('edit_modal');
    });
}

function add_contact(nome, numero, email) {

    contatos.push({ nome, numero, email });

}
function update_contact(index, cur_nome, cur_numero, cur_email) {

    contatos[index].nome = cur_nome;
    contatos[index].numero = cur_numero;
    contatos[index].email = cur_email;

}

function delete_contact(index) {
    contatos.splice(index, 3);
}