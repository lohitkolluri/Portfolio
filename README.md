<h1 align="center" id="title">Stack Machine Simulator</h1>

<p id="description">A simple Arduino sketch that simulates a stack machine allowing you to execute stack-based operations via serial communication.</p>

<h2>🚀 Demo</h2>

[www.tinkercad.com/things/fhYWyLqPAry](www.tinkercad.com/things/fhYWyLqPAry)

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Push values onto the stack.
*   Pop values from the stack.
*   Perform addition multiplication and division operations.
*   Error handling for stack underflow and division by zero.
*   Interaction via the Arduino Serial Monitor.

<h2>🛠️ Installation Steps:</h2>

1. **Upload the provided Arduino sketch:**
   - Use the Arduino IDE or compatible online platforms to upload the sketch to your Arduino board.

2. **Open the Arduino Serial Monitor:**
   - Navigate to Tools -> Serial Monitor in the Arduino IDE or use a serial communication tool if you're using Tinkercad.

3. **Enter instructions in the Serial Monitor:**
   - Supported commands include:
     - `PUSH <value>`: Push a floating-point value onto the stack.
     - `POP`: Pop the top value from the stack.
     - `ADD`: Perform addition on the top two stack values.
     - `MUL`: Perform multiplication on the top two stack values.
     - `DIV`: Perform division on the top two stack values (avoiding division by zero).

4. **Observe the stack's current state and operation results:**
   - View the Serial Monitor for real-time feedback on the stack's state and any operation results.

<h2>🛡️ License:</h2>

This project is licensed under the MIT License
