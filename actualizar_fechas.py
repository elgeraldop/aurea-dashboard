#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AUREA Dashboard - Actualizador de fechas
Actualiza todas las fechas al contexto de octubre 2026
Uso: python actualizar_fechas.py
Coloca este script en la misma carpeta que tu index.html
"""

import os
import shutil
from datetime import datetime

ARCHIVO = "index.html"
BACKUP  = "index_backup_original.html"

def actualizar():
    if not os.path.exists(ARCHIVO):
        print(f"ERROR: No encontre '{ARCHIVO}' en esta carpeta.")
        print("Coloca este script en la misma carpeta que tu index.html y vuelve a correrlo.")
        return

    # Backup
    shutil.copy(ARCHIVO, BACKUP)
    print(f"Backup creado: {BACKUP}")

    with open(ARCHIVO, "r", encoding="utf-8") as f:
        src = f.read()

    original_size = len(src)
    cambios = 0

    def reemplazar(old, new, desc):
        nonlocal src, cambios
        if old in src:
            src = src.replace(old, new)
            cambios += 1
            print(f"  OK  {desc}")
        else:
            print(f"  --  No encontrado (puede que ya este actualizado): {desc}")

    print("\n=== ACTUALIZANDO FECHAS ===\n")

    # --- FECHA META LIBERTAD FINANCIERA ---
    reemplazar(
        '"2026-07-01T00:00:00"',
        '"2026-11-01T00:00:00"',
        "Meta libertad financiera: julio -> noviembre 2026"
    )
    reemplazar(
        "'2026-07-01T00:00:00'",
        "'2026-11-01T00:00:00'",
        "Meta libertad financiera (comillas simples)"
    )
    reemplazar(
        "2026-07-01",
        "2026-11-01",
        "Meta libertad financiera fecha ISO"
    )

    # --- FECHA VIAJE MADRID ---
    reemplazar(
        '"2026-07-22T00:00:00"',
        '"2026-12-02T00:00:00"',
        "Fecha viaje Madrid: 22 julio -> 2 diciembre 2026"
    )
    reemplazar(
        "'2026-07-22T00:00:00'",
        "'2026-12-02T00:00:00'",
        "Fecha viaje Madrid (comillas simples)"
    )
    reemplazar(
        "2026-07-22",
        "2026-12-02",
        "Fecha Madrid ISO"
    )
    reemplazar(
        "2026-07-31",
        "2026-12-12",
        "Fecha fin viaje Madrid"
    )

    # --- TEXTOS DE FECHA MADRID ---
    reemplazar("22-31 Jul", "2-12 Dic", "Sidebar: fechas viaje")
    reemplazar("22-31 Julio", "2-12 Diciembre", "Sidebar: fechas viaje largo")
    reemplazar("22 al 31 de julio", "2 al 12 de diciembre", "Texto fechas viaje")
    reemplazar("22-31 julio 2026", "2-12 diciembre 2026", "Texto fechas viaje 2")
    reemplazar("Jul 22-31", "Dic 2-12", "Fechas viaje formato alt")
    reemplazar("July 22-31", "December 2-12", "Fechas viaje ingles")

    # --- MISION EJECUTIVA JULIO -> DICIEMBRE ---
    reemplazar("Madrid 22-31 Jul 2026", "Madrid 2-12 Dic 2026", "Panel viaje titulo")
    reemplazar("Madrid Jul 2026", "Madrid Dic 2026", "Referencia corta Madrid jul")
    reemplazar("julio 22-31, 2026", "diciembre 2-12, 2026", "Fecha viaje texto largo")
    reemplazar("julio 22-31 2026", "diciembre 2-12 2026", "Fecha viaje texto largo 2")

    # --- DIAS DE AGENDA ---
    reemplazar('"22 Jul Mie"', '"2 Dic Jue"',  "Agenda dia 1")
    reemplazar('"23 Jul Jue"', '"3 Dic Vie"',  "Agenda dia 2")
    reemplazar('"24 Jul Vie"', '"4 Dic Sab"',  "Agenda dia 3")
    reemplazar('"25 Jul Sab"', '"5 Dic Dom"',  "Agenda dia 4")
    reemplazar('"26 Jul Dom"', '"6 Dic Lun"',  "Agenda dia 5")
    reemplazar('"27 Jul Lun"', '"7 Dic Mar"',  "Agenda dia 6")
    reemplazar('"28 Jul Mar"', '"8 Dic Mie"',  "Agenda dia 7")
    reemplazar('"29 Jul Mie"', '"9 Dic Jue"',  "Agenda dia 8")
    reemplazar('"30 Jul Jue"', '"10 Dic Vie"', "Agenda dia 9")
    reemplazar('"31 Jul Vie"', '"11 Dic Sab"', "Agenda dia 10 / salida")

    # Variantes sin comillas dobles externas
    reemplazar("'22 Jul Mie'", "'2 Dic Jue'",  "Agenda dia 1 alt")
    reemplazar("'23 Jul Jue'", "'3 Dic Vie'",  "Agenda dia 2 alt")
    reemplazar("'24 Jul Vie'", "'4 Dic Sab'",  "Agenda dia 3 alt")
    reemplazar("'25 Jul Sab'", "'5 Dic Dom'",  "Agenda dia 4 alt")
    reemplazar("'26 Jul Dom'", "'6 Dic Lun'",  "Agenda dia 5 alt")
    reemplazar("'27 Jul Lun'", "'7 Dic Mar'",  "Agenda dia 6 alt")
    reemplazar("'28 Jul Mar'", "'8 Dic Mie'",  "Agenda dia 7 alt")
    reemplazar("'29 Jul Mie'", "'9 Dic Jue'",  "Agenda dia 8 alt")
    reemplazar("'30 Jul Jue'", "'10 Dic Vie'", "Agenda dia 9 alt")
    reemplazar("'31 Jul Vie'", "'11 Dic Sab'", "Agenda dia 10 alt")

    # --- HOTEL ---
    reemplazar(
        "Four Points Flex Sheraton Atocha",
        "Marriott Atocha",
        "Hotel: Sheraton -> Marriott Atocha"
    )
    reemplazar(
        "Four Points Sheraton Atocha",
        "Marriott Atocha",
        "Hotel: Sheraton corto -> Marriott Atocha"
    )
    reemplazar(
        "aprox EUR 98/noche",
        "Socios Bonvoy",
        "Precio hotel -> referencia Bonvoy"
    )

    # --- AION LINK ---
    reemplazar(
        'href="https://gemini.google.com"',
        'href="https://gemini.google.com/gem/19RRmHSkFUSGbnjofu4_ksE_oENE32Zhp?usp=sharing"',
        "AION: link general -> Gem AION directo"
    )
    reemplazar(
        "href='https://gemini.google.com'",
        "href='https://gemini.google.com/gem/19RRmHSkFUSGbnjofu4_ksE_oENE32Zhp?usp=sharing'",
        "AION: link general -> Gem AION directo (comillas simples)"
    )

    # --- CALENDARIO: bloque Madrid mes 6 (julio) -> mes 11 (diciembre) ---
    reemplazar(
        "calMonth===6&&calYear===2026",
        "calMonth===11&&calYear===2026",
        "Calendario: bloque Madrid mes julio -> diciembre"
    )
    reemplazar(
        "calMonth === 6 && calYear === 2026",
        "calMonth === 11 && calYear === 2026",
        "Calendario: bloque Madrid (con espacios)"
    )

    # --- REFERENCIAS TEXTUALES A JULIO ---
    reemplazar("Mision ejecutiva - julio 2026", "Mision ejecutiva - diciembre 2026", "Texto mision julio")
    reemplazar("viaje julio 2026", "viaje diciembre 2026", "Texto viaje julio")
    reemplazar("Julio 22-31", "Diciembre 2-12", "Texto julio 22-31 capitalizado")

    # --- META BREAK-EVEN ---
    reemplazar(
        "Meta: $1,200/mes sostenidos",
        "Break-even: $1,200/mes — noviembre 2026",
        "Texto meta libertad financiera"
    )

    # --- GUARDAR ---
    with open(ARCHIVO, "w", encoding="utf-8") as f:
        f.write(src)

    print(f"\n=== LISTO ===")
    print(f"Cambios aplicados: {cambios}")
    print(f"Tamano original:   {original_size:,} bytes")
    print(f"Tamano nuevo:      {len(src):,} bytes")
    print(f"Backup en:         {BACKUP}")
    print(f"\nSube el '{ARCHIVO}' actualizado a GitHub arrastrando el archivo.")
    print("Recuerda: arrastrando, nunca copy-paste.")

if __name__ == "__main__":
    actualizar()
