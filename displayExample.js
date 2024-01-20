function displayExample(nomExo, exemple) {
    const examples = document.getElementById('examples');
    examples.innerHTML = ''; // Clear previous example

    if (exemple.length !== 0) {
        examples.style.display = 'block';

        const exampleTitle = document.createElement('h3');
        exampleTitle.textContent = 'Exemple :';
        examples.appendChild(exampleTitle);

        exemple.forEach((ex) => {
            const exampleParagraph = document.createElement('p');
            exampleParagraph.textContent = ex;
            examples.appendChild(exampleParagraph);
        });
    } else {
        examples.style.display = 'none';
    }
}