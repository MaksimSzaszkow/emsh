# Emsh

Emsh is a set of tools that allows focusing on creating solution that works in any programming language, and thus on any platform. It consists of:

- Emsh Language
- Emsh Transpiler
- Emsh Code Object (ECO)
- Emsh Generator

## Emsh Language

Emsh language is high**er** level abstraction programming language, that is changed into ECO by Emsh Transpiler. It's main purpose is to provide easy and natural syntax, that allows creating solution that works as planned in any supported language or framework in no time - without the need to know the language or framework itself.

Emsh language should be thought of as programmers way of writing ECO's, as it's possible to write valid ECO without using Emsh Language - it just makes it easier and allows one to focus on solving the problem, without worrying about the details of valid ECO writing.

First version of Emsh Language will focus on implementing all of the features with indentation based syntax, but support for curly braces is intended.

### Emsh Core

Emsh Core is set of functionalities that are supported by base version of Emsh Transpiler - it allows writing valid base code that will compile properly into vanilla versions of languages. While it's possible to create programming patterns with Emsh Core, it's limited as every language might do it very differently. Thats where other Emsh Transpilers will come to help. For now, let's focus on what Emsh Core can do.

#### Module

Emsh Module is a box that can export any other supported feature - in JavaScript and Python it's equivalent is module, in Java it's package, in C# namespace. While these things are not the same, their purpose is very simillar and as such Emsh Core treats them as the same.

```
module moduleName:
    // module contents
```

##### Importing

##### Exporting

#### Class

Emsh Class is OOP concept, if language supports it Emsh Compiler will try to implement it.

```
class className:
    // class contents
```

#### Function

Emsh Function represents functions that are present in most used languages.

```
function funcName for param1, param2, ..., paramN does:
    // function body
```

```
function funcName(param1, param2, ..., paramN):
    // function body
```

```
func funcName(param1, param2, ..., paramN):
    // function body
```

```
f funcName(param1, param2, ..., paramN):
    // function body
```

#### Loops

Emsh Core supports all of the standard loops while adding syntactic sugar for writing some of the loops in more conviniant way.

##### For Loop

For Loop has 5 variants

###### Simplified For Loop

Simplified for loop is syntactic sugar for doing something x times. Iteration variable will start at 0 and end at x-1.

```
do x times:
    // For loop body
```

```
do x times (iterVar):
    // For loop body
```

```
x times:
    // For loop body
```

```
x times (iterVar):
    // For loop body
```

Versions without `iterVar` will translate into for loop with `i` as variable that will be used for each iteration. If `iterVar` is provided, thats the name that will be used for variable that will be used for each iteration.

###### Normal For Loop

```
for iterVar, condition, step:
    // For loop body
```

```
for (iterVar, condition, step):
    // For loop body
```

###### For-In Loop

For-In loop iterates over iterable while giving key/index as first argument and value as second.

```
for key in iterable:
    // For loop body
```

```
for (key in interable):
    // For loop body
```

```
for key, value in iterable:
    // For loop body
```

```
for (key, value in interable):
    // For loop body
```

###### For-Of Loop

For-In loop iterates over iterable while giving value as first argument and key/index as second.

```
for value in iterable:
    // For loop body
```

```
for (value in iterable):
    // For loop body
```

```
for value, index in iterable:
    // For loop body
```

```
for (value, index in iterable):
    // For loop body
```

##### While Loop

```
while condition:
    // While loop body
```

```
while (condition):
    // While loop body
```

##### Do-While Loop

```
do:
    // Do-While loop body
while condition
```

```
do:
    // Do-While loop body
while (condition)
```

#### Variables

Emsh Variables in first version will be treated as staticly typed. Meybe later versions will add optional support for dynamic typing, but using it will make it impossible to translate it into staticly typed languages.

##### Integer

##### Double

##### Char

##### String

##### Array

##### Object

### Emsh MVCPattern

MVCPattern is transpiler that allows one to write code that will be compiled into popular frameworks like React, Vue or Angular or other implementations of MVP, like C# WPF.

#### MVCPattern

MVCPattern is object that represents whole MVC component that contains Mode, View and Controller.

```
MVCPattern:
    MVCModel:
        // Variable declarations
        // State change handlers
    MVCController:
        // Model manipulation functions
    MVCView:
        // HTML Template engine or someting custom based on HTML,
        // will be determined in future
```

#### MVCModel

```
MVCModel:
    x = 1
    y = "string"
    z = [1, 2, 3]

    on x change:
        // Code that should be executed after
        // x changes it's value

    on y, z change:
        // Code that should be executed after
        // y or z changes it's value
```

#### MVCView

```
MVCView:
    // Will be determined soon
```

#### MVCController

```
MVCController:
    function sendData(x, y, z):
        // Send data to server
```

## Emsh Transpiler

Emsh Transpiler is responsible for changing Emsh Language code into ECO. It's design is modular, allowing easy replacement of EmshCore parts, but also expanding it so that it could develop with other languages and frameworks as the time goes.

## Emsh Code Object

ECO contains all information needed for generator to change it into valid code of given language/framework. It's done by encoding every notable part of code into structs with properties that are sufficient to create it in chosen language.

ECO is not supposed to compress code - only be a backbone from which code will be written in chosen language. One ECO is enought to get functionaly the same code in every supported language/framework.

## Emsh Generator

Emsh Generator is the part that changes ECO into valid code in chosen language/framework.
