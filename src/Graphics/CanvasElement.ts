﻿
module CP.Graphics {

    export interface CanvasElement {
        render(context: CanvasRenderingContext2D, options?:any):void;
    }
}