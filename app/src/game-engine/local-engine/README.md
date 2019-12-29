# LocalEngine
This class is mean to be an in-browser offline implementation of ChessGameEngine.

## Rules-pipeline based design
Instead of the typical implementation based on piece classes, this design introduces an approach based on a rules-pipeline.

This design is inspired by some middleware implementations of well known backend frameworks like .NET Core (see [ASP.NET Core Middleware](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1)) or Laravel (see [Middleware](https://laravel.com/docs/master/middleware)).

A `Rule` is basically a function which evaluates a `Move` given a `GameState`. This evaluation will return a result which indicates if the move is valid or not and the resulting `GameState` after applying the given move.

These rules will be executed as a pipeline in which each rule can perform operations before and after the evaluation of the next rule.

This design leads to a clear traduction from each Chess rule to its implementation. This also allows to implement custom game modes without too much refactor, you just need to add/remove rules as your custom game mode demands.

### Example:

This rule checks if the moving piece belongs to the player who plays the current turn:

```typescript
export class TurnsRule extends Rule {
  public evaluate(move: Move, state: GameState): RuleEvaluationResult {
    let movingPiece = state.board.getPiece(move.source);

    // If the moving piece is not of the same color of the current turn,
    // return an invalid result.
    if (movingPiece && movingPiece.color !== state.currentTurn) {
      return { valid: false };
    }

    // If the color is valid, continue evaluating rules.
    let result = this.nextOrInvalidResult(move, state);

    // Now, if the evaluation is valid change the current turn color.
    if (result.valid && result.nextState) {
      result.nextState.currentTurn =
        result.nextState.currentTurn === PieceColor.White
          ? PieceColor.Black
          : PieceColor.White;
    }

    return result;
  }
}
```

Notice that rule evaluation order mathers since each rule may need to evaluate the result of the next in the pipeline.
