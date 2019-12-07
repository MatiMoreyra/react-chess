// Represents a chess square, used as a container for a chess piece.
export class ChessSquare {
  private _row!: number;
  private _column!: number;

  constructor(row: number, column: number) {
    // Validate parameters
    if (column > 7 || column < 0) {
      throw new Error("Invalid column number");
    }
    if (row > 7 || row < 0) {
      throw new Error("Invalid row number");
    }
    this._row = row;
    this._column = column;
  }

  get row(): number {
    return this._row;
  }

  get column(): number {
    return this._column;
  }

  get label(): string {
    let columnLabel = String.fromCharCode("a".charCodeAt(0) + this.column);
    let rowLabel = (8 - this.row).toString();
    return columnLabel + rowLabel;
  }

  equals(other: ChessSquare): boolean {
    return this._row === other.row && this._column === other.column;
  }
}
