#!/bin/bash
#eliminamos todos los archivos que esten en las carpetas y subcarpetas que terminern en spec.ts
find . -name '*spec.ts' -type f -delete