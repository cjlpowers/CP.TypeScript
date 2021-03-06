﻿
module CP.Mechanical {
    export class Element implements Graphics.CanvasElement {
        public nodes: Node[];

        constructor(public number: number, public material: Material) {
            this.nodes = new Array<Node>();
        }

        public calculateStiffnessMatrix(): Mathematics.Matrix {
            throw new Error("Not implemented");
        }

        public calcualteTransformMatrix(): Mathematics.Matrix {
            throw new Error("Not implemented");
        }

        public calcualteGlobalDisplacementMatrix(): Mathematics.Matrix {
            throw new Error("Not implemented");
        }

        public calcualteLocalDisplacementMatrix(): Mathematics.Matrix {
            var transformMatrix = this.calcualteTransformMatrix();
            var globalDisplacementMatrix = this.calcualteGlobalDisplacementMatrix();
            return transformMatrix.multiply(globalDisplacementMatrix);
        }

        public render(ctx: CanvasRenderingContext2D, options?: IRenderOptions) {
            throw new Error("Not Implemented");
        }
    }
}