### Hexlet tests and linter status:
[![Actions Status](https://github.com/MilaNick/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/MilaNick/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/380c1b7806a4bcad9861/maintainability)](https://codeclimate.com/github/MilaNick/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/380c1b7806a4bcad9861/test_coverage)](https://codeclimate.com/github/MilaNick/frontend-project-lvl2/test_coverage)
[![example workflow](https://github.com/MilaNick/frontend-project-lvl2/actions/workflows/actions.yml/badge.svg)](https://github.com/MilaNick/frontend-project-lvl2/actions)

## ✨ Project-gendiff ✨

Проект 'Вычислитель отличий'. В проекте реализована утилита для поиска отличий в конфигурационных файлах.

## Описание

Возможности утилиты:  
- поддержка разных форматов - json, yaml, ini;  
- генерация отчета в виде plain text, pretty и json  

## Установка

```npm i -g project-gendiff```

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

## Examples
### flat json  
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
запуск:
```
gendiff 'file1.json' 'file2.json'

```
[![asciicast](https://asciinema.org/a/441860.svg)](https://asciinema.org/a/441860)  

## Цель
Это приложение, реализованное в рамках второго проекта при изучении профессии Javascript-разработчика на hexlet.io. Второй проект является логическим развитием [первого](https://ru.wikipedia.org/) Он захватывает большую часть синтаксических возможностей js и использует более сложную архитектуру. Требования:
* научиться создавать полноценные CLI-приложения (command-line interface), с парсингом входных параметров, валидацией, и генерацией справки;
* разобраться с форматами данных json, yaml, ini - понять структуру, научиться парсить в js и обратно;
* поработать с деревьями - обход, трансформация, формирование АСТ (абстрактное синтаксическое дерево) - немного кода, кипятящего мозг;
* познакомиться и реализовать на практике архитектурные принципы 'Фасад', 'Адаптер';
* реализовать полиморфизм подтипов на практике;
* сделать весь проект в функциональном стиле.






