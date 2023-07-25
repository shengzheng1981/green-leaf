
import { Feature } from "../feature/feature";
import { Field } from "../feature/field";
import { SimplePointSymbol, Symbol } from "../symbol/symbol";
import { Renderer } from "./renderer";

/**
 * 点半径渲染
 * @remarks
 * 只适用点图层
 */
export class DotRenderer extends Renderer {
    /**
     * 半径字段
     * @remarks
     * 数值字段
     */
    _field: Field;

    get field(): Field {
        return this._field;
    }
    set field(value: Field) {
        this._field = value;
    }

    public symbol: SimplePointSymbol;

    getSymbol(feature: Feature): Symbol {
        this.symbol = this.symbol || new SimplePointSymbol();
        this.symbol.radius = Number(feature.properties[this.field.name] || 0);
        return this.symbol;
    }

}