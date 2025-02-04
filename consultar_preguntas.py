from pyswip import Prolog
import re

def consultar_preguntas():
    prolog = Prolog()
    prolog.consult("prolog.pl")
    consulta =  prolog.query("preguntas_por_area(Resultado)") 
    dict = {}
    for soln in consulta :
        for i in range(len(soln['Resultado'])):
            data = soln['Resultado'][i].value
            coma = data.find(',')
            area = data[:coma][2:]
            preguntas = data[coma+2:-1][1:-1]
            pattern = r"'([^']*)'"
            matches = re.findall(pattern, preguntas)
            dict[area] = matches
    return dict

