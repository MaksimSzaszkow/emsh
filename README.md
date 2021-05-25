# Emsh

Emsh is a set of tools that allows focusing on creating solution that works in any programming language, and thus on any platform. It consists of:

- Emsh Language
- Emsh Transpiler
- Emsh Code Object (ECO)
- Emsh Generator

## Emsh Code Object

ECO is the most fundamental part of Emsh system - it encodes all information required to generate code in any language that supports those features. It's done by distinguishing all parts of the code, assigning them label and encoding all information required to recreate that part of code in any language.

ECO is not supposed to compress code - only to be a backbone from which code will be generated in chosen language.

## Emsh Language

Emsh language is **higher** level abstraction programming language, that is changed into ECO by Emsh Transpiler. It's main purpose is to provide easy and natural syntax, that allows creating solution that works as planned in any supported language or framework in no time - without the need to know the language or framework itself.

Emsh language should be thought of as programmers way of writing ECO's, as it's possible to write valid ECO without using Emsh Language - it just makes it easier and allows one to focus on solving the problem, without worrying about the details of valid ECO writing.

First version of Emsh Language will focus on implementing all of the features with indentation based syntax, but support for curly braces is intended.

### Design principles

#### Standardize

Many languages do the same thing in wildly different ways. While very often with those different ways come different possibilities, in most cases they are used for the same purpose. Emsh provides standardized ways of expressing those things across languages.

#### Declutter

Patterns and concepts are not native to languages, they only give tools to express those patterns. This means that not only patterns are not readable at first glance and require with more advanced concepts in-depth knowledge about language syntax, but also it's not enough to understand the pattern and know what to do with it - one also needs to know how to create it in chosen language. Emsh allows one to focus on tailoring pattern to needs of project by providing separate syntax for those patterns.

#### Allow advanced programmers to work faster

Emsh main purpose is to allow making solutions faster and easier - while it's not tool that will do everything perfect, having a solution after only fraction of time required in other languages allows one to focus on having working prototype.

#### Allow begginer programmers to learn faster

Emsh language tries to not only provide syntax that is understandable to advanced programmer, but also alternative syntax that makes same things read more like normal language, not secret code of secrets.

#### Allow for translation of keywords

This point extends idea of being begginer friendly by allowing one to swap keywords for custom ones. This has the potential of making it easier to learn programming for non-english speaking folk, and thus inviting more people to collaborate.

## Emsh Core

Emsh Core focuses on providing support for the most fundamental features in most popular languages.

### File

File is representation of physical Emsh file.

ECO:

```
{
    type: "file",
    name: string,
    imports: Module[],
    contains: Module[],
    exports: Module[]
}
```

#### Importing

Emsh:

```
from z import x
```

```
from z import x, y
```

```
from z import x as a, y
```

ECO:

```
{
    type: "import",
    module: Module,
    something: {}[]
}
```

#### Exporting

```
export x
```

### Module

Emsh Module is a box that can export any other supported feature - in JavaScript and Python it's equivalent is module, in Java it's package, in C# namespace. While these things are not the same, their purpose is very simillar and as such Emsh Core treats them as the same.

While it's possible to have variables, functions and classes on same level in some languages (JS and Python), it's not possible to achive in all of them (C# and Java). Thats why variables, functions and classes that don't belong to any module will be packed into module named `Main`.

Emsh:

```
module moduleName:
    public:
        // Variables
        // Functions
        // Classes
    private:
        // Variables
        // Functions
        // Classes
    static:
        // Variables
        // Functions
        // Classes

```

ECO:

```
{
    type: "module",
    name: string,
    public: {
        variables: Variable[],
        functions: Function[],
        classes: Class[]
    }
    private: {
        variables: Variable[],
        functions: Function[],
        classes: Class[]
    },
    static: {
        variables: Variable[],
        functions: Function[],
        classes: Class[]
    }
}
```

### Class

Emsh Class is OOP concept, if language supports it Emsh Generator will try to implement it.

Emsh:

```
class className:
    public:
        // Variables
        // Functions
    private:
        // Variables
        // Functions
    static:
        // Variables
        // Functions
```

ECO:

```
{
    type: "class",
    name: string,
    public: {
        variables: Variable[],
        functions: Function[],
    },
    private: {
        variables: Variable[],
        functions: Function[],
    },
    protected: {
        variables: Variable[],
        functions: Function[],
    },
    static: {
        variables: Variable[],
        functions: Function[],
    }
}
```

### Function

Emsh Function represents functions that are present in most used languages.

Emsh:

```
function funcName for param1, param2, ..., paramN does:
    // function body
```

```
function funcName(param1, param2, ..., paramN):
    // function body
```

```
f funcName(param1, param2, ..., paramN):
    // function body
```

ECO:

```
{
    type: "function",
    name: string,
    params: Variable[],
    body: Code
}
```

Anonymous functions are also supported.

Emsh:

```
function for param1, param2, ..., paramN does:
    // function body
```

```
function (param1, param2, ..., paramN):
    // function body
```

```
f (param1, param2, ..., paramN):
    // function body
```

ECO:

```
{
    type: "function",
    name: "",
    params: Variable[],
    body: Code
}
```

### Loops

Emsh Core supports all of the standard loops while adding syntactic sugar for writing some of the loops in more conviniant way.

#### For Loop

For Loop has 5 variants

##### Simplified For Loop

Simplified for loop is syntactic sugar for doing something x times. Iteration variable will start at 0 and end at x-1.

Emsh:

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

ECO:

```
{
    type: "forLoop",
    variableName: string,
    variableType: string,
    condition: Expression,
    step: Expression,
    body: Code
}
```

Versions without `iterVar` will translate into for loop with `i` as variable that will be used for each iteration. If `iterVar` is provided, thats the name that will be used for variable that will be used for each iteration.

##### Normal For Loop

Emsh:

```
for iterVar, condition, step:
    // For loop body
```

```
for (iterVar, condition, step):
    // For loop body
```

ECO:

```
{
    type: "forLoop",
    variableName: string,
    variableType: string,
    condition: Expression,
    step: Expression,
    body: Code
}
```

##### For-In Loop

For-In loop iterates over iterable while giving key/index as first argument and value as second.

Emsh:

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

ECO:

```
{
    type: "forLoop",
    variableName: string,
    variableType: string,
    condition: Expression,
    step: Expression,
    body: Code
}
```

##### For-Of Loop

For-In loop iterates over iterable while giving value as first argument and key/index as second.

Emsh:

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

ECO:

```
{
    type: "forLoop",
    variableName: string,
    variableType: string,
    condition: Expression,
    step: Expression,
    body: Code
}
```

#### While Loop

Emsh:

```
while condition:
    // While loop body
```

```
while (condition):
    // While loop body
```

ECO:

```
{
    type: "whileLoop",
    condition: Expression,
    body: Code
}
```

#### Do-While Loop

Emsh:

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

ECO:

```
{
    type: "doWhileLoop",
    condition: Expression,
    body: Code
}
```

### Conditional statements

#### If

Emsh:

```
if condition:
    // if body
```

```
if (condition):
    // if body
```

ECO:

```
{
    type: "if",
    condition: Expression,
    body: Code
}
```

#### Else

```
else:
    // else body
```

```
else:
    // else body
```

ECO:

```
{
    type: "else",
    condition: Expression,
    body: Code
}
```

#### Else if

```
else if condition:
    // else if body
```

```
else if (condition):
    // else if body
```

```
elif (condition):
    // else if body
```

ECO:

```
{
    type: "elseIf",
    condition: Expression,
    body: Code
}
```

### Return statement

Emsh:

```
return expression
```

ECO:

```
{
    type: "return",
    expression: Expression
}
```

### Display statement

Display statement declares that we want to display in any way possible chosen expression - it's up to generator to choose how it will be implemented.
Emsh:

```
display expression
```

```
display(expression)
```

ECO:

```
{
    type: "display",
    expression: Expression
}
```

### Assigment

Assigns to variable value of Expression

Emsh:

```
variable equals expression
```

```
variable = expression
```

ECO:

```
{
    type: "assigment",
    variable: Variable,
    expression: Expression
}
```

### Variable

Emsh Variable in first version will be treated as staticly typed. Maybe later versions will add optional support for dynamic typing, but using it will make it impossible to translate it into staticly typed languages.

### Incrementation

Emsh:

```
increment x
```

```
x++
```

ECO:

```
{
    type: "increment",
    variable: Variable,
}
```

### Decrementation

Emsh:

```
decrement x
```

```
x--
```

ECO:

```
{
    type: "decrement",
    variable: Variable,
}
```

### Primitive types

#### Integer

Emsh:

```
x = 1
```

ECO:

```
{
    type: "integer",
    name: string,
    initialValue: integer
}
```

#### Double

Emsh:

```
x = 1.05
```

ECO:

```
{
    type: "double",
    name: string,
    initialValue: double
}
```

#### Char

Emsh:

```
x = 'a'
```

ECO:

```
{
    type: "char",
    name: string,
    initialValue: char
}
```

### Complex types

#### String

Emsh:

```
x = "Hello world!"
```

ECO:

```
{
    type: "string",
    name: string,
    initialValue: string
}
```

#### Array

Emsh:

```
x = [1, 2, 3]
```

ECO:

```
{
    type: "array",
    contains: primitiveType | complexType,
    initialValue: array
}
```

#### Object

Object contains key-value pairs, where key is string and value can be of any type. It's equivalent in some languages is struct.

Emsh:

```
x = {
    key1: "hello",
    key2: 1,
    key3: [1, 2, 3]
}
```

ECO:

```
{
    type: "object",
    body: any[],
    initialValue: object
}
```

### Asynchronous programming

## Emsh Networking

Emsh Networking implements support for HTTP client

## Emsh Base

Emsh base implements support for basic programming patterns

### Singleton

### Factory

### Builder

### Adapter

## Emsh MVCPattern

MVCPattern is transpiler that allows one to write code from which it will be possible to generate code in frameworks such as React, Vue, Angular or C# WPF.

### MVCPattern

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

### MVCModel

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

### MVCView

```
MVCView:
    // Will be determined soon
```

### MVCController

```
MVCController:
    function sendData(x, y, z):
        // Send data to server
```

## Emsh Server

Emsh server implements functionality required for

## Emsh DataSchema

## Emsh Database

## Emsh Transpiler

Emsh Transpiler is responsible for changing Emsh Language code into ECO. It's design is modular, allowing easy replacement of EmshCore parts, but also expanding it so that it could develop with other languages and frameworks as the time goes.

## Emsh Generator

Emsh Generator is the part that changes ECO into valid code in chosen language/framework.
s
