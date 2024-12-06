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