# ChessGameEngine
This abstract class is used as the only link between business and presentation layers. This design enforces a clear separation of concerns and makes most of the code reusable.

This class could be extended to achive game modes like:
  - Local 2 players mode (current implementation).
  - Remote 2 players mode (for example, by interfacing a backend API).
  - Human vs computer (both local and remote).

All these shouldn't require major modifications of the front-end code.

## Some guidelines
  - If the API of ChessGameEngine needs to be extended, try to always use typescript interfaces for data exchange.
  - All ChessGameEngine methods should be abstract.