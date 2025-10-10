/**
 * Animation and Visualization Engine
 * Handles the canvas rendering and animations for AlexNet visualization
 */

class CNNVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.currentStage = 1;
        this.animationFrame = null;
        this.particles = [];
        this.isAnimating = false;
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth - 64; // Account for padding
        this.canvas.height = 500;
    }

    /**
     * Draw the current stage visualization
     */
    draw(stageId) {
        this.currentStage = stageId;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const stage = AlexNetArchitecture.getStage(stageId);
        if (!stage) return;

        // Draw based on stage type
        switch (stage.visualConfig.type) {
            case 'input':
                this.drawInputLayer(stage);
                break;
            case 'conv':
                this.drawConvLayer(stage);
                break;
            case 'pool':
                this.drawPoolLayer(stage);
                break;
            case 'fc':
                this.drawFCLayer(stage);
                break;
            case 'output':
                this.drawOutputLayer(stage);
                break;
        }

        // Draw stage label
        this.drawStageLabel(stage);

        // Draw feature map hints for conv layers
        if (stage.visualConfig.type === 'conv' && stage.id <= 5) {
            this.drawFeatureMapVisualization(stage);
        }
    }

    /**
     * Draw input layer visualization
     */
    drawInputLayer(stage) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const size = 150;

        // Draw 3D-like image representation
        this.draw3DBox(centerX - size/2, centerY - size/2, size, size, 20, stage.visualConfig.color);
        
        // Draw RGB channels representation
        const channelSize = 40;
        const startX = centerX + size/2 + 30;
        const colors = ['#ef4444', '#22c55e', '#3b82f6']; // R, G, B
        
        colors.forEach((color, i) => {
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = 0.7;
            this.ctx.fillRect(startX, centerY - channelSize/2 + i * 5, channelSize, channelSize);
            this.ctx.globalAlpha = 1.0;
        });

        // Draw dimensions label
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('224×224×3', centerX, centerY + size/2 + 30);
    }

    /**
     * Draw convolutional layer visualization
     */
    drawConvLayer(stage) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Calculate dimensions for visualization
        const baseSize = 120;
        const depth = Math.min(stage.visualConfig.depth / 4, 30);
        
        // Draw multiple feature maps stacked
        const numMapsToShow = 5;
        for (let i = numMapsToShow - 1; i >= 0; i--) {
            const offset = i * 8;
            this.draw3DBox(
                centerX - baseSize/2 + offset,
                centerY - baseSize/2 + offset,
                baseSize,
                baseSize,
                depth,
                this.lightenColor(stage.visualConfig.color, i * 10)
            );
        }

        // Draw filter visualization on the left
        this.drawFilters(centerX - baseSize - 80, centerY - 40);

        // Draw dimensions and info
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(stage.outputShape, centerX, centerY + baseSize/2 + 50);
        
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#64748b';
        this.ctx.fillText(`${stage.visualConfig.depth} feature maps`, centerX, centerY + baseSize/2 + 70);
    }

    /**
     * Draw pooling layer visualization
     */
    drawPoolLayer(stage) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const size = 100;
        const depth = 25;

        // Draw pooling operation
        // Before pooling (larger, faded)
        this.ctx.globalAlpha = 0.3;
        this.draw3DBox(centerX - size - 60, centerY - size/2, size * 1.5, size * 1.5, depth, '#94a3b8');
        this.ctx.globalAlpha = 1.0;

        // Arrow
        this.drawArrow(centerX - 30, centerY, centerX + 30, centerY);

        // After pooling (smaller, solid)
        this.draw3DBox(centerX + 40, centerY - size/2, size, size, depth, stage.visualConfig.color);

        // Labels
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Before', centerX - 60, centerY + size/2 + 30);
        this.ctx.fillText('After (Max Pool)', centerX + 90, centerY + size/2 + 30);
        
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillText(stage.outputShape, centerX + 90, centerY + size/2 + 50);
    }

    /**
     * Draw fully connected layer visualization
     */
    drawFCLayer(stage) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw neurons as circles
        const inputNeurons = 12;
        const outputNeurons = 12;
        const neuronRadius = 8;
        const layerSpacing = 200;
        const neuronSpacing = 30;

        // Input layer
        for (let i = 0; i < inputNeurons; i++) {
            const y = centerY - (inputNeurons * neuronSpacing) / 2 + i * neuronSpacing;
            this.drawNeuron(centerX - layerSpacing/2, y, neuronRadius, '#64748b');
        }

        // Output layer
        for (let i = 0; i < outputNeurons; i++) {
            const y = centerY - (outputNeurons * neuronSpacing) / 2 + i * neuronSpacing;
            this.drawNeuron(centerX + layerSpacing/2, y, neuronRadius, stage.visualConfig.color);
        }

        // Draw some connections
        this.ctx.strokeStyle = '#cbd5e1';
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.3;
        
        for (let i = 0; i < inputNeurons; i += 2) {
            for (let j = 0; j < outputNeurons; j += 2) {
                const y1 = centerY - (inputNeurons * neuronSpacing) / 2 + i * neuronSpacing;
                const y2 = centerY - (outputNeurons * neuronSpacing) / 2 + j * neuronSpacing;
                this.ctx.beginPath();
                this.ctx.moveTo(centerX - layerSpacing/2 + neuronRadius, y1);
                this.ctx.lineTo(centerX + layerSpacing/2 - neuronRadius, y2);
                this.ctx.stroke();
            }
        }
        this.ctx.globalAlpha = 1.0;

        // Labels
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${stage.visualConfig.neurons} neurons`, centerX, centerY + 180);
        
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#64748b';
        this.ctx.fillText('Fully Connected Layer', centerX, centerY + 200);
    }

    /**
     * Draw feature map visualization (what the layer "sees")
     */
    drawFeatureMapVisualization(stage) {
        // Add subtle feature map hints to conv layers
        if (stage.visualConfig.type !== 'conv') return;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Draw example feature patterns
        const patterns = [
            { name: 'Edges', color: '#ef4444' },
            { name: 'Textures', color: '#f59e0b' },
            { name: 'Patterns', color: '#10b981' }
        ];

        let startX = centerX - 100;
        const startY = centerY + 100;

        patterns.forEach((pattern, i) => {
            // Small colored box
            this.ctx.fillStyle = pattern.color;
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillRect(startX + i * 70, startY, 50, 50);
            this.ctx.globalAlpha = 1.0;

            // Label
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(pattern.name, startX + i * 70 + 25, startY + 65);
        });
        this.ctx.textAlign = 'left';
    }

    /**
     * Draw output layer with probability bars
     */
    drawOutputLayer(stage) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const selectedImage = document.querySelector('.sample-image-card.active')?.dataset.image || 'cat';
        const predictions = AlexNetArchitecture.getPredictions(selectedImage);

        const barWidth = 250;
        const barHeight = 25;
        const barSpacing = 32;
        const startY = centerY - (predictions.length * barSpacing) / 2;

        // Title
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Top 10 Predictions', centerX, startY - 30);

        // Draw probability bars
        predictions.forEach((pred, i) => {
            const y = startY + i * barSpacing;
            const fillWidth = barWidth * pred.probability;

            // Background bar
            this.ctx.fillStyle = '#e2e8f0';
            this.ctx.fillRect(centerX - barWidth/2, y, barWidth, barHeight);

            // Filled bar (gradient)
            const gradient = this.ctx.createLinearGradient(centerX - barWidth/2, y, centerX - barWidth/2 + fillWidth, y);
            if (i === 0) {
                gradient.addColorStop(0, '#10b981');
                gradient.addColorStop(1, '#059669');
            } else {
                gradient.addColorStop(0, '#3b82f6');
                gradient.addColorStop(1, '#2563eb');
            }
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(centerX - barWidth/2, y, fillWidth, barHeight);

            // Class name
            this.ctx.fillStyle = '#1e293b';
            this.ctx.font = i === 0 ? 'bold 12px Arial' : '11px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(pred.class, centerX - barWidth/2, y - 5);

            // Percentage
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`${(pred.probability * 100).toFixed(1)}%`, centerX + barWidth/2 + 50, y + 17);
        });
    }

    /**
     * Helper: Draw a 3D box
     */
    draw3DBox(x, y, width, height, depth, color) {
        // Front face
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width, height);

        // Top face
        this.ctx.fillStyle = this.lightenColor(color, 30);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + depth, y - depth);
        this.ctx.lineTo(x + width + depth, y - depth);
        this.ctx.lineTo(x + width, y);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();

        // Right face
        this.ctx.fillStyle = this.lightenColor(color, -20);
        this.ctx.beginPath();
        this.ctx.moveTo(x + width, y);
        this.ctx.lineTo(x + width + depth, y - depth);
        this.ctx.lineTo(x + width + depth, y + height - depth);
        this.ctx.lineTo(x + width, y + height);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    /**
     * Helper: Draw filters
     */
    drawFilters(x, y) {
        const filterSize = 20;
        const spacing = 4;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const brightness = Math.random() * 100 + 100;
                this.ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
                this.ctx.fillRect(
                    x + j * (filterSize + spacing),
                    y + i * (filterSize + spacing),
                    filterSize,
                    filterSize
                );
            }
        }

        // Label
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Filters', x + 30, y + 80);
    }

    /**
     * Helper: Draw a neuron
     */
    drawNeuron(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    /**
     * Helper: Draw an arrow
     */
    drawArrow(fromX, fromY, toX, toY) {
        const headLength = 15;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        this.ctx.strokeStyle = '#3b82f6';
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.lineWidth = 3;

        // Line
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();

        // Arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(
            toX - headLength * Math.cos(angle - Math.PI / 6),
            toY - headLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(
            toX - headLength * Math.cos(angle + Math.PI / 6),
            toY - headLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.closePath();
        this.ctx.fill();
    }

    /**
     * Helper: Draw stage label
     */
    drawStageLabel(stage) {
        this.ctx.fillStyle = '#1e293b';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(stage.shortName, this.canvas.width / 2, 30);
    }

    /**
     * Helper: Lighten or darken a color
     */
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, Math.max(0, (num >> 16) + amt));
        const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
        const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
        return `rgb(${R}, ${G}, ${B})`;
    }

    /**
     * Animate transition between stages
     */
    animateTransition(fromStage, toStage, callback) {
        this.isAnimating = true;
        let progress = 0;
        const duration = 500; // ms
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / duration, 1);

            // Clear and draw
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Simple fade transition
            this.ctx.globalAlpha = 1 - progress;
            this.draw(fromStage);
            this.ctx.globalAlpha = progress;
            this.draw(toStage);
            this.ctx.globalAlpha = 1.0;

            if (progress < 1) {
                this.animationFrame = requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
                this.draw(toStage);
                if (callback) callback();
            }
        };

        animate();
    }

    /**
     * Clear canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Create global instance
let visualizer = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    visualizer = new CNNVisualizer('visualization-canvas');
    visualizer.draw(1); // Draw initial stage
});

