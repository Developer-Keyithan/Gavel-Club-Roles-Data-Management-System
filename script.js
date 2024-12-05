// Define the API URL
const apiUrl = 'http://localhost:3000/api/admin';

// Fetch the latest player data when the page loads
window.onload = () => {
    fetchLatestPlayerData();
};

// Function to fetch the latest player data from MongoDB
async function fetchLatestPlayerData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const latestPlayer = data[data.length - 1]; // Get the last entry

        // Populate the table with the latest data
        document.getElementById('sessionCell').textContent = latestPlayer.session;
        document.getElementById('themeCell').textContent = latestPlayer.theme;
        document.getElementById('generalEvaluatorCell').textContent = latestPlayer.general_evoluator;
        document.getElementById('grammarianCell').textContent = latestPlayer.gramarian;
        document.getElementById('timerCell').textContent = latestPlayer.timer;
        document.getElementById('ahCounterCell').textContent = latestPlayer.ah_counter;
        document.getElementById('speaker1Cell').textContent = latestPlayer.prepare_speaker_one;
        document.getElementById('speaker2Cell').textContent = latestPlayer.prepare_speaker_two;
        document.getElementById('roundRobinMasterCell').textContent = latestPlayer.round_robin_master;
        document.getElementById('tableTopicMasterCell').textContent = latestPlayer.table_topic_master;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to handle form submission and POST the data to the server
document.getElementById('roleForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const playerData = {
        session: formData.get('session'),
        theme: formData.get('theme'),
        general_evoluator: formData.get('generalEvaluator'),
        gramarian: formData.get('grammarian'),
        timer: formData.get('timer'),
        ah_counter: formData.get('ahCounter'),
        prepare_speaker_one: formData.get('speaker1'),
        prepare_speaker_two: formData.get('speaker2'),
        round_robin_master: formData.get('roundRobinMaster'),
        table_topic_master: formData.get('tableTopicMaster')
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerData)
        });

        if (response.ok) {
            fetchLatestPlayerData(); // Refresh data after successful POST
        } else {
            console.error('Failed to save data');
        }
    } catch (error) {
        console.error('Error submitting data:', error);
    }
});

// Function to handle editing a field
function edit(role) {
    const cell = document.getElementById(`${role}Cell`);
    const currentValue = cell.textContent;

    // Replace text with an input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    cell.textContent = '';
    cell.appendChild(input);

    // Show the save button and hide the edit button
    toggleButtons(role, false);
}

// Function to handle saving the edited field
async function save(role) {
    const cell = document.getElementById(`${role}Cell`);
    const input = cell.querySelector('input');
    const newValue = input.value;

    // Prepare data to be updated
    const updatedPlayer = {};
    updatedPlayer[role] = newValue;

    try {
        const response = await fetch(`${apiUrl}/${role}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPlayer)
        });

        if (response.ok) {
            fetchLatestPlayerData(); // Refresh data after successful update
        } else {
            console.error('Failed to update data');
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }

    // Replace input field with updated text and show the edit button again
    cell.textContent = newValue;
    toggleButtons(role, true);
}

// Function to toggle visibility of edit and save buttons
function toggleButtons(role, isEditMode) {
    const editButton = document.querySelector(`#${role}Cell + .table-actions button:nth-child(1)`);
    const saveButton = document.querySelector(`#${role}Cell + .table-actions button:nth-child(2)`);

    editButton.style.display = isEditMode ? 'inline-block' : 'none';
    saveButton.style.display = isEditMode ? 'none' : 'inline-block';
}
