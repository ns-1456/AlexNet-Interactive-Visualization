/**
 * AlexNet Architecture Definition
 * Contains detailed specifications for each layer and stage
 */

const AlexNetArchitecture = {
    stages: [
        {
            id: 1,
            name: "Input Preprocessing",
            shortName: "Input",
            description: "The input image is preprocessed by resizing it to 224×224 pixels with three color channels (RGB), creating a tensor of shape 224×224×3. Pixel values are normalized by subtracting the mean RGB values from the ImageNet dataset to standardize the input. This ensures consistency across different images and helps the network learn more effectively.",
            inputShape: "Variable",
            outputShape: "224×224×3",
            specs: [
                "Input dimensions: 224 × 224 × 3",
                "Normalization: Mean subtraction",
                "Color space: RGB",
                "Data type: Float32",
                "Value range: Normalized [-1, 1]"
            ],
            operation: "Resize & Normalize",
            parameters: 0,
            formula: "x' = (x - μ) / σ",
            formulaExplanation: "where x is the original pixel value, μ is the mean, and σ is standard deviation",
            whyItWorks: "Normalization ensures all input values are on a similar scale, which helps the network learn faster and more reliably. Without normalization, features with larger value ranges could dominate the learning process.",
            whatItLearns: "This stage doesn't learn anything - it's pure data preprocessing to standardize inputs for consistent processing.",
            visualConfig: {
                type: "input",
                color: "#3b82f6",
                width: 224,
                height: 224,
                depth: 3
            }
        },
        {
            id: 2,
            name: "First Convolutional Layer",
            shortName: "Conv1 + ReLU",
            description: "The first convolutional layer applies 96 filters of size 11×11×3 with a stride of 4 pixels. Each filter slides across the input image, detecting low-level features such as edges, corners, and color gradients. The ReLU activation function is then applied element-wise, introducing non-linearity by setting all negative values to zero. The output is a feature map of size 55×55×96.",
            inputShape: "224×224×3",
            outputShape: "55×55×96",
            specs: [
                "Number of filters: 96",
                "Kernel size: 11 × 11 × 3",
                "Stride: 4 pixels",
                "Padding: Valid (no padding)",
                "Activation: ReLU",
                "Parameters: ~35K (34,944)"
            ],
            operation: "Convolution + ReLU",
            parameters: 34944,
            formula: "Y[i,j,k] = ReLU(Σ(X * W[k]) + b[k])",
            formulaExplanation: "where X is input, W[k] is the k-th filter, * denotes convolution, b is bias, and ReLU(x) = max(0, x)",
            whyItWorks: "Convolution allows the network to detect local patterns (edges, corners) regardless of where they appear in the image. The large 11×11 filter can capture broad features, while the stride of 4 reduces computation. ReLU adds non-linearity, enabling the network to learn complex patterns.",
            whatItLearns: "Edge detectors, color gradients, and simple textures. Example filters: horizontal edges, vertical edges, diagonal lines, color transitions (red-to-blue, etc.)",
            visualConfig: {
                type: "conv",
                color: "#10b981",
                width: 55,
                height: 55,
                depth: 96
            }
        },
        {
            id: 3,
            name: "First Pooling Layer",
            shortName: "Pool1 + LRN",
            description: "Max pooling with a 3×3 window and stride of 2 is applied, selecting the maximum value within each window. This reduces the spatial dimensions from 55×55×96 to 27×27×96, providing translation invariance and reducing computational load. Local Response Normalization (LRN) is also applied to normalize activations across neighboring feature maps.",
            inputShape: "55×55×96",
            outputShape: "27×27×96",
            specs: [
                "Pool type: Max pooling",
                "Pool size: 3 × 3",
                "Stride: 2 pixels",
                "Normalization: LRN",
                "Dimension reduction: ~75%",
                "Parameters: 0 (non-learnable)"
            ],
            operation: "Max Pooling + LRN",
            parameters: 0,
            formula: "Y[i,j,k] = max(X[i*s:i*s+p, j*s:j*s+p, k])",
            formulaExplanation: "where s=stride (2), p=pool size (3). Selects maximum value from each 3×3 window.",
            whyItWorks: "Max pooling retains the strongest activations (most important features) while making the representation smaller and more manageable. It provides translation invariance - the network can recognize features even if they move slightly in the image.",
            whatItLearns: "No learning occurs - this is a fixed downsampling operation that preserves the most prominent features while reducing dimensionality by 75%.",
            visualConfig: {
                type: "pool",
                color: "#f59e0b",
                width: 27,
                height: 27,
                depth: 96
            }
        },
        {
            id: 4,
            name: "Second Convolutional Layer",
            shortName: "Conv2 + ReLU",
            description: "The second convolutional layer uses 256 filters of size 5×5×96 with padding to maintain spatial dimensions at 27×27. These filters detect mid-level features by combining the low-level features from the previous layer. Each filter learns to recognize specific combinations of edges and textures, such as object parts. ReLU activation is applied after convolution, producing 27×27×256 feature maps.",
            inputShape: "27×27×96",
            outputShape: "27×27×256",
            specs: [
                "Number of filters: 256",
                "Kernel size: 5 × 5 × 96",
                "Stride: 1 pixel",
                "Padding: Same (2 pixels)",
                "Activation: ReLU",
                "Parameters: ~614K (614,656)"
            ],
            operation: "Convolution + ReLU",
            parameters: 614656,
            formula: "Y[i,j,k] = ReLU(Σ(F[i,j] * W[k]) + b[k])",
            formulaExplanation: "where F is feature maps from Conv1, W[k] is the k-th 5×5×96 filter combining 96 previous feature maps",
            whyItWorks: "Smaller 5×5 filters operating on already-processed features can detect more complex patterns by combining multiple simple features. Padding maintains spatial dimensions, preserving spatial information for deeper layers.",
            whatItLearns: "Mid-level patterns: textures (fur, fabric), simple shapes (circles, rectangles), repeated patterns. Combines edges into more meaningful structures like corners of objects or surface textures.",
            visualConfig: {
                type: "conv",
                color: "#10b981",
                width: 27,
                height: 27,
                depth: 256
            }
        },
        {
            id: 5,
            name: "Deep Convolutional Layers",
            shortName: "Conv3-5 + ReLU",
            description: "Three consecutive convolutional layers extract high-level features. Conv3 applies 384 filters (3×3×256), Conv4 uses 384 filters (3×3×384), and Conv5 employs 256 filters (3×3×384). These layers use smaller 3×3 kernels with padding to maintain spatial dimensions. Each layer is followed by ReLU activation. These deep layers enable recognition of complex, abstract features such as object parts and semantic patterns.",
            inputShape: "27×27×256",
            outputShape: "13×13×256",
            specs: [
                "Conv3: 384 filters, 3×3×256, ReLU",
                "Conv4: 384 filters, 3×3×384, ReLU",
                "Conv5: 256 filters, 3×3×384, ReLU",
                "Total parameters: ~1.3M",
                "Output after pool: 13×13×256",
                "Receptive field: Large (covers significant input area)"
            ],
            operation: "3× Convolution + ReLU",
            parameters: 1327488,
            formula: "Y = ReLU(Conv5(ReLU(Conv4(ReLU(Conv3(X))))))",
            formulaExplanation: "Three stacked convolutions, each followed by ReLU. Small 3×3 filters build up large receptive fields.",
            whyItWorks: "Stacking multiple small (3×3) convolutional layers is more efficient than using one large filter. Each neuron in these deep layers can 'see' a large portion of the original image, allowing detection of complex, high-level patterns.",
            whatItLearns: "Object parts and complex structures: eyes, noses, wheels, windows, fur patterns, specific textures. These layers begin to recognize object-specific features rather than generic patterns.",
            visualConfig: {
                type: "conv",
                color: "#10b981",
                width: 13,
                height: 13,
                depth: 256
            }
        },
        {
            id: 6,
            name: "Final Pooling Layer",
            shortName: "Pool3",
            description: "The final max pooling operation uses a 3×3 window with stride 2, compressing the spatial dimensions from 13×13×256 to 6×6×256. This results in 9,216 values (6×6×256) that capture the essential high-level features needed for classification. The pooling provides spatial invariance, allowing the network to recognize objects regardless of their precise location in the image.",
            inputShape: "13×13×256",
            outputShape: "6×6×256",
            specs: [
                "Pool type: Max pooling",
                "Pool size: 3 × 3",
                "Stride: 2 pixels",
                "Output flattened size: 9,216",
                "Spatial compression: ~75%",
                "Parameters: 0 (non-learnable)"
            ],
            operation: "Max Pooling",
            parameters: 0,
            formula: "Y = flatten(maxpool(X)); Output shape: 9,216",
            formulaExplanation: "Final pooling reduces 13×13×256 to 6×6×256, then flattened to a 1D vector of 9,216 values",
            whyItWorks: "This final compression creates a compact, robust representation of all detected features. Spatial information is largely discarded - only 'what' features are present matters, not 'where' they are (translation invariance).",
            whatItLearns: "No learning - fixed operation that prepares the spatial feature maps for the fully connected layers by creating a fixed-size feature vector.",
            visualConfig: {
                type: "pool",
                color: "#f59e0b",
                width: 6,
                height: 6,
                depth: 256
            }
        },
        {
            id: 7,
            name: "Fully Connected Layers",
            shortName: "FC6-7 + Dropout",
            description: "The 6×6×256 feature maps are flattened into a vector of 9,216 values. This vector passes through two fully connected layers, each with 4,096 neurons. Each neuron computes a weighted sum of all input values followed by ReLU activation. Dropout with probability 0.5 is applied after each layer during training to prevent overfitting. These layers perform high-level reasoning by learning complex combinations of features.",
            inputShape: "9,216 (flattened)",
            outputShape: "4,096",
            specs: [
                "FC6: 9,216 → 4,096 neurons",
                "FC7: 4,096 → 4,096 neurons",
                "Activation: ReLU",
                "Dropout rate: 0.5 (training only)",
                "Total parameters: ~54.5M",
                "Operation: Matrix multiplication + bias"
            ],
            operation: "Fully Connected + ReLU",
            parameters: 54525952,
            formula: "Y = ReLU(W·X + b); W is 4096×9216 matrix",
            formulaExplanation: "Dense layers: every output neuron connected to every input. Y[i] = ReLU(Σ(W[i,j] * X[j]) + b[i])",
            whyItWorks: "Fully connected layers integrate all the spatial features detected by convolutional layers. They learn to combine different patterns to recognize complete objects. Each neuron can specialize in detecting specific object types based on feature combinations.",
            whatItLearns: "High-level semantic concepts: combinations of features that indicate specific objects. For example, 'fur + whiskers + pointed ears = cat' or 'wheels + windows + metallic texture = car'. These are abstract, global representations.",
            visualConfig: {
                type: "fc",
                color: "#8b5cf6",
                neurons: 4096
            }
        },
        {
            id: 8,
            name: "Classification Layer",
            shortName: "FC8",
            description: "The final fully connected layer contains 1,000 neurons, one for each class in the ImageNet dataset. Each neuron computes a weighted sum of the 4,096 input features, producing a raw score (logit) that indicates the network's confidence for that class. Higher scores indicate stronger evidence that the input image belongs to that category. No activation function is applied at this stage.",
            inputShape: "4,096",
            outputShape: "1,000",
            specs: [
                "Output neurons: 1,000 (ImageNet classes)",
                "Operation: Linear transformation",
                "Parameters: ~4.1M (4,097,000)",
                "Output: Raw class scores (logits)",
                "No activation function",
                "Classes: ImageNet 1000 categories"
            ],
            operation: "Fully Connected (Linear)",
            parameters: 4097000,
            formula: "logits = W·X + b; W is 1000×4096 matrix",
            formulaExplanation: "Linear layer producing raw scores (logits) for each of 1000 classes. logits[i] = Σ(W[i,j] * X[j]) + b[i]",
            whyItWorks: "Each of the 1,000 neurons learns weights that respond strongly to the feature combinations characteristic of its specific class. Higher logit values indicate stronger evidence for that class.",
            whatItLearns: "Class-specific decision boundaries. Each neuron learns: 'If these specific features are present with these strengths, the image likely belongs to my class.' For example, the 'golden retriever' neuron learns to fire strongly when dog features are present.",
            visualConfig: {
                type: "fc",
                color: "#8b5cf6",
                neurons: 1000
            }
        },
        {
            id: 9,
            name: "Softmax Output",
            shortName: "Softmax",
            description: "The softmax function transforms the 1,000 raw scores into a probability distribution. Each score is exponentiated and divided by the sum of all exponentiated scores, ensuring all outputs are positive and sum to 1.0. The class with the highest probability is selected as the predicted label. This provides both a classification decision and a confidence measure. For example: 'tabby cat' (73%), 'Egyptian cat' (15%), others (12%).",
            inputShape: "1,000",
            outputShape: "1,000 probabilities",
            specs: [
                "Function: Softmax normalization",
                "Output: Probability distribution",
                "Sum of outputs: 1.0 (100%)",
                "Parameters: 0 (non-learnable)",
                "Selection: argmax(probabilities)",
                "Top-5 accuracy: ~83% (AlexNet on ImageNet)"
            ],
            operation: "Softmax",
            parameters: 0,
            formula: "P[i] = exp(logits[i]) / Σ(exp(logits[j]))",
            formulaExplanation: "Converts logits to probabilities. Exponentiation amplifies differences; normalization ensures Σ P[i] = 1.0",
            whyItWorks: "Softmax converts arbitrary scores into interpretable probabilities that sum to 100%. Large score differences become even larger after exponentiation, making the network's top choice very confident. The probabilistic output allows applications to make informed decisions based on confidence levels.",
            whatItLearns: "No learning - fixed mathematical transformation. Takes raw scores and produces a proper probability distribution where competing classes 'compete' and the strongest wins while weaker alternatives still get some probability mass.",
            visualConfig: {
                type: "output",
                color: "#ec4899",
                bars: 10 // Show top 10 predictions
            }
        }
    ],

    /**
     * Get total number of parameters
     */
    getTotalParameters() {
        return this.stages.reduce((sum, stage) => sum + stage.parameters, 0);
    },

    /**
     * Get stage by ID
     */
    getStage(id) {
        return this.stages.find(stage => stage.id === id);
    },

    /**
     * Get all stage names
     */
    getStageNames() {
        return this.stages.map(stage => stage.name);
    },

    /**
     * Sample predictions for demo images
     */
    samplePredictions: {
        cat: [
            { class: "Tabby Cat", probability: 0.73 },
            { class: "Egyptian Cat", probability: 0.15 },
            { class: "Tiger Cat", probability: 0.08 },
            { class: "Persian Cat", probability: 0.02 },
            { class: "Siamese Cat", probability: 0.01 },
            { class: "Lynx", probability: 0.005 },
            { class: "Leopard", probability: 0.003 },
            { class: "Jaguar", probability: 0.002 },
            { class: "Lion", probability: 0.001 },
            { class: "Tiger", probability: 0.001 }
        ],
        dog: [
            { class: "Golden Retriever", probability: 0.68 },
            { class: "Labrador Retriever", probability: 0.18 },
            { class: "Cocker Spaniel", probability: 0.07 },
            { class: "Irish Setter", probability: 0.04 },
            { class: "Brittany Spaniel", probability: 0.015 },
            { class: "English Setter", probability: 0.008 },
            { class: "Border Collie", probability: 0.005 },
            { class: "Kelpie", probability: 0.001 },
            { class: "Australian Terrier", probability: 0.0005 },
            { class: "Welsh Springer", probability: 0.0005 }
        ],
        car: [
            { class: "Sports Car", probability: 0.65 },
            { class: "Convertible", probability: 0.20 },
            { class: "Racer", probability: 0.08 },
            { class: "Coupe", probability: 0.04 },
            { class: "Sedan", probability: 0.015 },
            { class: "Beach Wagon", probability: 0.008 },
            { class: "Limousine", probability: 0.005 },
            { class: "Model T", probability: 0.001 },
            { class: "Go-kart", probability: 0.0005 },
            { class: "Grille", probability: 0.0005 }
        ]
    },

    /**
     * Get predictions for a sample image
     */
    getPredictions(imageName) {
        return this.samplePredictions[imageName] || this.samplePredictions.cat;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlexNetArchitecture;
}

