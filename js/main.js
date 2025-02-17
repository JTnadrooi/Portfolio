// import debug from 'asitlib.js';

function registerSectionAs(sectionId) {
    console.log('registering section with id ' + sectionId);
    sections.add(sectionId);
}

function scrollToElement(target) {
    console.log('scrolling to section with id ' + target);
    var element = document.getElementById(target);
    element.scrollIntoView({ behavior: "smooth" });
    flashElement(target);

}
function flashElement(elementId) {
    console.log('\tflashing section with id ' + elementId);
    const element = document.getElementById(elementId);
    element.classList.add('flash');
    setTimeout(() => {
        element.classList.remove('flash');
    }, 1000);
}

const sections = document.querySelectorAll('.section');
const buttonContainer = document.getElementById('buttonContainer');
const EMPTY_STRING = '';
const languagesSection = document.getElementById('languages');
const languages = [
    {
        name: "C#/C-Sharp (3.5y)",
        subtopics: ["XNA", "Monogame", ".Net 6, 7 and 8"],
    },
    { name: "HLSL" },
    { name: "BatchScript" },
    { name: "SpellScript" },
    { name: "HTML" },
    {
        name: "CSS",
        subtopics: ["SASS", "SCSS"],
    },
    { name: "JavaScript" },
];

sections.forEach(section => {
    debug.log('starting registering of section with id ' + section.id);

    debug.log('\tcreating navigation button..')

    const newButton = Object.assign(document.createElement('button'), {
        innerHTML: `> ${section.id}`,
        id: `${section.id}Button`,
        onclick: () => scrollToElement(section.id)
    });
    debug.log('\t\tsucces');

    debug.log('\tcreating header..');

    const isProject = section.hasAttribute('project')
    buttonContainer.appendChild(newButton);
    section.insertBefore(Object.assign(document.createElement('h1'), {
        innerHTML: (isProject ? 'P:' : EMPTY_STRING) + `${section.id.toUpperCase()}`,
    }), section.firstChild);


    debug.log('\tregistered.');
});


const ul = document.createElement('ul');

languages.forEach((lang) => {
    const li = document.createElement('li');
    li.textContent = lang.name;

    if (lang.subtopics) {
        const subUl = document.createElement('ul');
        lang.subtopics.forEach((subtopic) => {
            const subLi = document.createElement('li');
            subLi.textContent = subtopic;
            subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
    }

    ul.appendChild(li);
});

languagesSection.appendChild(ul);

console.log(sections);