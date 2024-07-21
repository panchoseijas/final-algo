from pyswip import Prolog

def calcular_probabilidades_areas(respuestas):
    prolog = Prolog()
    prolog.consult('prolog.pl')
    respuestas_prolog = '[{}]'.format(', '.join(map(str, respuestas)))

    consulta = f'calcular_probabilidades_respuestas({respuestas_prolog}, Probabilidades)'
    resultado = list(prolog.query(consulta))
    
    if resultado:
        probabilidades_areas = {}
        lista_probabilidades = resultado[0]['Probabilidades']
        for probabilidad in lista_probabilidades:
            partes = probabilidad.replace("-", "").replace("(", "").replace(")", "").split(",")
            area = partes[0]
            probabilidad = round(float(partes[1]), 2)
            # print("{} = {}%".format(area, probabilidad))
            probabilidades_areas[area] = probabilidad
        return probabilidades_areas
    else:
        raise Exception("Error con el interprete prolog")

    