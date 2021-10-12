### Hexlet tests and linter status:
[![Actions Status](https://github.com/MilaNick/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/MilaNick/frontend-project-lvl2/actions)  
## Project-gendiff

Проект 'Вычислитель отличий'
Это приложение, реализованное в рамках второго проекта при изучении профессии Javascript-разработчика на hexlet.io.
***
## Цель

Второй проект является логическим развитием первого. Он захватывает большую часть синтаксических возможностей js и использует более сложную архитектуру. Требования:
* научиться создавать полноценные CLI-приложения (command-line interface), с парсингом входных параметров, валидацией, и генерацией справки;
* разобраться с форматами данных json, yaml, ini - понять структуру, научиться парсить в js и обратно;
* поработать с деревьями - обход, трансформация, формирование АСТ (абстрактное синтаксическое дерево) - немного кода, кипятящего мозг;
* познакомиться и реализовать на практике архитектурные принципы 'Фасад', 'Адаптер';
* реализовать полиморфизм подтипов на практике;
* сделать весь проект в функциональном стиле.
***
## Описание

В рамках данного проекта необходимо реализовать утилиту для поиска отличий в конфигурационных файлах.
Возможности утилиты:
Поддержка разных форматов - json, yaml, ini;
Генерация отчета в виде plain text, pretty и json
***
## Пример использования:

```
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```
***
## Установка

```npm i -g project-gendiff```
***
## Запуск

```
$ gendiff --help
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
-V, --version        output the version number
-f, --format [type]  Output format (default: "stylish")
-h, --help           output usage information
```
***  
#### Ключевые слова:

TDD, unit-тестирование, функциональное программирование, абстрактное синтаксическое дерево, форматы данных, полиморфизм, архитектурные принципы  
## Examples
### flat json  
file1:  
```html
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
file2:  
```html
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```  
Здесь будет аскинема  
***





