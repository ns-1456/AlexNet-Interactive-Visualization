/**
 * Explainability Module
 * Interactive demos and visualizations for CNN operations
 */

class ExplainabilityEngine {
    constructor() {
        this.demoCanvases = {};
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        this.setupDemoCanvases();
        this.isInitialized = true;
    }

    setupDemoCanvases() {
        // Initialize all demo canvases
        const demoIds = [
            'convolution-demo',
            'pooling-demo',
            'relu-demo',
            'feature-maps-demo'
        ];

        demoIds.forEach(id => {
            const canvas = document.getElementById(id);
            if (canvas) {
                this.demoCanvases[id] = {
                    element: canvas,
                    ctx: canvas.getContext('2d'),
                    animationFrame: null
                };
            }
        });
    }

    /**
     * Demonstrate Convolution Operation
     */
    demonstrateConvolution(canvasId = 'convolution-demo') {
        const demo = this.demoCanvases[canvasId];
        if (!demo) return;

        const { ctx, element: canvas } = demo;
        canvas.width = 600;
        canvas.height = 300;

        // Input image (simplified 6x6 grid)
        const inputSize = 6;
        const cellSize = 40;
        const startX = 20;
        const startY = 50;

        // Sample input values (grayscale 0-255)
        const inputImage = [
            [50, 50, 50, 200, 200, 200],
            [50, 50, 50, 200, 200, 200],
            [50, 50, 50, 200, 200, 200],
            [50, 50, 50, 200, 200, 200],
            [50, 50, 50, 200, 200, 200],
            [50, 50, 50, 200, 200, 200]
        ];

        // 3x3 edge detection filter
        const filter = [
            [-1, -1, -1],
            [ 0,  0,  0],
            [ 1,  1,  1]
        ];

        let animationStep = 0;
        const maxSteps = 16; // 4x4 output
        let isAnimating = true;
        let frameCounter = 0;
        const framesPerStep = 90; // Hold each step for 90 frames (~1.5 seconds at 60fps)

        const animate = () => {
            if (!isAnimating) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw title
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 16px Arial';
            ctx.fillText('Convolution Operation', 20, 30);

            // Draw input image
            ctx.font = '10px Arial';
            ctx.fillText('Input (6×6)', startX, startY - 15);
            
            for (let i = 0; i < inputSize; i++) {
                for (let j = 0; j < inputSize; j++) {
                    const value = inputImage[i][j];
                    ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
                    ctx.fillRect(startX + j * cellSize, startY + i * cellSize, cellSize - 2, cellSize - 2);
                    
                    // Border
                    ctx.strokeStyle = '#cbd5e1';
                    ctx.strokeRect(startX + j * cellSize, startY + i * cellSize, cellSize - 2, cellSize - 2);
                }
            }

            // Draw filter
            const filterX = startX + 280;
            const filterY = startY + 20;
            const filterCellSize = 35;
            
            ctx.fillStyle = '#1e293b';
            ctx.fillText('3×3 Filter (Edge Detector)', filterX, filterY - 10);
            
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const value = filter[i][j];
                    ctx.fillStyle = value > 0 ? '#10b981' : value < 0 ? '#ef4444' : '#94a3b8';
                    ctx.fillRect(filterX + j * filterCellSize, filterY + i * filterCellSize, filterCellSize - 2, filterCellSize - 2);
                    
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 14px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(value, filterX + j * filterCellSize + filterCellSize/2, filterY + i * filterCellSize + filterCellSize/2);
                    
                    ctx.strokeStyle = '#1e293b';
                    ctx.strokeRect(filterX + j * filterCellSize, filterY + i * filterCellSize, filterCellSize - 2, filterCellSize - 2);
                }
            }
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';

            // Animate sliding window
            if (animationStep < maxSteps) {
                const row = Math.floor(animationStep / 4);
                const col = animationStep % 4;

                // Highlight current window on input
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 3;
                ctx.strokeRect(startX + col * cellSize, startY + row * cellSize, cellSize * 3 - 2, cellSize * 3 - 2);

                // Draw arrow
                this.drawArrow(ctx, startX + cellSize * 6 + 20, startY + 100, filterX - 20, filterY + 50, '#3b82f6');

                // Calculate convolution result
                let sum = 0;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        sum += inputImage[row + i][col + j] * filter[i][j];
                    }
                }
                sum = Math.max(0, Math.min(255, sum + 128)); // Apply ReLU and normalize

                // Draw result
                const resultX = filterX + 150;
                const resultY = filterY + 30;
                ctx.fillStyle = '#1e293b';
                ctx.font = '12px Arial';
                ctx.fillText('Output:', resultX, resultY - 10);
                
                ctx.fillStyle = `rgb(${sum}, ${sum}, ${sum})`;
                ctx.fillRect(resultX, resultY, 50, 50);
                ctx.strokeStyle = '#10b981';
                ctx.lineWidth = 3;
                ctx.strokeRect(resultX, resultY, 50, 50);

                ctx.fillStyle = '#1e293b';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(Math.round(sum), resultX + 25, resultY + 70);
                ctx.textAlign = 'left';

                // Instructions
                ctx.fillStyle = '#64748b';
                ctx.font = '11px Arial';
                ctx.fillText(`Step ${animationStep + 1} of ${maxSteps}: Sliding 3×3 filter across input`, 20, canvas.height - 10);
            }

            // Advance animation only every framesPerStep frames
            frameCounter++;
            if (frameCounter >= framesPerStep) {
                frameCounter = 0;
                animationStep++;
                if (animationStep >= maxSteps + 3) {
                    animationStep = 0; // Loop animation
                }
            }

            demo.animationFrame = requestAnimationFrame(animate);
        };

        // Stop any existing animation
        if (demo.animationFrame) {
            cancelAnimationFrame(demo.animationFrame);
        }

        animate();
    }

    /**
     * Demonstrate Max Pooling Operation
     */
    demonstratePooling(canvasId = 'pooling-demo') {
        const demo = this.demoCanvases[canvasId];
        if (!demo) return;

        const { ctx, element: canvas } = demo;
        canvas.width = 600;
        canvas.height = 300;

        // Input feature map (4x4)
        const inputSize = 4;
        const cellSize = 50;
        const startX = 50;
        const startY = 70;

        const inputValues = [
            [45, 128, 67, 200],
            [23, 255, 89, 134],
            [156, 78, 234, 123],
            [67, 190, 45, 178]
        ];

        let animationStep = 0;
        const maxSteps = 4; // 2x2 pooling windows
        let isAnimating = true;
        let frameCounter = 0;
        const framesPerStep = 90; // Hold each step for 90 frames (~1.5 seconds at 60fps)

        const animate = () => {
            if (!isAnimating) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Title
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 16px Arial';
            ctx.fillText('Max Pooling Operation (2×2 window, stride 2)', 20, 30);

            // Draw input
            ctx.font = '12px Arial';
            ctx.fillText('Input (4×4)', startX, startY - 20);

            for (let i = 0; i < inputSize; i++) {
                for (let j = 0; j < inputSize; j++) {
                    const value = inputValues[i][j];
                    ctx.fillStyle = `rgb(${value}, ${value/2}, ${255-value})`;
                    ctx.fillRect(startX + j * cellSize, startY + i * cellSize, cellSize - 2, cellSize - 2);
                    
                    ctx.strokeStyle = '#cbd5e1';
                    ctx.strokeRect(startX + j * cellSize, startY + i * cellSize, cellSize - 2, cellSize - 2);
                    
                    ctx.fillStyle = '#1e293b';
                    ctx.font = 'bold 12px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(value, startX + j * cellSize + cellSize/2, startY + i * cellSize + cellSize/2);
                }
            }
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';

            // Output
            const outputX = startX + 320;
            const outputY = startY + 25;
            ctx.font = '12px Arial';
            ctx.fillText('Output (2×2)', outputX, outputY - 20);

            // Animate each pooling window
            if (animationStep < maxSteps) {
                const row = Math.floor(animationStep / 2);
                const col = animationStep % 2;

                // Highlight current window
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 4;
                ctx.strokeRect(
                    startX + col * 2 * cellSize,
                    startY + row * 2 * cellSize,
                    cellSize * 2 - 2,
                    cellSize * 2 - 2
                );

                // Get max value from window
                const windowValues = [
                    inputValues[row * 2][col * 2],
                    inputValues[row * 2][col * 2 + 1],
                    inputValues[row * 2 + 1][col * 2],
                    inputValues[row * 2 + 1][col * 2 + 1]
                ];
                const maxValue = Math.max(...windowValues);

                // Draw operation
                ctx.fillStyle = '#3b82f6';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('MAX', startX + cellSize * 4 + 50, startY + 100);
                ctx.textAlign = 'left';

                // Draw arrow
                this.drawArrow(ctx, startX + cellSize * 4 + 20, startY + 80, outputX - 20, outputY + 50, '#3b82f6');

                // Draw all output cells (faded)
                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        const r = Math.floor(i / 2) === row && (j / 2) === col ? 0 : 1;
                        ctx.globalAlpha = (i === row && j === col) ? 1.0 : 0.3;
                        
                        const outRow = i;
                        const outCol = j;
                        const outWindowValues = [
                            inputValues[outRow * 2][outCol * 2],
                            inputValues[outRow * 2][outCol * 2 + 1],
                            inputValues[outRow * 2 + 1][outCol * 2],
                            inputValues[outRow * 2 + 1][outCol * 2 + 1]
                        ];
                        const outMaxValue = Math.max(...outWindowValues);
                        
                        ctx.fillStyle = `rgb(${outMaxValue}, ${outMaxValue/2}, ${255-outMaxValue})`;
                        ctx.fillRect(outputX + j * cellSize * 1.2, outputY + i * cellSize * 1.2, cellSize * 1.2 - 2, cellSize * 1.2 - 2);
                        
                        if (i === row && j === col) {
                            ctx.strokeStyle = '#10b981';
                            ctx.lineWidth = 3;
                            ctx.strokeRect(outputX + j * cellSize * 1.2, outputY + i * cellSize * 1.2, cellSize * 1.2 - 2, cellSize * 1.2 - 2);
                        } else {
                            ctx.strokeStyle = '#cbd5e1';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(outputX + j * cellSize * 1.2, outputY + i * cellSize * 1.2, cellSize * 1.2 - 2, cellSize * 1.2 - 2);
                        }
                        
                        ctx.fillStyle = '#1e293b';
                        ctx.font = 'bold 14px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(outMaxValue, outputX + j * cellSize * 1.2 + cellSize * 0.6, outputY + i * cellSize * 1.2 + cellSize * 0.6);
                    }
                }
                ctx.globalAlpha = 1.0;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'alphabetic';
            }

            // Instructions
            ctx.fillStyle = '#64748b';
            ctx.font = '11px Arial';
            ctx.fillText(`Step ${Math.min(animationStep + 1, maxSteps)} of ${maxSteps}: Select maximum value from each 2×2 window`, 20, canvas.height - 10);

            // Advance animation only every framesPerStep frames
            frameCounter++;
            if (frameCounter >= framesPerStep) {
                frameCounter = 0;
                animationStep++;
                if (animationStep >= maxSteps + 3) {
                    animationStep = 0; // Loop animation
                }
            }

            demo.animationFrame = requestAnimationFrame(animate);
        };

        if (demo.animationFrame) {
            cancelAnimationFrame(demo.animationFrame);
        }

        animate();
    }

    /**
     * Demonstrate ReLU Activation Function
     */
    demonstrateReLU(canvasId = 'relu-demo') {
        const demo = this.demoCanvases[canvasId];
        if (!demo) return;

        const { ctx, element: canvas } = demo;
        canvas.width = 600;
        canvas.height = 280;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 16px Arial';
        ctx.fillText('ReLU Activation Function: f(x) = max(0, x)', 20, 30);

        // Draw graph
        const graphX = 50;
        const graphY = 150;
        const graphWidth = 250;
        const graphHeight = 100;

        // Axes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(graphX, graphY - graphHeight);
        ctx.lineTo(graphX, graphY + graphHeight);
        ctx.lineTo(graphX + graphWidth, graphY);
        ctx.stroke();

        // Axis labels
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Arial';
        ctx.fillText('x', graphX + graphWidth + 10, graphY + 5);
        ctx.fillText('f(x)', graphX - 30, graphY - graphHeight - 5);
        ctx.fillText('0', graphX - 10, graphY + 15);

        // ReLU function plot
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(graphX, graphY);
        ctx.lineTo(graphX, graphY);
        ctx.lineTo(graphX + graphWidth, graphY - graphHeight);
        ctx.stroke();

        // Highlight negative -> 0
        ctx.fillStyle = '#ef4444';
        ctx.globalAlpha = 0.2;
        ctx.fillRect(graphX - graphWidth/2, graphY, graphWidth/2, graphHeight);
        ctx.globalAlpha = 1.0;

        // Highlight positive -> positive
        ctx.fillStyle = '#10b981';
        ctx.globalAlpha = 0.2;
        ctx.fillRect(graphX, graphY - graphHeight, graphWidth, graphHeight);
        ctx.globalAlpha = 1.0;

        // Example values
        const examplesX = graphX + graphWidth + 80;
        const examplesY = 80;

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Examples:', examplesX, examplesY);

        const examples = [
            { input: -5, output: 0, color: '#ef4444' },
            { input: -2, output: 0, color: '#ef4444' },
            { input: 0, output: 0, color: '#94a3b8' },
            { input: 3, output: 3, color: '#10b981' },
            { input: 7, output: 7, color: '#10b981' }
        ];

        ctx.font = '13px monospace';
        examples.forEach((ex, i) => {
            const y = examplesY + 30 + i * 25;
            ctx.fillStyle = ex.color;
            ctx.fillText(`f(${ex.input.toString().padStart(2, ' ')}) = ${ex.output}`, examplesX, y);
        });

        // Explanation
        const explainY = examplesY + 180;
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Arial';
        ctx.fillText('✓ Negative values → 0', examplesX, explainY);
        ctx.fillText('✓ Positive values → unchanged', examplesX, explainY + 20);
        ctx.fillText('✓ Introduces non-linearity', examplesX, explainY + 40);
    }

    /**
     * Draw feature map progression
     */
    drawFeatureMapProgression(canvasId = 'feature-maps-demo', stageId) {
        const demo = this.demoCanvases[canvasId];
        if (!demo) return;

        const { ctx, element: canvas } = demo;
        canvas.width = 800;
        canvas.height = 200;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Title
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('What Each Layer Learns (Feature Hierarchy)', 20, 25);

        const stages = [
            { name: 'Input', features: ['Raw Pixels', 'Colors'], size: 80, color: '#3b82f6' },
            { name: 'Conv1', features: ['Edges', 'Corners'], size: 70, color: '#10b981' },
            { name: 'Conv2', features: ['Textures', 'Patterns'], size: 70, color: '#f59e0b' },
            { name: 'Conv3-5', features: ['Object Parts', 'Shapes'], size: 70, color: '#8b5cf6' },
            { name: 'FC', features: ['Objects', 'Semantics'], size: 70, color: '#ec4899' }
        ];

        let xPos = 30;
        const yPos = 80;

        stages.forEach((stage, i) => {
            // Box
            ctx.fillStyle = stage.color;
            ctx.globalAlpha = 0.2;
            ctx.fillRect(xPos, yPos, stage.size, stage.size);
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = stage.color;
            ctx.lineWidth = 3;
            ctx.strokeRect(xPos, yPos, stage.size, stage.size);

            // Name
            ctx.fillStyle = '#1e293b';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(stage.name, xPos + stage.size / 2, yPos - 10);

            // Features
            ctx.font = '10px Arial';
            ctx.fillStyle = '#64748b';
            stage.features.forEach((feature, j) => {
                ctx.fillText(feature, xPos + stage.size / 2, yPos + stage.size + 15 + j * 13);
            });

            // Arrow
            if (i < stages.length - 1) {
                this.drawArrow(ctx, xPos + stage.size + 5, yPos + stage.size / 2, xPos + stage.size + 35, yPos + stage.size / 2, '#64748b', 2);
            }

            ctx.textAlign = 'left';
            xPos += stage.size + 40;
        });

        // Highlight current stage
        if (stageId && stageId <= 9) {
            const stageIndex = stageId <= 2 ? 1 : stageId <= 4 ? 2 : stageId <= 6 ? 3 : 4;
            const highlightStage = stages[stageIndex];
            let highlightX = 30;
            for (let i = 0; i < stageIndex; i++) {
                highlightX += stages[i].size + 40;
            }
            
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 4;
            ctx.strokeRect(highlightX - 3, yPos - 3, highlightStage.size + 6, highlightStage.size + 6);
        }
    }

    /**
     * Helper: Draw arrow
     */
    drawArrow(ctx, fromX, fromY, toX, toY, color = '#3b82f6', lineWidth = 2) {
        const headLength = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = lineWidth;

        // Line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        // Arrow head
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(
            toX - headLength * Math.cos(angle - Math.PI / 6),
            toY - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            toX - headLength * Math.cos(angle + Math.PI / 6),
            toY - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
    }

    /**
     * Stop all animations
     */
    stopAllAnimations() {
        Object.values(this.demoCanvases).forEach(demo => {
            if (demo.animationFrame) {
                cancelAnimationFrame(demo.animationFrame);
                demo.animationFrame = null;
            }
        });
    }
}

// Create global instance
let explainabilityEngine = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    explainabilityEngine = new ExplainabilityEngine();
    explainabilityEngine.init();
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExplainabilityEngine;
}

