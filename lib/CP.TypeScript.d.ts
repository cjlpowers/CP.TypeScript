declare module CP {
    class Log {
        static debug(message?: any, ...optionalParams: any[]): void;
        static log(message?: any, ...optionalParams: any[]): void;
        static info(message?: any, ...optionalParams: any[]): void;
        static warn(message?: any, ...optionalParams: any[]): void;
        static error(message?: any, ...optionalParams: any[]): void;
    }
}
declare module CP.Genetics {
    class Environment<TOrganism extends Organism> {
        organisms: TOrganism[];
        epoch: number;
        constructor();
        execute(): void;
        addOrganism(organism: TOrganism): void;
        removeOrganism(organism: TOrganism): void;
    }
}
declare module CP.Genetics {
    class Genome {
        constructor();
        getSize(): number;
        execute(inputSensors: Sensor[], outputSensors: Sensor[]): void;
    }
}
declare module CP.Genetics {
    class Organism {
        inputs: Sensor[];
        outputs: Sensor[];
        genome: Genome;
        constructor();
        execute(): void;
    }
}
declare module CP.Genetics {
    class PrimitiveEnvironment extends Environment<PrimitiveOrganism> implements Graphics.CanvasElement {
        static EnergyInflowRate: number;
        static MinOrganismPopulation: number;
        size: Mathematics.Vector2;
        availableEnergyDensity: number;
        onExecute: () => void;
        private neighbourLookup;
        private neighbourDistances;
        private neighbourPairs;
        constructor(size: Mathematics.Vector2);
        execute(): void;
        getEnergy(location: Mathematics.Vector2): number;
        getNeighbour(organism: PrimitiveOrganism): PrimitiveOrganism;
        spawnOrganism(): PrimitiveOrganism;
        computeNewLocation(location: Mathematics.Vector2, velocity: Mathematics.Vector2): Mathematics.Vector2;
        private getEnvironmentIndex(location);
        render(ctx: CanvasRenderingContext2D): void;
        private computeNeighbours();
    }
}
declare module CP.Genetics {
    class PrimitiveGene {
        private triggerIndex;
        private triggerThreshold;
        constructor();
        execute(organism: PrimitiveOrganism, inputSensors: Sensor[], outputSensors: Sensor[]): void;
        isActive(inputSensors: Sensor[]): boolean;
        getSensor(sensors: Sensor[], sensorIndex: number): Sensor;
        getRandomIndex(): number;
        normalize(value: number, min?: number, max?: number): number;
        limit(delta: number, value: number, min: number, max: number): number;
        static AllGenes: Array<() => PrimitiveGene>;
    }
}
declare module CP.Genetics {
    class PrimitiveGenome extends Genome {
        private organism;
        genes: PrimitiveGene[];
        static MaxGeneSize: number;
        static MutationProbability: number;
        constructor(organism: PrimitiveOrganism, genes?: PrimitiveGene[]);
        generate(size: number): void;
        getSize(): number;
        private static randomGene();
        execute(inputSensors: Sensor[], outputSensors: Sensor[]): void;
        static generateGenome(organism: PrimitiveOrganism, ancestors?: PrimitiveGenome[]): PrimitiveGenome;
    }
}
declare module CP.Genetics {
    class PrimitiveOrganism extends Organism implements Graphics.CanvasElement {
        size: number;
        energy: number;
        age: number;
        location: Mathematics.Vector2;
        velocity: Mathematics.Vector2;
        aggression: number;
        environment: PrimitiveEnvironment;
        feedEnergy: number;
        private isAlive;
        static MaxAge: number;
        static StartingEnergy: number;
        static MovementEnergyFactor: number;
        static GenomeEnergyFactor: number;
        static EnergyDensity: number;
        static DigestionEfficiency: number;
        constructor(environment: PrimitiveEnvironment, parent?: PrimitiveOrganism);
        execute(): void;
        canExpendEnergy(energy: number): boolean;
        updateLocation(): void;
        render(ctx: CanvasRenderingContext2D): void;
        private getFillColor();
        private getLineColor();
        private initializeSensors();
    }
}
declare module CP.Genetics {
    class Sensor {
        getValue: () => number;
        setValue: (value: number) => void;
        constructor(getValue: () => number, setValue?: (number: number) => void);
    }
}
declare module CP.Graphics {
    interface CanvasElement {
        render(context: CanvasRenderingContext2D, options?: any): void;
    }
}
declare module CP.Graphics {
    class Color {
        r: number;
        g: number;
        b: number;
        a: number;
        static black: Color;
        static white: Color;
        private strValue;
        constructor(r: number, g: number, b: number, a?: number);
        toString(): string;
    }
}
declare module CP.Mathematics {
    class Matrix {
        matrix: any;
        rowCount: number;
        columnCount: number;
        constructor(matrix: any);
        toString(): string;
        getValue(row: number, column: number): number;
        setValue(row: number, column: number, value: number): void;
        addValue(row: number, column: number, value: number): void;
        multiply(b: Matrix): Matrix;
        scale(multiplier: number): Matrix;
        inverse(): Matrix;
        transpose(): Matrix;
        clone(): Matrix;
        static new(rows: number, cols: number): Matrix;
        static solveAxEqualsB(a: CP.Mathematics.Matrix, b: CP.Mathematics.Matrix): CP.Mathematics.Matrix;
    }
}
declare module CP.Mathematics {
    class Value {
        magnitude: number;
        unit: string;
        constructor(magnitude: number, unit?: string);
        toString(): string;
    }
}
declare module CP.Mathematics {
    class Vector {
        private magnitudeValue;
        unit: string;
        private components;
        private namedComponents;
        private dimensions;
        constructor(components: number[] | {
            [key: string]: number;
        });
        magnitude(): number;
        isZero(): boolean;
        isDefined(): boolean;
        getComponent(component: string | number): number;
        protected setComponent(component: string | number, value: number): void;
        getDimensions(): number;
        toString(): string;
        add(vector: Vector): Vector;
        subtract(vector: Vector): Vector;
    }
}
declare module CP.Mathematics {
    class Vector2 extends Vector {
        constructor(x?: number, y?: number);
        x: number;
        y: number;
        add(vector: Vector2): Vector2;
        subtract(vector: Vector2): Vector2;
    }
}
declare module CP.Mathematics {
    class Vector3 extends Vector {
        constructor(x?: number, y?: number, z?: number);
        x: number;
        y: number;
        z: number;
        add(vector: Vector3): Vector3;
        subtract(vector: Vector3): Vector3;
    }
}
declare module CP.Mechanical {
    class Element implements Graphics.CanvasElement {
        number: number;
        material: Material;
        nodes: Node[];
        constructor(number: number, material: Material);
        calculateStiffnessMatrix(): Mathematics.Matrix;
        calcualteTransformMatrix(): Mathematics.Matrix;
        calcualteGlobalDisplacementMatrix(): Mathematics.Matrix;
        calcualteLocalDisplacementMatrix(): Mathematics.Matrix;
        render(ctx: CanvasRenderingContext2D, options?: IRenderOptions): void;
    }
}
declare module CP.Mechanical {
    interface IRenderOptions {
        showNodes?: boolean;
        showElements?: boolean;
        showDisplacement?: boolean;
        displacementMultiplier?: number;
    }
}
declare module CP.Mechanical {
    class Material {
        name: string;
        elasticModulus: Mathematics.Value;
        static Aluminium: Material;
        static Steel: Material;
        static Glass: Material;
        constructor(name: string, elasticModulus: Mathematics.Value);
        toString(): string;
    }
}
declare module CP.Mechanical {
    class Node implements Graphics.CanvasElement {
        number: number;
        force: Mathematics.Vector3;
        position: Mathematics.Vector3;
        displacement: Mathematics.Vector3;
        reactionForce: Mathematics.Vector3;
        reactionDisplacement: Mathematics.Vector3;
        constructor(number: number);
        render(ctx: CanvasRenderingContext2D, options?: IRenderOptions): void;
        drawForce(ctx: CanvasRenderingContext2D, force: Mathematics.Vector3, color: Graphics.Color, width: number): void;
        drawForceLine(ctx: CanvasRenderingContext2D, start: Mathematics.Vector3, end: Mathematics.Vector3, color: Graphics.Color, width: number, text: string): void;
    }
}
declare module CP.Mechanical {
    class Structure<T extends Element> extends Element implements Graphics.CanvasElement {
        protected dof: number;
        elements: Array<T>;
        showElements: boolean;
        showNodes: boolean;
        constructor(dof: number, elements: Array<T>, nodes: Array<Node>);
        calculateStiffnessMatrix(): Mathematics.Matrix;
        calculateForceMatrix(): Mathematics.Matrix;
        calculateDisplacementMatrix(globalK: Mathematics.Matrix, globalF: Mathematics.Matrix): Mathematics.Matrix;
        calculateReactionDisplacements(globalQ: Mathematics.Matrix): void;
        calculateReactionForces(globalK: Mathematics.Matrix, globalQ: Mathematics.Matrix): void;
        solve(): void;
        render(ctx: CanvasRenderingContext2D, options?: IRenderOptions): void;
        static getDefaultRenderOptions(): IRenderOptions;
    }
}
declare module CP.Mechanical {
    class StructureDefinition {
        nodes: Array<{
            force?: {
                x?: number;
                y?: number;
                z?: number;
            };
            position: {
                x: number;
                y: number;
                z?: number;
            };
            displacement?: {
                x?: number;
                y?: number;
                z?: number;
            };
        }>;
        elements: Array<{
            area: number;
            nodes: Array<number>;
            material?: number;
        }>;
        materials: Array<{
            name: string;
            elasticModulus: number;
        }>;
    }
}
declare module CP.Mechanical {
    class TrussElement extends Element {
        area: Mathematics.Value;
        private vector;
        private a;
        private b;
        private a2;
        private b2;
        private ab;
        stress: Mathematics.Value;
        stressFactor: number;
        length: number;
        coefficient: number;
        constructor(number: number, material: Mechanical.Material, area: Mathematics.Value, node1: Node, node2: Node);
        calculateCoefficientMatrix(): Mathematics.Matrix;
        calculateStiffnessMatrix(): Mathematics.Matrix;
        calcualteTransformMatrix(): Mathematics.Matrix;
        calcualteGlobalDisplacementMatrix(): Mathematics.Matrix;
        calculateStress(): Mathematics.Value;
        solve(): void;
        render(ctx: CanvasRenderingContext2D, options?: IRenderOptions): void;
    }
}
declare module CP.Mechanical {
    class TrussStructure extends Structure<TrussElement> {
        constructor(dof: number, elements: Array<TrussElement>, nodes: Array<Node>);
        solve(): void;
        static load(definition: StructureDefinition): TrussStructure;
    }
}
