%HECHOS
% Preguntas por área
pregunta(linguistica, "Leer libros, revistas, novelas, ensayos, etc.").
pregunta(linguistica, "Escribir textos").
pregunta(linguistica, "Analizar e identificar las ideas principales de un texto").
pregunta(linguistica, "Entender un texto escrito").

pregunta(logica_matematica, "Hacer cuentas matematicas").
pregunta(logica_matematica, "Usar estadisticas").
pregunta(logica_matematica, "Solucionar problemas logicos").
pregunta(logica_matematica, "Pensar y descomponer logicamente un problema").

pregunta(espacial, "Dibujar de forma precisa").
pregunta(espacial, "Armar maquetas o modelos").
pregunta(espacial, "Dibujar planos").
pregunta(espacial, "Disenar objetos").

pregunta(musica, "Tocar un instrumento musical").
pregunta(musica, "Escuchar musica").
pregunta(musica, "Cantar").
pregunta(musica, "Escuchar y reconocer distintos instrumentos musicales").

pregunta(interpersonal, "Coordinar grupos").
pregunta(interpersonal, "Exponer un tema o idea en publico").
pregunta(interpersonal, "Defender los derechos de otras personas").
pregunta(interpersonal, "Iniciar y mantener conversaciones con otras personas").

pregunta(kinestesico_corporal, "Hacer ejercicio fisico").
pregunta(kinestesico_corporal, "Hacer movimientos que requieren equilibrio").
pregunta(kinestesico_corporal, "Manejar objetos de forma precisa").
pregunta(kinestesico_corporal, "Manipular objetos con coordinacion").

pregunta(intrapersonal, "Reconocer estados emocionales propios").
pregunta(intrapersonal, "Tener Autocontrol Emocional").
pregunta(intrapersonal, "Contener emocionalmente a otras personas").
pregunta(intrapersonal, "Analizar tus propios pensamientos y acciones").

pregunta(naturalista, "Estar en contacto con la naturaleza").
pregunta(naturalista, "Analizar materia organica").
pregunta(naturalista, "Estudiar temas vinculados a la biologia y el cuerpo humano").
pregunta(naturalista, "Analizar fenomenos naturales").

% Carreras y profesiones en diferentes áreas
% Lingüística
carrera(linguistica, periodista).
carrera(linguistica, escritor).
carrera(linguistica, editor).
carrera(linguistica, profesor_de_lengua).

% Lógica Matemática
carrera(logica_matematica, matematico).
carrera(logica_matematica, ingeniero).
carrera(logica_matematica, estadistico).
carrera(logica_matematica, cientifico_de_datos).

% Espacial
carrera(espacial, arquitecto).
carrera(espacial, disenador_grafico).
carrera(espacial, ingeniero_civil).
carrera(espacial, artista).

% Música
carrera(musica, musico).
carrera(musica, compositor).
carrera(musica, director_de_orquesta).
carrera(musica, profesor_de_musica).

% Interpersonal
carrera(interpersonal, psicologo).
carrera(interpersonal, trabajador_social).
carrera(interpersonal, docente).
carrera(interpersonal, lider_de_recursos_humanos).

% Kinestésico Corporal
carrera(kinestesico_corporal, deportista).
carrera(kinestesico_corporal, fisioterapeuta).
carrera(kinestesico_corporal, bailarín).
carrera(kinestesico_corporal, entrenador_personal).

% Intrapersonal
carrera(intrapersonal, psicoterapeuta).
carrera(intrapersonal, coach).
carrera(intrapersonal, filosofo).
carrera(intrapersonal, consultor).

% Naturalista
carrera(naturalista, biologo).
carrera(naturalista, agronomo).
carrera(naturalista, ecologista).
carrera(naturalista, veterinario).

%REGLAS
% Regla para obtener las preguntas agrupadas por área
preguntas_por_area(Resultado) :-
    findall(Area-Preguntas, (
        pregunta(Area, _),
        findall(Pregunta, pregunta(Area, Pregunta), Preguntas)
    ), Resultado).

% Regla para sumar las puntuaciones por área
sumar_puntuaciones([], [], 0).
sumar_puntuaciones([Respuesta|Respuestas], [Pregunta|Preguntas], Suma) :-
    pregunta(Area, Pregunta),
    sumar_puntuaciones(Respuestas, Preguntas, SumaResto),
    Suma is SumaResto + Respuesta.

% Regla para calcular la probabilidad de cada área
calcular_probabilidades([], _, _, []).
calcular_probabilidades([Area|Areas], Preguntas, Respuestas, [Area-Probabilidad|Probabilidades]) :-
    findall(Pregunta, pregunta(Area, Pregunta), PreguntasArea),
    maplist(pregunta_respuesta(Respuestas, Preguntas), PreguntasArea, RespuestasArea),
    length(PreguntasArea, CantidadPreguntasArea),
    length(Preguntas, TotalPreguntas),
    sum_list(Respuestas, SumaTotal),
    sum_list(RespuestasArea, SumaArea),
    Probabilidad is (SumaArea / SumaTotal) * 100,
    calcular_probabilidades(Areas, Preguntas, Respuestas, Probabilidades).

pregunta_respuesta(Respuestas, Preguntas, Pregunta, Respuesta) :-
    nth1(Index, Preguntas, Pregunta),
    nth1(Index, Respuestas, Respuesta).

% Regla para calcular probabilidades basadas en respuestas dadas
calcular_probabilidades_respuestas(Respuestas, Probabilidades) :-
    findall(Pregunta, pregunta(_, Pregunta), Preguntas),
    length(Preguntas, Len),
    length(Respuestas, Len),
    forall(member(R, Respuestas), (R >= 0, R =< 10)),
    findall(Area, pregunta(Area, _), Areas),
    list_to_set(Areas, AreasSet),
    calcular_probabilidades(AreasSet, Preguntas, Respuestas, Probabilidades).

% run :-
%     Respuestas = [ 
%         1, 1, 1, 1, 
%         10, 10, 10, 10,
%         1, 1, 1, 1,
%         1, 1, 1, 1,
%         1, 1, 1, 1,
%         1, 1, 1, 1,
%         1, 1, 1, 1,
%         1, 1, 1, 1],
%     calcular_probabilidades_respuestas(Respuestas, Probabilidades),
%     write(Probabilidades), nl.

% :- initialization run.
