// Sample candidate data
const candidates = [
    {
        id: 1,
        name: "John Smith",
        party: "Progress Party",
        image: "https://via.placeholder.com/100?text=JS",
        bio: "Experienced leader with a vision for progress."
    },
    {
        id: 2,
        name: "Sarah Johnson",
        party: "Unity Alliance",
        image: "https://via.placeholder.com/100?text=SJ",
        bio: "Dedicated to bringing people together for common goals."
    },
    {
        id: 3,
        name: "Michael Chen",
        party: "Future Forward",
        image: "https://via.placeholder.com/100?text=MC",
        bio: "Innovative thinker with fresh ideas for our community."
    },
    {
        id: 4,
        name: "Emily Williams",
        party: "Green Initiative",
        image: "https://via.placeholder.com/100?text=EW",
        bio: "Committed to sustainable development and environmental protection."
    }
];

// DOM Elements
const sections = {
    registration: document.getElementById('registration-section'),
    candidate: document.getElementById('candidate-section'),
    confirmation: document.getElementById('confirmation-section'),
    thankyou: document.getElementById('thankyou-section')
};

const registrationForm = document.getElementById('registration-form');
const candidatesContainer = document.getElementById('candidates-container');
const castVoteBtn = document.getElementById('cast-vote-btn');
const selectedCandidateInfo = document.getElementById('selected-candidate-info');
const confirmVoteBtn = document.getElementById('confirm-vote');
const changeVoteBtn = document.getElementById('change-vote');
const voteReceipt = document.getElementById('vote-receipt');
const newVoteBtn = document.getElementById('new-vote');

// State variables
let currentVoter = null;
let selectedCandidate = null;

// Initialize the application
function init() {
    showSection('registration');
    renderCandidates();
    setupEventListeners();
}

// Show a specific section and hide others
function showSection(sectionName) {
    // Hide all sections
    Object.values(sections).forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the requested section
    sections[sectionName].classList.add('active');
}

// Render candidate cards
function renderCandidates() {
    candidatesContainer.innerHTML = '';
    
    candidates.forEach(candidate => {
        const card = document.createElement('div');
        card.className = 'candidate-card';
        card.dataset.id = candidate.id;
        
        card.innerHTML = `
            <img src="${candidate.image}" alt="${candidate.name}" class="candidate-image">
            <h3>${candidate.name}</h3>
            <p>${candidate.party}</p>
            <p class="bio">${candidate.bio}</p>
        `;
        
        card.addEventListener('click', () => selectCandidate(candidate));
        candidatesContainer.appendChild(card);
    });
}

// Handle candidate selection
function selectCandidate(candidate) {
    selectedCandidate = candidate;
    
    // Remove selected class from all cards
    document.querySelectorAll('.candidate-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to the clicked card
    document.querySelector(`.candidate-card[data-id="${candidate.id}"]`).classList.add('selected');
    
    // Enable the cast vote button
    castVoteBtn.disabled = false;
}

// Setup event listeners
function setupEventListeners() {
    // Registration form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const voterId = document.getElementById('voter-id').value;
        const voterName = document.getElementById('voter-name').value;
        const voterEmail = document.getElementById('voter-email').value;
        const voterDob = document.getElementById('voter-dob').value;
        
        // Simple validation
        if (!voterId || !voterName || !voterEmail || !voterDob) {
            alert('Please fill in all fields');
            return;
        }
        
        // Check if voter is at least 18 years old
        const dob = new Date(voterDob);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age < 18) {
            alert('You must be at least 18 years old to vote');
            return;
        }
        
        // Save voter information
        currentVoter = {
            id: voterId,
            name: voterName,
            email: voterEmail,
            dob: voterDob
        };
        
        // Move to candidate selection
        showSection('candidate');
    });
    
    // Cast vote button
    castVoteBtn.addEventListener('click', function() {
        if (!selectedCandidate) {
            alert('Please select a candidate');
            return;
        }
        
        // Display confirmation information
        selectedCandidateInfo.innerHTML = `
            <h3>${selectedCandidate.name}</h3>
            <p>Party: ${selectedCandidate.party}</p>
            <p>${selectedCandidate.bio}</p>
        `;
        
        showSection('confirmation');
    });
    
    // Confirm vote
    confirmVoteBtn.addEventListener('click', function() {
        // In a real application, this would send the vote to a server
        // For this demo, we'll just simulate it
        
        // Generate a vote receipt
        const voteId = 'VOTE-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const timestamp = new Date().toLocaleString();
        
        voteReceipt.innerHTML = `
            <p><strong>Vote ID:</strong> ${voteId}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>Voter:</strong> ${currentVoter.name} (${currentVoter.id})</p>
            <p><strong>Candidate:</strong> ${selectedCandidate.name}</p>
            <p><strong>Party:</strong> ${selectedCandidate.party}</p>
        `;
        
        showSection('thankyou');
    });
    
    // Change vote
    changeVoteBtn.addEventListener('click', function() {
        showSection('candidate');
    });
    
    // Start new vote
    newVoteBtn.addEventListener('click', function() {
        // Reset form and selections
        registrationForm.reset();
        selectedCandidate = null;
        currentVoter = null;
        
        // Remove selected class from candidate cards
        document.querySelectorAll('.candidate-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Disable cast vote button
        castVoteBtn.disabled = true;
        
        // Return to registration
        showSection('registration');
    });
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);