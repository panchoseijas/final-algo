from pyswip import Prolog


def consultar_carreras(area):
    prolog = Prolog()
    prolog.consult("prolog.pl")
    dic = {area:[]}
    for soln in prolog.query(f"carrera({area},Profesion)") :
        dic[area].append(soln['Profesion'])
        

    return dic
