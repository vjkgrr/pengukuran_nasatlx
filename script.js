// Fungsi untuk menyimpan data biodata
function saveBioAndProceed() {
    const nama = document.getElementById('nama').value;
    const usia = document.getElementById('usia').value;
    const pekerjaan = document.getElementById('pekerjaan').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;


    localStorage.setItem('nama', nama);
    localStorage.setItem('usia', usia);
    localStorage.setItem('pekerjaan', pekerjaan);
    localStorage.setItem('email', email);
    localStorage.setItem('gender', gender);

    window.location.href = 'skala.html';
}

// Fungsi untuk menyimpan skor skala
function saveScoresAndNavigate() {
    const scores = {
        mental: document.getElementById('mentalBar').value || 0,
        physical: document.getElementById('physicalBar').value || 0,
        time: document.getElementById('timeBar').value || 0,
        performance: document.getElementById('performanceBar').value || 0,
        effort: document.getElementById('effortBar').value || 0,
        frustration: document.getElementById('frustrationBar').value || 0,
    };

    Object.entries(scores).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });

    window.location.href = 'vs.html';
}



// Fungsi untuk menyimpan hasil perbandingan
function saveComparison(key, dimension) {
    const weights = {
        mental: 50, physical: 30, time: 40, performance: 20, effort: 30, frustration: 40,
    };

    localStorage.setItem(key, dimension);

    const currentScore = parseInt(localStorage.getItem(dimension)) || 0;
    const newScore = currentScore + (weights[dimension] || 0);
    localStorage.setItem(dimension, newScore);

    const buttons = document.querySelectorAll(`[data-key="${key}"]`);
    buttons.forEach(button => button.classList.remove('selected'));
    document.getElementById(`${key}_${dimension}`).classList.add('selected');
}

// Fungsi untuk memuat pilihan sebelumnya
function loadSavedComparisons() {
    const comparisons = [];

    comparisons.forEach(key => {
        const savedValue = localStorage.getItem(key);
        if (savedValue) {
            const selectedButton = document.getElementById(`${key}_${savedValue}`);
            if (selectedButton) {
                selectedButton.classList.add('selected');
            }
        }
    });
}

// Fungsi untuk validasi dan navigasi
function navigateToScoring() {
    const comparisons = [
        'mental_vs_physical', 'time_vs_effort', 'mental_vs_time', 
        'physical_vs_effort', 'mental_vs_performance', 'time_vs_frustration',
        'performance_vs_effort', 'mental_vs_frustration', 'physical_vs_time', 
        'physical_vs_frustration', 'time_vs_performance', 'performance_vs_frustration', 
        'effort_vs_frustration', 'mental_vs_effort'
    ];

    let isValid = true;

    comparisons.forEach(key => {
        if (!localStorage.getItem(key)) {
            alert(`Silakan pilih untuk ${key.replace('_', ' ')}`);
            isValid = false;
        }
    });

    if (isValid) {
        window.location.href = 'skoring.html';
    }
}

// Muat pilihan yang tersimpan saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', loadSavedComparisons);


function displayFinalScores() {
    const dimensions = ['mental', 'physical', 'time', 'performance', 'effort', 'frustration'];
    let total = 0;

    dimensions.forEach(dim => {
        const score = parseInt(localStorage.getItem(dim)) || 0;
        document.getElementById(`${dim}Score`).textContent = score;
        document.getElementById(`${dim}Bar`).style.width = `${score}%`;
        total += score;
    });

    // Hitung rata-rata untuk semua dimensi
    const average = (total / dimensions.length).toFixed(2);
    document.getElementById('totalScore').textContent = average;

    
    // Tentukan kategori
    let category = "Beban Kerja Ringan";
    if (average > 33 && average <= 66) category = "Beban Kerja Sedang";
    else if (average > 66) category = "Beban Kerja Berat";

    document.getElementById('totalCategory').textContent = category;
}

document.addEventListener('DOMContentLoaded', displayFinalScores);

