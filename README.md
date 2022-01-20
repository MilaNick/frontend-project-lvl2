### Hexlet tests and linter status:
[![Actions Status](https://github.com/MilaNick/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/MilaNick/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/380c1b7806a4bcad9861/maintainability)](https://codeclimate.com/github/MilaNick/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/380c1b7806a4bcad9861/test_coverage)](https://codeclimate.com/github/MilaNick/frontend-project-lvl2/test_coverage)
[![example workflow](https://github.com/MilaNick/frontend-project-lvl2/actions/workflows/actions.yml/badge.svg)](https://github.com/MilaNick/frontend-project-lvl2/actions)
<<<<<<< HEAD
  
=======
>>>>>>> f673a55d21238b77d4d2472a3c7de5ff0d1fff62
## ✨ Project-gendiff ✨

Project 'Difference calculator'. The project implements a utility to find differences in configuration files.

## Description

Utility Features:
- support for different formats - json, yaml, ini;
- generating a report in the form of plain text, pretty and json

## Installation

```npm i -g project-gendiff```

## Run

```
$ gendiff --help
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
-V, --version        output the version number
-f, --format [type]  Output format (default: "stylish")
-h, --help           output usage information
```

## Examples
### flat file 
file1:  
```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
file2:  
```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```  
run:
```
gendiff 'file1.json' 'file2.json'

```
[![asciicast](https://asciinema.org/a/441860.svg)](https://asciinema.org/a/441860)

run:
```
gendiff 'file1.yml' 'file2.yml'

```
[![asciicast](https://asciinema.org/a/446615.svg)](https://asciinema.org/a/446615)  

### files with nested structure with different formats

[![asciicast](https://asciinema.org/a/3QJsSfKlvbxYOUJ13YgYFGxoq.svg)](https://asciinema.org/a/3QJsSfKlvbxYOUJ13YgYFGxoq)

## Purpose
This is an application implemented as part of the second project when studying the profession of a Javascript developer on hexlet.io . The second project is a logical development of [the first](https://github.com/MilaNick/frontend-project-lvl1) It captures most of the syntactic capabilities of js and uses a more complex architecture. Requirements:
* learn how to create full-fledged CLI applications (command-line interface), with parsing of input parameters, validation, and help generation;
* understand json, yaml, ini data formats - understand the structure, learn how to parse in js and back;
* work with trees - traversal, transformation, formation of AST (abstract syntactic tree) - a bit of code boiling the brain;
* get to know and put into practice the architectural principles of 'Facade', 'Adapter';
* implement subtype polymorphism in practice;
* make the whole project in a functional style.






