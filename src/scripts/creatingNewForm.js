export function creatingNewForm() {
    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const button = document.createElement('button');
    button.innerText = 'Create';
    button.addEventListener('click', function() {
        console.log('My created form');
    });
    //  label.appendChild(input);
    //  form.appendChild(label);
    // form.appendChild(button);

    // input.setAttribute('type', 'text');

    // form.appendChild();

    const createWrapper = document.querySelector('.create-wrapper');
    console.log('create wrapper', createWrapper)

    // createWrapper.appendChild(form);


    return 'New Form'
}