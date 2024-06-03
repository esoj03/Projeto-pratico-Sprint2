const calendar = document.querySelector('.days');
const classDetailsContainer = document.querySelector('.class-details-container');
const classDetailsList = document.querySelector('.class-details-list');

// Função para buscar os dados das aulas na API
async function fetchClasses(day) {
    try {
        const response = await fetch(`https://sua-api.com/aulas?dia=${day}`);
        const classesData = await response.json();
        return classesData;
    } catch (error) {
        console.error('Erro ao buscar dados das aulas:', error);
        return [];
    }
}

// Função para exibir o cartão de detalhes das aulas
async function showClassDetails(day) {
    // Limpa a lista de detalhes de aula antes de exibir as informações
    classDetailsList.innerHTML = '';

    // Busca os dados das aulas para o dia selecionado
    const classesForDay = await fetchClasses(day);

    if (classesForDay.length > 0) {
        // Exibe as informações das aulas disponíveis para o dia selecionado
        classesForDay.forEach(item => {
            const classItem = document.createElement('li');
            classItem.textContent = `${item.name} - ${item.time}`;
            classDetailsList.appendChild(classItem);
        });
    } else {
        const noClassItem = document.createElement('li');
        noClassItem.textContent = 'Não há aulas disponíveis para este dia.';
        classDetailsList.appendChild(noClassItem);
    }

    // Exibe o cartão de detalhes das aulas
    classDetailsContainer.style.display = 'block';
}

// Event listener para fechar o cartão de detalhes das aulas
document.querySelector('.close-btn').addEventListener('click', () => {
    classDetailsContainer.style.display = 'none';
});

// Event listener para exibir o cartão de detalhes das aulas ao clicar em um dia
function buildCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Adiciona os dias do mês ao calendário
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;

        // Adiciona classe 'today' ao dia atual
        if (i === today.getDate() && currentMonth === today.getMonth()) {
            dayElement.classList.add('today');
        }

        // Adiciona evento de clique para exibir o cartão de detalhes das aulas
        dayElement.addEventListener('click', () => showClassDetails(i));

        calendar.appendChild(dayElement);
    }
}

buildCalendar();
