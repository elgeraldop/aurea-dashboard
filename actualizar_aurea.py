import re

with open('AUREA_Digital_Office.html', 'r', encoding='utf-8') as f:
    c = f.read()

# ============================================================
# 1. REEMPLAZOS DE PERIODOS (fechas de fases)
# ============================================================
periods = {
    'period:"Jul 13-26"': 'period:"Ago 17-30"',
    'period:"Jul 27 - Ago 9"': 'period:"Ago 31 - Sep 13"',
    'period:"Ago 10-31"': 'period:"Sep 14 - Oct 5"',
    'period:"Sep 1 - Oct 31"': 'period:"Oct 6 - Nov 30"',
    'period:"Jul 13-19"': 'period:"Ago 17-23"',
    'period:"Jul 20 - Ago 9"': 'period:"Ago 24 - Sep 13"',
    'period:"Jul 13 - Ago 9"': 'period:"Ago 17 - Sep 13"',
    'period:"Jul 13 - Ago 31"': 'period:"Ago 17 - Oct 5"',
}
for old, new in periods.items():
    c = c.replace(old, new)

# ============================================================
# 2. REEMPLAZOS DE TÍTULOS DE FASES
# ============================================================
titles = {
    'title:"Jul: Identidad y Setup"': 'title:"Ago: Identidad y Setup"',
    'title:"Jul: Identidad y Piloto"': 'title:"Ago: Identidad y Piloto"',
    'title:"Jul: Investigacion y Setup"': 'title:"Ago: Investigacion y Setup"',
    'title:"Jul-Ago: Fundacion Digital"': 'title:"Ago-Sep: Fundacion Digital"',
    'title:"Jul: Lanzamiento"': 'title:"Ago: Lanzamiento"',
    'title:"Ago: Producto y Contenido"': 'title:"Sep: Producto y Contenido"',
    'title:"Ago: Lanzamiento y Video"': 'title:"Sep: Lanzamiento y Video"',
    'title:"Agosto: Primer Cliente"': 'title:"Septiembre: Primer Cliente"',
    'title:"Agosto: Escala y automatizacion"': 'title:"Septiembre: Escala y automatizacion"',
    'title:"Sep-Oct: Crecimiento"': 'title:"Oct-Nov: Crecimiento"',
    'title:"Sep-Oct: Comunidad"': 'title:"Oct-Nov: Comunidad"',
    'title:"Sep-Oct: Escala"': 'title:"Oct-Nov: Escala"',
    'title:"Jul: Setup y Primeras Ventas"': 'title:"Ago: Setup y Primeras Ventas"',
    'title:"Ago: Contenido y Conversion"': 'title:"Sep: Contenido y Conversion"',
    'title:"Jul: Lanzamiento y Primeros Clientes"': 'title:"Ago: Lanzamiento y Primeros Clientes"',
    'title:"Ago-Sep: Escalamiento"': 'title:"Sep-Oct: Escalamiento"',
    'title:"Jul: Setup Legal y Primeros Clientes"': 'title:"Ago: Setup Legal y Primeros Clientes"',
    'title:"Ago: Escalamiento Operativo"': 'title:"Sep: Escalamiento Operativo"',
    'title:"Jul: Lanzamiento y Primeras Reservas"': 'title:"Ago: Lanzamiento y Primeras Reservas"',
    'title:"Jul: Setup y Primeros Clientes"': 'title:"Ago: Setup y Primeros Clientes"',
    'title:"Ago-Sep: Crecimiento"': 'title:"Sep-Oct: Crecimiento"',
    'title:"Jul: Setup Legal"': 'title:"Ago: Setup Legal"',
    'title:"Ago: Primeros Clientes y Contenido"': 'title:"Sep: Primeros Clientes y Contenido"',
    'title:"Sep-Oct: Escalamiento"': 'title:"Oct-Nov: Escalamiento"',
}
for old, new in titles.items():
    c = c.replace(old, new)

# ============================================================
# 3. REEMPLAZOS DE TEXTOS EN GOALS / TIPS / TASKS
# ============================================================
texts = {
    'text:"1er cliente firmado antes de octubre 2026"': 'text:"1er cliente firmado antes de noviembre 2026"',
    'text:"antes de fin de septiembre 2026"': 'text:"antes de fin de octubre 2026"',
    'text:"10 propietarios activos para octubre 2026"': 'text:"10 propietarios activos para noviembre 2026"',
    'text:"Identidad visual y Shopify antes de septiembre"': 'text:"Identidad visual y Shopify antes de octubre"',
    'text:"10+ suscriptores La Caja GLACE en octubre"': 'text:"10+ suscriptores La Caja GLACE en noviembre"',
    'text:"Follow-up a todos los contactos de julio"': 'text:"Follow-up a todos los contactos de agosto"',
    'text:"1a comision cobrada antes de fin de septiembre 2026"': 'text:"1a comision cobrada antes de fin de octubre 2026"',
}
for old, new in texts.items():
    c = c.replace(old, new)

# ============================================================
# 4. REEMPLAZOS DE NOTAS
# ============================================================
notes = {
    'notes:"Julio: facturacion minima"': 'notes:"Agosto: facturacion minima"',
    'notes:"Agosto: primeras ventas"': 'notes:"Septiembre: primeras ventas"',
    'notes:"Septiembre: consolidacion"': 'notes:"Octubre: consolidacion"',
    'notes:"Julio: lanzamiento"': 'notes:"Agosto: lanzamiento"',
    'notes:"Julio: setup"': 'notes:"Agosto: setup"',
    'notes:"Agosto: crecimiento"': 'notes:"Septiembre: crecimiento"',
    'notes:"Julio: setup legal"': 'notes:"Agosto: setup legal"',
    'notes:"Agosto: primeros clientes"': 'notes:"Septiembre: primeros clientes"',
    'notes:"Septiembre: escalamiento"': 'notes:"Octubre: escalamiento"',
    'notes:"Julio: presencia"': 'notes:"Agosto: presencia"',
    'notes:"Agosto: outreach"': 'notes:"Septiembre: outreach"',
    'notes:"Septiembre: cierre"': 'notes:"Octubre: cierre"',
    'notes:"Julio: primeros clientes"': 'notes:"Agosto: primeros clientes"',
    'notes:"Agosto: contenido"': 'notes:"Septiembre: contenido"',
    'notes:"Septiembre-Octubre: crecimiento"': 'notes:"Octubre-Noviembre: crecimiento"',
    'notes:"Julio: lanzamiento y primeros clientes"': 'notes:"Agosto: lanzamiento y primeros clientes"',
    'notes:"Agosto-Septiembre: escalamiento"': 'notes:"Septiembre-Octubre: escalamiento"',
    'notes:"Julio: setup y primeras ventas"': 'notes:"Agosto: setup y primeras ventas"',
    'notes:"Agosto-Septiembre: crecimiento"': 'notes:"Septiembre-Octubre: crecimiento"',
    'notes:"Julio: setup legal y primeros clientes"': 'notes:"Agosto: setup legal y primeros clientes"',
    'notes:"Agosto: escalamiento operativo"': 'notes:"Septiembre: escalamiento operativo"',
    'notes:"Julio: lanzamiento y primeras reservas"': 'notes:"Agosto: lanzamiento y primeras reservas"',
    'notes:"Julio: setup y primeros clientes"': 'notes:"Agosto: setup y primeros clientes"',
    'notes:"Agosto: primeros clientes y contenido"': 'notes:"Septiembre: primeros clientes y contenido"',
    'notes:"Septiembre-Octubre: escalamiento"': 'notes:"Octubre-Noviembre: escalamiento"',
}
for old, new in notes.items():
    c = c.replace(old, new)

# ============================================================
# 5. OTROS REEMPLAZOS SUELTOS
# ============================================================
c = c.replace('Hoy es 10 de julio de 2026', 'Hoy es 17 de agosto de 2026')
c = c.replace('10 de julio de 2026 — Semana 1-2', '17 de agosto de 2026 — Semana 1-2')
c = c.replace('Version 1.0 — Julio 2026', 'Version 1.0 — Agosto 2026')
c = c.replace('holding de 6 empresas', 'holding de 7 empresas')

# Periodo suelto en la línea de tiempo global
c = c.replace('period:"Agosto"', 'period:"Septiembre"')
c = c.replace('period:"Sep - Oct"', 'period:"Oct - Nov"')

# Calendario: día de inicio
c = c.replace('day:13,month:6,year:2026', 'day:17,month:7,year:2026')

# ============================================================
# 6. AGREGAR EMPRESA E-COMMERCE EN xa
# ============================================================
# Insertar después de WO! Press en xa
commerce_xa = ''',{id:"commerce",nombre:"AUREA Commerce",tag:"Tienda digital premium",tagline:"Productos curados - Dropshipping - Marca propia",capital:1500,m3:4500,m6:12000,color:"#8B5CF6",fases:[{period:"Ago 17-30",title:"Ago: Investigacion y Setup",focus:"Validar nicho y proveedores. Setup Shopify.",tasks:[{text:"Investigar 3 nichos rentables (herramientas, wellness, tech)",done:!1,notes:"Validar demanda con Google Trends y TikTok"},{text:"Contactar 5 proveedores dropshipping (AliExpress/CJ)",done:!1,notes:"Evaluar tiempos de envio y calidad"},{text:"Crear cuenta Shopify y configurar dominio",done:!1,notes:"Tema minimalista, checkout optimizado"},{text:"Definir politica de envios y devoluciones",done:!1,notes:"Espana y UE como mercados iniciales"}],tips:["Nicho > Producto. Un nicho apasionado paga premium.","Shopify + Oberlo/CJ Dropshipping = MVP en 48h.","El 80% del exito es el trafico, no la tienda."],goal:{text:"1a venta antes de fin de septiembre 2026",current:0,target:1},status:"active"},{period:"Ago 31 - Sep 13",title:"Sep: Producto y Contenido",focus:"Cargar catalogo. Crear contenido viral.",tasks:[{text:"Cargar 10 productos con descripciones persuasivas",done:!1,notes:"Copy AIDA, fotos de proveedor mejoradas"},{text:"Crear 5 videos TikTok/Reels de producto",done:!1,notes:"Hooks: 'Esto no lo venden en Espana...'"},{text:"Configurar Facebook/Instagram Ads (presupuesto EUR 5/dia)",done:!1,notes:"Audiencia: 25-45, intereses del nicho"},{text:"Setup email marketing (Klaviyo free)",done:!1,notes:"Welcome series + abandoned cart"}],tips:["Un video con 10K views puede generar 50 ventas.","Ads sin contenido organico = dinero quemado.","El abandoned cart recupera el 10-15%."],goal:{text:"10 ventas en el primer mes",current:0,target:10},status:"pending"},{period:"Sep 14 - Oct 5",title:"Sep-Oct: Crecimiento",focus:"Escalar ads. Optimizar conversion.",tasks:[{text:"Analizar metricas y pausar productos sin ventas",done:!1,notes:"ROAS > 2 = escalar, ROAS < 1 = pausar"},{text:"Duplicar presupuesto ads en productos ganadores",done:!1,notes:"Aumentar 20% cada 3 dias"},{text:"Crear upsells y bundles (productos complementarios)",done:!1,notes:"AOV = ticket promedio, objetivo +30%"},{text:"Solicitar 5 reviews con foto a primeros clientes",done:!1,notes:"Social proof = conversion x2"}],tips:["Escala solo lo que ya funciona.","Reviews con foto > reviews de texto x5.","Bundle = mas margen sin mas trafico."],goal:{text:"100 ventas acumuladas",current:0,target:100},status:"pending"},{period:"Oct 6 - Nov 30",title:"Oct-Nov: Escala",focus:"Automatizar. Expandir catalogo.",tasks:[{text:"Contratar VA para atencion al cliente (2h/dia)",done:!1,notes:"Fiverr/Upwork, EUR 5-8/hora"},{text:"Lanzar 2 productos nuevos por mes",done:!1,notes:"Test rapido, matar rapido"},{text:"Crear programa de afiliados (10% comision)",done:!1,notes:"Influencers micro 1K-10K followers"},{text:"Evaluar marca propia (white label) para producto estrella",done:!1,notes:"Margen del 40% vs 20% dropshipping"}],tips:["Automatizar antes de escalar = evitar burnout.","Marca propia = diferenciacion real.","Afiliados = trafico gratis pagado por resultados."],goal:{text:"EUR 3,000/mes recurrentes",current:0,target:3000},status:"pending"}],tips:["El dropshipping es la puerta. La marca propia es el imperio.","TikTok organic > Ads pagadas para validar.","El follow-up post-compra genera el 30% de las ventas."],goals:[{text:"1a venta antes de fin de septiembre 2026",current:0,target:1},{text:"EUR 1,000 en ventas mes 1",current:0,target:1000},{text:"100 clientes activos en 90 dias",current:0,target:100}],active:!0}'''

# Encontrar el cierre de wopress en xa
wopress_end = c.find('active:!0}', c.find('id:"wopress"'))
if wopress_end != -1:
    c = c[:wopress_end+10] + commerce_xa + c[wopress_end+10:]

# ============================================================
# 7. AGREGAR EMPRESA E-COMMERCE EN ly (sidebar)
# ============================================================
commerce_ly = ''',{id:"commerce",label:"AUREA Commerce",icon:"ShoppingCart",color:"#8B5CF6"}'''

# Encontrar el cierre de wopress en ly
wopress_ly_end = c.find('}', c.find('id:"wopress"', c.find('ly=[')))
if wopress_ly_end != -1:
    c = c[:wopress_ly_end+1] + commerce_ly + c[wopress_ly_end+1:]

# ============================================================
# 8. AGREGAR EMPRESA E-COMMERCE EN ny (top nav)
# ============================================================
commerce_ny = ''',{id:"commerce",label:"Commerce",color:"#8B5CF6"}'''

# Encontrar el cierre de wopress en ny
wopress_ny_end = c.find('}', c.find('id:"wopress"', c.find('ny=[')))
if wopress_ny_end != -1:
    c = c[:wopress_ny_end+1] + commerce_ny + c[wopress_ny_end+1:]

# ============================================================
# 9. AGREGAR E-COMMERCE AL PROMPT DEL AGENTE
# ============================================================
commerce_prompt = '''- AUREA Commerce (commerce): Tienda digital premium. Dropshipping escalable hacia marca propia. Meta mes 3: EUR 3,000/mes.
'''

# Insertar después de WO! Press en el prompt
wopress_prompt = '- WO! Press (wopress): Media tech.'
wopress_prompt_idx = c.find(wopress_prompt)
if wopress_prompt_idx != -1:
    end_line = c.find('\\n', wopress_prompt_idx)
    c = c[:end_line+1] + commerce_prompt + c[end_line+1:]

# ============================================================
# 10. GUARDAR
# ============================================================
with open('AUREA_Digital_Office_Actualizado.html', 'w', encoding='utf-8') as f:
    f.write(c)

print("✅ Archivo actualizado: AUREA_Digital_Office_Actualizado.html")
print("Fechas actualizadas a partir del lunes 17 de agosto de 2026.")
print("Empresa E-Commerce agregada como unidad #7 del holding.")
