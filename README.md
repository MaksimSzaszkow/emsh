# Emsh

Emsh is a set of tools that can be used to create solution to any programming problem in any supported programming language. It consists of four parts:

- Emsh Language
- Emsh Transpiler
- Emsh Code Object (ECO)
- Emsh Generator

## Emsh Language

Emsh language is higher level abstraction programming language, that is changed into ECO by Emsh Transpiler. It's main purpose is to provide easy and natural syntax, that allows creating solution that works as planned in any supported language or framework in no time - without the need to know the language or framework itself.

Emsh language should be thought of as programmers way of writing ECO's, as it's possible to write valid ECO without using Emsh Language - it just makes it easier and allows one to focus on solving the problem, without worrying about the details of valid ECO writing.

Emsh language not only supports multiple (differently expressive) ways of coding the same, but also allows one to change keywords, making it possible to translate Emsh into any natural language.

## Emsh Transpiler

Emsh Transpiler is responsible for changing Emsh Language code into ECO. It's design is modular, allowing easy replacement of EmshCore parts, but also expanding it so that it could develop with other languages and frameworks as the time goes.

## Emsh Code Object

ECO contains all information needed for generator to change it into valid code of given language/framework. It's done by encoding every notable part of code into structs with properties that are sufficient to create it in chosen language.

ECO is not supposed to compress code - only be a backbone from which code will be written in chosen language. One ECO is enought to get functionaly the same code in every supported language/framework.

## Emsh Generator

Emsh Generator is the part that changes ECO into valid code in chosen language/framework.
