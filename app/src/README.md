# Design guidelines

## Separation of concerns

The code of this project is organized in way that guarantees a clear separation between business logic and presentation logic
  - All the presentation logic is implemented as a set of react components, with all the code inside `src/components` directory.
  - All the business logic (the game engine, basically) is implemented with pure typescript, with all the code inside `src/game-engine` directory.

These two layers intereact with each other through the abstract `ChessGameEngine` class, using Typescript interfaces as data transfer objects.

## Some basic rules
  - Avoid presentation code (`html`, `css`, `tsx`, etc...) inside `src/game-engine` directory.
  - Use `React.FunctionComponent` whenever possible. Notice that the majority of the state handling of the app is implemented by `ChessGameEngine`.