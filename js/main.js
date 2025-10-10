/**
 * Main Application Logic
 * Handles navigation, user interactions, and state management
 */

class AlexNetApp {
    constructor() {
        this.currentStage = 1;
        this.totalStages = 9;
        this.isStarted = false;
        this.selectedImage = 'cat';
        
        this.init();
    }

    init() {
        // Set current date
        this.setCurrentDate();
        
        // Initialize event listeners
        this.setupEventListeners();
        
        // Update UI for initial state
        this.updateStageInfo(1);
        this.updateProgressBar(1);
        this.updateButtonStates();
    }

    setCurrentDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = new Date().toLocaleDateString('en-US', options);
        }
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('start-btn')?.addEventListener('click', () => this.startProcess());
        document.getElementById('next-btn')?.addEventListener('click', () => this.nextStage());
        document.getElementById('prev-btn')?.addEventListener('click', () => this.prevStage());
        document.getElementById('reset-btn')?.addEventListener('click', () => this.reset());

        // Sample image selection
        document.querySelectorAll('.sample-image-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectImage(e.currentTarget));
        });

        // Smooth scroll to visualization when starting
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                setTimeout(() => {
                    document.getElementById('visualization')?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            });
        }
    }

    startProcess() {
        this.isStarted = true;
        this.currentStage = 1;
        this.updateVisualization();
        this.updateButtonStates();
    }

    nextStage() {
        if (this.currentStage < this.totalStages) {
            const prevStage = this.currentStage;
            this.currentStage++;
            this.animateStageTransition(prevStage, this.currentStage);
        }
    }

    prevStage() {
        if (this.currentStage > 1) {
            const prevStage = this.currentStage;
            this.currentStage--;
            this.animateStageTransition(prevStage, this.currentStage);
        }
    }

    reset() {
        this.isStarted = false;
        this.currentStage = 1;
        this.updateVisualization();
        this.updateButtonStates();
        
        // Smooth scroll to top
        document.getElementById('visualization')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    selectImage(cardElement) {
        // Update active state
        document.querySelectorAll('.sample-image-card').forEach(card => {
            card.classList.remove('active');
        });
        cardElement.classList.add('active');
        
        // Update selected image
        this.selectedImage = cardElement.dataset.image;
        
        // If we're at the output stage, redraw to show new predictions
        if (this.currentStage === 9 && visualizer) {
            visualizer.draw(9);
        }
    }

    updateVisualization() {
        if (visualizer) {
            visualizer.draw(this.currentStage);
        }
        this.updateStageInfo(this.currentStage);
        this.updateProgressBar(this.currentStage);
    }

    animateStageTransition(fromStage, toStage) {
        if (visualizer) {
            visualizer.animateTransition(fromStage, toStage, () => {
                this.updateStageInfo(toStage);
                this.updateProgressBar(toStage);
                this.updateButtonStates();
            });
        } else {
            this.updateVisualization();
        }
        this.updateButtonStates();
    }

    updateStageInfo(stageId) {
        const stage = AlexNetArchitecture.getStage(stageId);
        if (!stage) return;

        // Update title
        const titleElement = document.getElementById('stage-title');
        if (titleElement) {
            titleElement.textContent = `Stage ${stageId}: ${stage.name}`;
        }

        // Update description
        const descElement = document.getElementById('stage-description');
        if (descElement) {
            descElement.innerHTML = `<p>${stage.description}</p>`;
        }

        // Update specifications
        const specsElement = document.getElementById('stage-specs');
        if (specsElement) {
            let specsHTML = '<h4>Technical Specifications:</h4><ul>';
            stage.specs.forEach(spec => {
                specsHTML += `<li>${spec}</li>`;
            });
            specsHTML += '</ul>';
            
            // Add parameter count
            if (stage.parameters > 0) {
                specsHTML += `<p style="margin-top: 0.5rem; font-weight: 600;">Parameters: ${this.formatNumber(stage.parameters)}</p>`;
            }
            
            // Add formula if available
            if (stage.formula) {
                specsHTML += `
                    <div class="formula-section">
                        <h4>Mathematical Formula:</h4>
                        <div class="formula-box">${stage.formula}</div>
                        <p class="formula-explanation">${stage.formulaExplanation}</p>
                    </div>
                `;
            }
            
            // Add "why it works" explanation
            if (stage.whyItWorks) {
                specsHTML += `
                    <div class="why-section">
                        <h4>💡 Why This Works:</h4>
                        <p>${stage.whyItWorks}</p>
                    </div>
                `;
            }
            
            // Add "what it learns" explanation
            if (stage.whatItLearns) {
                specsHTML += `
                    <div class="learns-section">
                        <h4>🎯 What It Learns:</h4>
                        <p>${stage.whatItLearns}</p>
                    </div>
                `;
            }
            
            specsElement.innerHTML = specsHTML;
        }

        // Update progress text
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = `Step ${stageId} of ${this.totalStages}`;
        }
    }

    updateProgressBar(stageId) {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const percentage = (stageId / this.totalStages) * 100;
            progressFill.style.width = `${percentage}%`;
        }
    }

    updateButtonStates() {
        const startBtn = document.getElementById('start-btn');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const resetBtn = document.getElementById('reset-btn');

        if (!this.isStarted) {
            // Before starting
            if (startBtn) startBtn.disabled = false;
            if (nextBtn) nextBtn.disabled = true;
            if (prevBtn) prevBtn.disabled = true;
            if (resetBtn) resetBtn.disabled = true;
        } else {
            // After starting
            if (startBtn) startBtn.disabled = true;
            if (resetBtn) resetBtn.disabled = false;
            
            // Previous button
            if (prevBtn) {
                prevBtn.disabled = this.currentStage <= 1;
            }
            
            // Next button
            if (nextBtn) {
                nextBtn.disabled = this.currentStage >= this.totalStages;
                
                // Change text for last stage
                if (this.currentStage >= this.totalStages) {
                    nextBtn.textContent = 'Complete';
                } else {
                    nextBtn.textContent = 'Next Step';
                }
            }
        }
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Additional helper methods
    getTotalParameters() {
        return AlexNetArchitecture.getTotalParameters();
    }

    getStageInfo(stageId) {
        return AlexNetArchitecture.getStage(stageId);
    }
}

// Initialize application when DOM is ready
let app = null;

document.addEventListener('DOMContentLoaded', () => {
    app = new AlexNetApp();
    
    // Display total parameters info in console
    console.log(`AlexNet Total Parameters: ${app.formatNumber(app.getTotalParameters())}`);
    console.log('Interactive CNN Visualization initialized successfully!');
    
    // Initialize explainability demos after a short delay
    setTimeout(() => {
        if (explainabilityEngine) {
            explainabilityEngine.demonstrateConvolution();
            explainabilityEngine.demonstratePooling();
            explainabilityEngine.demonstrateReLU();
            explainabilityEngine.drawFeatureMapProgression('feature-maps-demo', 1);
        }
    }, 500);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!app.isStarted) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'n':
            case 'N':
                if (app.currentStage < app.totalStages) {
                    app.nextStage();
                }
                break;
            case 'ArrowLeft':
            case 'p':
            case 'P':
                if (app.currentStage > 1) {
                    app.prevStage();
                }
                break;
            case 'r':
            case 'R':
                app.reset();
                break;
            case ' ':
                e.preventDefault();
                if (!app.isStarted) {
                    app.startProcess();
                } else if (app.currentStage < app.totalStages) {
                    app.nextStage();
                }
                break;
        }
    });

    // Add tooltip functionality (optional enhancement)
    addTooltips();
});

/**
 * Add hover tooltips for technical terms
 */
function addTooltips() {
    const technicalTerms = {
        'convolutional': 'A layer that applies filters to detect features in images',
        'pooling': 'Reduces spatial dimensions while retaining important features',
        'ReLU': 'Rectified Linear Unit: activation function that outputs max(0, x)',
        'softmax': 'Converts raw scores into probabilities that sum to 1',
        'stride': 'Number of pixels the filter moves at each step',
        'kernel': 'Small matrix of weights used to detect patterns',
        'feature map': 'Output of a convolutional layer showing detected features',
        'fully connected': 'Layer where every neuron connects to every neuron in previous layer'
    };

    // This is a simple implementation - in production, you might use a library
    document.querySelectorAll('.stage-description, .stage-specs').forEach(element => {
        let html = element.innerHTML;
        
        Object.keys(technicalTerms).forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            html = html.replace(regex, match => {
                return `<span class="tooltip-term" title="${technicalTerms[term.toLowerCase()]}">${match}</span>`;
            });
        });
        
        element.innerHTML = html;
    });

    // Add CSS for tooltip terms
    const style = document.createElement('style');
    style.textContent = `
        .tooltip-term {
            border-bottom: 1px dotted #3b82f6;
            cursor: help;
            color: #2563eb;
        }
        .tooltip-term:hover {
            background-color: #eff6ff;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Print-friendly version trigger
 */
function printDocument() {
    window.print();
}

// Expose functions to global scope if needed
window.AlexNetApp = AlexNetApp;
window.printDocument = printDocument;

